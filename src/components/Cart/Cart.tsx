import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { CgClose } from "react-icons/cg";
import { toggleCart } from "@/redux/features/global/globalSlice";
import { selectCurrentStore } from "@/redux/features/product/productSlice";

export default function Cart() {
  const dispatch = useAppDispatch();

  const closeCartHandler = () => {
    dispatch(toggleCart());
  };

  const isCartOpen = useAppSelector(
    (state: RootState) => state.global.isCartOpen
  );

  const cart = useAppSelector(selectCurrentStore);
  console.log(cart);

  return (
    <div
      className={`relative z-10 ${isCartOpen ? "block" : "hidden"}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        onClick={closeCartHandler}
        aria-hidden="true"
      ></div>

      {/* Sliding Cart Panel */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl transform transition ease-in-out duration-500 sm:duration-700 translate-x-0">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </h2>
                    <button
                      onClick={closeCartHandler}
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <CgClose className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="mt-8">
                    <div className="flow-root">
                      {cart.cart.length === 0 ? (
                        <p className="text-center text-gray-600">
                          Cart is empty
                        </p>
                      ) : (
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        ></ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
