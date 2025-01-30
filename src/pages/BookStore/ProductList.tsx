import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Footer from "../../components/shared/Footer";
import Filters from "./Filters";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { IoFilter, IoGrid, IoList } from "react-icons/io5";

const Products = () => {
  const { data } = useGetAllProductsQuery("");
  console.log(data);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sort, setSort] = useState<string>("asc");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [gridView, setGridView] = useState<boolean>(true);
  const navigate = useNavigate();

  const sortedProducts = data?.data
    ? [...data.data]
        .filter((p) => p.price <= maxPrice)
        .sort((a, b) =>
          sort === "asc" ? a.price - b.price : b.price - a.price
        )
    : [];

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/** Header / Search Bar */}
        <div className="bg-red-700 text-white p-4 flex justify-between items-center">
          <div className="flex gap-4"></div>
        </div>

        {/** 🛠 Filter & Sorting Section */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
          {/** Toggle Grid/List View - Hidden on Mobile */}
          <div className="hidden sm:flex gap-4">
            <button
              className={`p-2 rounded-md ${
                gridView
                  ? "bg-red-600 text-white"
                  : "bg-white border border-gray-300"
              }`}
              onClick={() => setGridView(true)}
            >
              <IoGrid size={20} />
            </button>
            <button
              className={`p-2 rounded-md ${
                !gridView
                  ? "bg-red-600 text-white"
                  : "bg-white border border-gray-300"
              }`}
              onClick={() => setGridView(false)}
            >
              <IoList size={20} />
            </button>
          </div>

          {/** Sorting Dropdown - Centered on Mobile */}
          <select
            className="border border-red-500 px-4 py-2 rounded-md text-gray-700 w-full sm:w-auto"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="asc">Relevanz</option>
            <option value="desc">Preis absteigend</option>
          </select>

          {/** Responsive Filter Button (Full Width on Small Screens) */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto sm:flex-row"
            onClick={() => setShowFilters(!showFilters)}
          >
            <IoFilter size={18} /> {showFilters ? "Schließen" : "+ FILTER"}
          </button>
        </div>

        {/** 🛠 Filters Section (Visible when clicked) */}
        {showFilters && (
          <div className="p-4 bg-white border-b sm:hidden">
            <Filters />
          </div>
        )}

        {/** 🛍 Product List */}
        <div className="p-4">
          <div
            className={`grid ${
              gridView
                ? "grid-cols-1  md:grid-cols-2 lg:grid-cols-5"
                : "grid-cols-1"
            } gap-6`}
          >
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        </div>

        {/** 📌 Footer */}
        <Footer />

        {/** 📱 Mobile Sticky Filter Button */}
        <button
          className="fixed bottom-4 right-4 sm:hidden bg-red-600 text-white p-4 rounded-full shadow-md flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <IoFilter size={20} />
        </button>
      </div>
    </>
  );
};

export default Products;
