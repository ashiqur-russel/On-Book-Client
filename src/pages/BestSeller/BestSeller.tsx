import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router";

const Bestsellers = () => {
  const [queryParams] = useState({
    deliveryStatus: "",
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const queryArray = Object.entries(queryParams)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => ({ name: key, value }));

  const { data, isLoading } = useGetAllProductsQuery(queryArray);

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
          {bestSoldProducts && bestSoldProducts.length > 0 ? (
            bestSoldProducts?.map((book) => (
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
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">by: {book.author}</p>
                <p className="text-lg font-bold text-gray-900">${book.price}</p>

                {/* Ratings (Placeholder - Adjust as needed) */}
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

                <button className="mt-4 flex items-center justify-center w-full bg-gray-900 text-white py-2 hover:bg-gray-700 transition">
                  Buy
                  <AiOutlineShoppingCart className="ml-2" />
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-600">
              No best-selling products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
