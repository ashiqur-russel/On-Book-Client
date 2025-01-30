import { data, useParams } from "react-router-dom";
import {
  IoCart,
  IoHeart,
  IoMail,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { useGetProductByIdQuery } from "../../redux/features/product/productApi";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch product data from Redux Query
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id!);
  console.log(data);

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (isError || !product) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        Product not found!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 text-black">
      <div className="text-sm text-gray-600 mb-4">
        <span className="hover:text-red-600 cursor-pointer">Startseite</span>{" "}
        &gt;
        <span className="hover:text-red-600 cursor-pointer"> Bücher</span> &gt;
        <span className="font-semibold text-gray-900"> {product.category}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <img
            src={product.productImg}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-700 text-md">{product.author}</p>

            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-xl ${
                    index < product.rating ? "text-red-600" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="flex items-center mt-3">
              <span className="text-3xl font-bold text-black">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="ml-2 text-lg line-through text-gray-400">
                  ${product.oldPrice}
                </span>
              )}
            </div>
            <p
              className={`mt-2 text-sm ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "Available Immediately" : "Not Available Now"}
            </p>

            <p className="mt-4 text-gray-600">{product.description}</p>
          </div>

          <div className="mt-6">
            <button className="w-full bg-red-600 text-white py-3 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-red-700 transition duration-200">
              <IoCart size={20} /> Buy Now
            </button>

            <button className="w-full mt-3 bg-gray-100 text-black py-3 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition duration-200">
              <IoHeart size={20} /> Add on Wishlist
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Recommend:</h3>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                <IoMail size={20} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                <IoLogoFacebook size={20} className="text-blue-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                <IoLogoTwitter size={20} className="text-blue-500" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                <IoLogoWhatsapp size={20} className="text-green-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
