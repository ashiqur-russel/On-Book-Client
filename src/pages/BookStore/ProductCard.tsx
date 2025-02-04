import { FaShoppingCart } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router";

interface ProductProps {
  product: {
    id: string;
    productImg?: string;
    title: string;
    author: string;
    price: number;
    oldPrice?: number;
    rating?: number;
    hasOffer?: boolean;
  };
  role?: string;
}

const ProductCard: React.FC<ProductProps> = ({ product, role }) => {
  const navigate = useNavigate();
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
            {product.oldPrice && (
              <span className="text-sm line-through text-gray-400">
                ${product.oldPrice}
              </span>
            )}
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

        {role !== "admin" && (
          <button className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-500 transition w-full">
            <FaShoppingCart size={18} />
            Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
