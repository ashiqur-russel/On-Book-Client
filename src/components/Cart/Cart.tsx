import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { CgClose } from "react-icons/cg";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { toggleCart } from "@/redux/features/global/globalSlice";
import { loadStripe } from "@stripe/stripe-js";

import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  resetHighlight,
  selectCurrentStore,
} from "@/redux/features/product/productSlice";
import { useCreateCheckoutSessionMutation } from "@/redux/features/payment/paymentApi";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCurrentStore);
  const [createCheckoutSession] =
    useCreateCheckoutSessionMutation();

  const [error, setError] = useState<string | null>(null);

  const isCartOpen = useAppSelector(
    (state: RootState) => state.global.isCartOpen
  );

  const highlightedItemId = useAppSelector(
    (state: RootState) => state.product.highlightedItemId
  );

  const totalPrice = cart.cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    if (highlightedItemId && isCartOpen) {
      const itemElement = itemRefs.current[highlightedItemId];
      if (itemElement) {
        itemElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightedItemId, isCartOpen]);

  const closeCartHandler = () => {
    dispatch(toggleCart());
    dispatch(resetHighlight());
  };

  const formattedData = cart.cart.map((item) => {
    return {
      name: item.title,
      price: item.price,
      quantity: item.quantity,
      productId: item.id,
    };
  });


  const handleCheckout = async () => {
    console.log("checkout");
    setError(null);

    try {
      const response = await createCheckoutSession({
        items: formattedData,
        successUrl: "http://localhost:5173/dashboard/user/my-orders",
        cancelUrl: "http://localhost:5173",
      }).unwrap();

      if (!response?.data?.sessionId) {
        throw new Error("No sessionId returned from API.");
      }

      const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
      if (!stripe) {
        throw new Error("Stripe failed to initialize.");
      }

      const redirectResult = await stripe.redirectToCheckout({
        sessionId: response?.data?.sessionId,
      });

      dispatch(clearCart())

      if (redirectResult.error) {
        throw new Error(redirectResult.error.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Payment Error:", error);

      setError(error.message || "An unknown error occurred.");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-gray-500/75 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCartHandler}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed right-0 top-0 h-screen w-[400px] bg-white shadow-xl z-70 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 shadow-md">
              <h2 className="text-lg font-medium text-gray-900">
                Shopping Cart
              </h2>
              <button
                onClick={closeCartHandler}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <CgClose className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4">
              {cart?.cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty</p>
              ) : (
                <ul role="list" className="my-2 divide-y divide-gray-200">
                  {cart?.cart.map((item) => (
                    <motion.li
                      key={item.id}
                      ref={(el) => (itemRefs.current[item.id] = el)}
                      className={`flex py-6 transition ${
                        highlightedItemId === item.id
                          ? "border-l-4 border-green-800  border p-1 shadow-md   animate-pulse"
                          : ""
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200 flex items-center justify-center shadow-md">
                        <img src={item.productImg} alt={item.title} />
                      </div>

                      {/* Product Details */}
                      <div className="ml-4 flex-1 flex flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.title}</h3>
                          <p className="ml-4">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-end justify-between text-sm mt-2">
                          <div className="flex items-center space-x-2 bg-gray-200 rounded-md px-2 py-1">
                            <button
                              onClick={() =>
                                dispatch(decrementQuantity(item.id))
                              }
                              className="text-gray-600 hover:text-gray-800 transition"
                              disabled={item.quantity <= 1}
                            >
                              <AiOutlineMinus />
                            </button>
                            <span className="text-gray-800 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(incrementQuantity(item.id))
                              }
                              className="text-gray-600 hover:text-gray-800 transition"
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>

                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="font-medium text-red-500 hover:text-red-700 transition"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {cart?.cart.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>

                {/* Checkout Button */}
                <div className="mt-6" onClick={handleCheckout}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex w-full items-center justify-center border border-transparent hover:bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-xs bg-black"
                    disabled={cart.cart.length === 0}
                  >
                    Checkout
                  </motion.button>
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="mt-6 flex justify-between">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(clearCart())}
                    className="w-full py-2 px-4 text-white bg-red-500 hover:bg-red-600 "
                  >
                    Reset Cart
                  </motion.button>
                </div>

                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      onClick={closeCartHandler}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
