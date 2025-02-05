import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  IoCart,
  IoHeart,
  IoMail,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { useGetProductByIdQuery } from "../../redux/features/product/productApi";
import BuyProductModal from "@/components/modals/BuyProductModal";
import { useGetMeQuery } from "@/redux/features/user/registerApi";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: myData, refetch } = useGetMeQuery("");

  const userRole = myData?.[0]?.role;
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id!);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNow = () => {
    if (!myData || myData.length === 0) {
      navigate(`/signin?redirect=${encodeURIComponent(location.pathname)}`);
    } else {
      setIsModalOpen(true);
    }
    refetch();
  };

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
      {/* Breadcrumb Navigation */}
      <div className="text-sm text-gray-600 mb-4 flex items-center">
        <span
          className="hover:text-red-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          home
        </span>{" "}
        &gt;
        <span
          className="hover:text-red-600 cursor-pointer"
          onClick={() => navigate("/products")}
        >
          books
        </span>{" "}
        &gt;
        <span
          className="hover:text-red-600 cursor-pointer"
          onClick={() => navigate(`/products?category=${product.category}`)}
        >
          {product.category}
        </span>{" "}
        &gt;
        <span className="font-semibold text-gray-900">{product.title}</span>
      </div>

      {/* Product Details */}
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
            <button
              onClick={handleBuyNow}
              className={`w-full py-3 rounded-lg text-lg flex items-center justify-center gap-2 transition duration-200 ${
                userRole === "admin"
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              disabled={userRole === "admin"}
            >
              <IoCart size={20} /> Buy Now
            </button>

            <button
              className={`w-full mt-3 py-3 rounded-lg text-lg flex items-center justify-center gap-2 transition duration-200 ${
                userRole === "admin"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
              disabled={userRole === "admin"}
            >
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

      {myData && userRole === "user" && isModalOpen && (
        <BuyProductModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          user={myData[0]?.name}
        />
      )}
    </div>
  );
};

export default ProductDetails;
