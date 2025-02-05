import { FaShoppingCart } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { useGetMeQuery } from "@/redux/features/user/registerApi";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import BuyProductModal from "@/components/modals/BuyProductModal";
import { IProduct } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface ProductProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  const { data: myData, refetch, isLoading } = useGetMeQuery("");

  const userRole = user?.role;

  const handleBuyNow = () => {
    if (!user || user === null) {
      navigate(`/signin?redirect=${encodeURIComponent(location.pathname)}`);
    } else {
      setIsModalOpen(true);
    }
    refetch();
  };

  if (isLoading) {
    <p> Loading...</p>;
  }
  return (
    <div className="relative bg-white border-gray-200 flex flex-col w-full">
      {product.hasOffer && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm">
          OFFER
        </div>
      )}

      <div className="w-full h-[240px] sm:h-[280px] lg:h-[260px] flex-shrink-0">
        <img
          src={product.productImg || "/default-image.jpg"}
          alt={product.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between mt-3 w-full">
        <div>
          <h3 className="text-md font-semibold">{product.title}</h3>
          <p className="text-gray-600 text-sm">{product.author}</p>

          {/* Star Ratings */}
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-lg ${
                  index < (product.rating || 0)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-bold text-red-600">
              ${product.price}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col lg:flex-row  gap-2">
        <button
          className="flex items-center justify-center gap-2 bg-gray-200 px-4 py-2  text-sm hover:bg-gray-300 transition w-full"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <IoEye size={18} />
          View
        </button>

        <button
          className={`flex items-center justify-center gap-2 px-4 py-2 text-sm transition w-full ${
            userRole === "admin"
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-500"
          }`}
          disabled={userRole === "admin"}
          onClick={handleBuyNow}
        >
          <FaShoppingCart size={18} />
          Buy
        </button>
      </div>

      {myData !== null && userRole === "user" && isModalOpen && (
        <BuyProductModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          user={myData[0]?.name}
        />
      )}
    </div>
  );
};

export default ProductCard;
