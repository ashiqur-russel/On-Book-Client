import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";
import { TCategory, IProduct } from "@/types";
import OnForm from "@/components/utils/OnForm";
import { useState } from "react";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import OnDropdown from "@/components/utils/OnDropDown";
import OnTextArea from "@/components/utils/OnTextArea";

const categories: TCategory[] = [
  "Fiction",
  "Science",
  "SelfDevelopment",
  "Poetry",
  "Religious",
  "Thriller",
];

interface ProductForm extends Omit<IProduct, "productImg"> {
  file?: FileList;
}

const CreateProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductForm>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    try {
      const formData = new FormData();

      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0]);
      }

      formData.append(
        "data",
        JSON.stringify({
          product: {
            title: data.title,
            author: data.author,
            price: Number(data.price),
            quantity: Number(data.quantity),
            category: data.category,
            description: data.description,
          },
        })
      );

      await createProduct(formData).unwrap();

      toast.success("Product created successfully!");

      reset();
      setSelectedFile(null);
      setValue("file", undefined);
      setValue("category", undefined as unknown as TCategory);
      setValue("description", "");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <OnForm<ProductForm>
        title="Create a New Product"
        fields={[
          {
            label: "Title",
            type: "text",
            name: "title",
            placeholder: "Enter product title",
            validation: { required: "Title is required" },
            error: errors.title?.message,
          },
          {
            label: "Author",
            type: "text",
            name: "author",
            placeholder: "Enter author's name",
            validation: { required: "Author is required" },
            error: errors.author?.message,
          },
          {
            label: "Price",
            type: "number",
            name: "price",
            placeholder: "Enter price",
            validation: {
              required: "Price is required",
              min: { value: 1, message: "Price must be positive" },
            },
            error: errors.price?.message,
          },
          {
            label: "Quantity",
            type: "number",
            name: "quantity",
            placeholder: "Enter quantity",
            validation: {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            },
            error: errors.quantity?.message,
          },
        ]}
        buttonText={isLoading ? "Creating..." : "Create Product"}
        control={control}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <OnDropdown
          name="category"
          label="Category"
          options={categories}
          control={control}
          validation={{ required: "Category is required" }}
          error={errors.category?.message}
        />

        <OnTextArea
          name="description"
          label="Description"
          placeholder="Enter product description"
          control={control}
          validation={{ required: "Description is required" }}
          error={errors.description?.message}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Product Image
          </label>
          <Controller
            name="file"
            control={control}
            defaultValue={undefined}
            render={({ field: { onChange, ref } }) => (
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={ref}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setSelectedFile(files[0]);
                    onChange(files); // ✅ Correctly updates form state
                  }
                }}
              />
            )}
          />
          {selectedFile && (
            <p className="text-gray-500 text-xs mt-1">{selectedFile.name}</p>
          )}
        </div>
      </OnForm>
    </div>
  );
};

export default CreateProduct;
