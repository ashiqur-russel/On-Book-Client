import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/product/productSlice";
import { IProduct } from "@/types";
import { FaMinus, FaPlus } from "react-icons/fa";
import OnModal from "@/components/utils/OnModal";
import CheckoutModal from "./CheckoutModal";

interface BuyProductModalProps {
  product: IProduct;
  onClose: () => void;
  user: { name: string };
}

const BuyProductModal: React.FC<BuyProductModalProps> = ({
  product,
  onClose,
  user,
}) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setTotalPrice(quantity * product.price);
  }, [quantity, product.price]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity, totalPrice }));
    onClose();
  };

  const handleBuyNow = () => {
    setIsHidden(true);
    setShowCheckoutModal(true);
  };

  // Handles closing of CheckoutModal and reopens BuyProductModal if not paid
  const handleCloseCheckout = () => {
    setShowCheckoutModal(false);
    setIsHidden(false);
  };

  // Handles successful payment and closes both modals
  const handleCompletePayment = () => {
    setShowCheckoutModal(false);
    onClose();
  };

  return (
    <>
      {!isHidden && (
        <OnModal title="Buy Product" onClose={onClose}>
          <div className="p-4">
            {/* Product Title */}
            <h3 className="text-lg font-semibold text-gray-900">
              {product.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>

            {/* Price */}
            <p className="text-xl font-bold mt-2 text-gray-900">
              ${product.price}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center space-x-4 mt-4 ">
              <div className="flex items-center shadow-md p-2 bg-rose-50  ">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 text-gray-500 hover:bg-rose-100 border transition"
                >
                  <FaMinus />
                </button>
                <span className="px-4 py-2 text-gray-900">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-2 text-gray-500 border hover:bg-rose-100 transition"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <p className="text-lg font-semibold text-gray-900 mt-3">
              Total: ${totalPrice}
            </p>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-primary text-white py-3  transition"
              >
                NEXT
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-error py-3  transition"
              >
                CANCEL
              </button>
            </div>
          </div>
        </OnModal>
      )}

      {/* Checkout Modal (Opens when "Buy Now" is clicked) */}
      {showCheckoutModal && (
        <CheckoutModal
          items={[{ ...product, quantity }]}
          onClose={handleCloseCheckout}
          onSuccess={handleCompletePayment}
          customer={user.name}
          amount={`${totalPrice}`}
        />
      )}
    </>
  );
};

export default BuyProductModal;
