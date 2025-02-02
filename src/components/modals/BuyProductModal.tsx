import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/product/productSlice";
import { IProduct } from "@/types";
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
          <div>
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold mt-2">${product.price} per unit</p>

            {/* Quantity Selector */}
            <div className="flex items-center mt-4">
              <button
                onClick={decreaseQuantity}
                className="p-2 bg-gray-200 rounded-md"
              >
                -
              </button>
              <span className="px-4 text-lg">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="p-2 bg-gray-200 rounded-md"
              >
                +
              </button>
            </div>

            <p className="text-xl font-semibold mt-2">Total: ${totalPrice}</p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={handleBuyNow}
                className="bg-black text-white px-4 py-2 rounded-md w-full"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-gray-300 px-4 py-2 rounded-md w-full"
              >
                Add to Cart
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
          amount={`$${totalPrice}`}
        />
      )}
    </>
  );
};

export default BuyProductModal;
