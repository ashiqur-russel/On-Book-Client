import { useState } from "react";
import ProductCard from "./ProductCard";
import Footer from "../../components/shared/Footer";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { IoFilter } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";

const Products = () => {
  const [queryParams, setQueryParams] = useState({
    deliveryStatus: "",
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const queryArray = Object.entries(queryParams)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => ({ name: key, value }));

  const { data } = useGetAllProductsQuery(queryArray);

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [gridView] = useState<boolean>(true);

  const product = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setQueryParams({ ...queryParams, page: newPage });
    }
  };

  const handleFilterClick = (filter: string) => {
    setQueryParams({
      ...queryParams,
      deliveryStatus: filter === "All" ? "" : filter.toLowerCase(),
      page: 1,
    });
  };

  return (
    <>
      <div className="flex flex-col px-3 md:px-10 lg:px-24  py-0 mt-4">
        <div className="flex justify-between items-center mb-4">
          <button
            className="btn-primary flex items-center gap-2 w-full sm:w-auto sm:gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <IoFilter size={18} /> {showFilters ? "CLOSE" : "+ FILTER"}
          </button>
        </div>

        {showFilters && (
          <div className="flex w-full flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="grid grid-cols-2 gap-2 md:flex md:justify-start lg:justify-end md:gap-2 px-1 w-full md:w-auto">
              {["All", "OFFER", "NEW ARRIVAL", "POPULAR"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`border rounded-sm text-xs p-1 md:px-3 md:py-2 ${
                    queryParams.deliveryStatus === filter.toLowerCase()
                      ? "bg-blue-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative flex items-center w-full md:w-auto">
              <BsSearch className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by Author, Title, Category..."
                value={queryParams.searchTerm}
                onChange={(e) =>
                  setQueryParams({
                    ...queryParams,
                    searchTerm: e.target.value,
                    page: 1,
                  })
                }
                className="border text-xs outline-amber-700 border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full md:w-[250px] lg:w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/** Product List */}
        <div className="relative z-0">
          <div
            className={`grid relative ${
              gridView
                ? "grid-cols-1  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "grid-cols-1"
            } gap-6`}
          >
            {product.length > 0 ? (
              product.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Keine Produkte gefunden
              </p>
            )}
          </div>
          <div className="flex justify-between items-center mt-4 mb-4 ">
            <p className="text-gray-600"></p>
            <div className="flex items-center space-x-2 z-4">
              <button
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                onClick={() => handlePageChange(queryParams.page - 1)}
                disabled={queryParams.page === 1}
              >
                <BiChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-3 py-1 border rounded-lg text-gray-900">
                {queryParams.page} / {totalPages}
              </span>
              <button
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                onClick={() => handlePageChange(queryParams.page + 1)}
                disabled={queryParams.page === totalPages}
              >
                <BiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Products;
