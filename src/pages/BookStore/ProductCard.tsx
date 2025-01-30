import {
  IoCart,
  IoBagHandle,
  IoEye,
  IoChatbubbleEllipses,
} from "react-icons/io5";

interface ProductProps {
  product: {
    id: string;
    productImg: string;
    title: string;
    author: string;
    price: number;
    oldPrice?: number;
    rating?: number;
    hasOffer?: boolean;
  };
  onBuy: () => void; // Accepting onBuy function as a prop
}

const ProductCard: React.FC<ProductProps> = ({ product, onBuy }) => {
  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
      {/** Offer Badge */}
      {product.hasOffer && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1">
          OFFER
        </div>
      )}

      {/** Product Image */}
      <img
        src={product.productImg}
        alt={product.title}
        className="w-full h-56 object-cover rounded-md"
      />

      {/** Title & Author */}
      <h3 className="text-md font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600 text-sm">{product.author}</p>

      {/** Star Ratings */}
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

      {/** Price Section */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xl font-bold text-red-600">${product.price}</span>
        {product.oldPrice && (
          <span className="text-sm line-through text-gray-400">
            ${product.oldPrice}
          </span>
        )}
      </div>

      {/** Action Buttons */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-1">
        {/** View Details */}
        <button
          className="flex items-center justify-center gap-1 bg-red-700 text-white text-sm py-2 px-3 w-full hover:bg-red-400"
          onClick={() => (window.location.href = `/products/${product.id}`)}
        >
          <IoEye size={16} /> Details
        </button>

        {/** Buy Now (Triggers Checkout Modal) */}
        <button
          className="flex items-center justify-center gap-1 bg-red-700 text-white text-sm py-2 px-3 w-full hover:bg-red-400"
          onClick={onBuy}
        >
          <IoBagHandle size={16} /> Buy
        </button>

        {/** Add to Cart */}
        <button className="flex items-center justify-center gap-1 bg-red-700 text-white text-sm py-2 px-3 w-full hover:bg-red-400">
          <IoCart size={16} /> Add
        </button>
      </div>

      {/** Comment Icon */}
      <button className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-300">
        <IoChatbubbleEllipses size={18} className="text-gray-600" />
      </button>
    </div>
  );
};

export default ProductCard;
