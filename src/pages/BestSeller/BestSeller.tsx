import BuyProductModal from "@/components/modals/BuyProductModal";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { addToCart } from "@/redux/features/product/productSlice";
import { useGetMeQuery } from "@/redux/features/user/registerApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router";

const Bestsellers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const [queryParams] = useState({
    deliveryStatus: "",
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const queryArray = Object.entries(queryParams)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => ({ name: key, value }));

  const { data, isLoading } = useGetAllProductsQuery(queryArray);
  const { data: myData, refetch } = useGetMeQuery("");

  const userRole = user?.role;

  const handleBuyNow = (product: IProduct) => {
    if (!user) {
      navigate(`/signin?redirect=${encodeURIComponent(location.pathname)}`);
    } else {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
    refetch();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <p className="text-center text-lg text-gray-600">Data is Loading...</p>
    );
  }

  const bestSoldProducts =
    data?.data?.filter((product) => product.isBestSold)?.slice(0, 4) || [];

  return (
    <div className="fontMona">
      <div className="container mx-auto px-10">
        {/* Header Section */}
        <div className="flex px-1 justify-between items-center">
          <h2 className="text-4xl text-gray-900 mb-3 text-center">
            Bestsellers
          </h2>
          <NavLink
            to={"/products"}
            className="text-gray-700 hover:underline text-sm hidden md:inline lg:inline"
          >
            See all
          </NavLink>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSoldProducts.length > 0 ? (
            bestSoldProducts.map((book) => (
              <div
                key={book._id}
                className="border border-gray-200 p-4 hover:shadow-lg transition"
              >
                {/* Book Image */}
                <div className="w-full h-60 overflow-hidden mb-4">
                  <img
                    src={book.productImg}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Book Details */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {book.title}
                  </h3>
                  <IoEye
                    className="cursor-pointer hover:text-gray-500"
                    size={18}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-2">by: {book.author}</p>
                <p className="text-lg font-bold text-gray-900">${book.price}</p>

                {/* Ratings */}
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-400 ${
                        index < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <button
                    onClick={() => dispatch(addToCart(book))}
                    className="mt-4 flex items-center justify-center w-full bg-gray-900 text-white py-2 hover:bg-gray-700 transition"
                  >
                    Add
                    <RiMoneyEuroCircleFill className="ml-2" />
                  </button>
                  <button
                    onClick={() => handleBuyNow(book)}
                    className="mt-4 flex items-center justify-center w-full bg-gray-900 text-white py-2 hover:bg-gray-700 transition"
                  >
                    Buy
                    <AiOutlineShoppingCart className="ml-2" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-600">
              No best-selling products found.
            </p>
          )}
        </div>
      </div>

      {/* Buy Product Modal */}
      {isModalOpen && selectedProduct && myData && userRole === "user" && (
        <BuyProductModal
          product={selectedProduct}
          onClose={closeModal}
          user={myData[0]?.name}
        />
      )}
    </div>
  );
};

export default Bestsellers;
