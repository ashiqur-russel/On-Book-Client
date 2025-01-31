import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import ProductCard from "./ProductCard";
import Footer from "../../components/shared/Footer";
import Filters from "./Filters";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { IoFilter } from "react-icons/io5";
import CheckoutModal from "../../components/modals/CheckoutModal";
import { useGetMeQuery } from "../../redux/features/user/registerApi";
import { IProduct, TCategory } from "@/types";

const Products = () => {
  const { data } = useGetAllProductsQuery("");
  const { data: userData } = useGetMeQuery("");

  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [gridView] = useState<boolean>(true);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    customer: string;
    amount: string;
  } | null>(null);

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [filters, setFilters] = useState({
    themes: [] as string[],
    authors: [] as string[],
    categories: [] as TCategory[],
    language: "all",
  });

  useEffect(() => {
    if (data?.data) {
      let filtered: IProduct[] = data.data as IProduct[];

      if (filters.themes.length > 0) {
        filtered = filtered.filter((p) => filters.themes.includes(p.title)); // Assuming 'title' is the theme
      }

      if (filters.authors.length > 0) {
        filtered = filtered.filter((p) => filters.authors.includes(p.author));
      }

      if (filters.categories.length > 0) {
        filtered = filtered.filter((p) =>
          filters.categories.includes(p.category)
        );
      }

      if (filters.language !== "all") {
        filtered = filtered.filter((p) => p.language === filters.language);
      }

      setFilteredProducts(filtered);
    }
  }, [data, filters]);

  const handleBuyNow = (product: IProduct) => {
    if (!user) {
      navigate("/signin", { replace: true });
      return;
    }
    setCheckoutData({
      customer: userData?.[0]?.name || "Unknown",
      amount: `$${product.price}`,
    });
    setCheckoutModal(true);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/** Filter & Sorting Section */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <IoFilter size={18} /> {showFilters ? "Schließen" : "+ FILTER"}
          </button>
        </div>

        {showFilters && (
          <Filters
            products={data?.data as IProduct[]}
            onFilterChange={setFilters}
          />
        )}

        {/** Product List */}
        <div className="p-4">
          <div
            className={`grid ${
              gridView
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : "grid-cols-1"
            } gap-6`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuy={() => handleBuyNow(product)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Keine Produkte gefunden
              </p>
            )}
          </div>
        </div>

        <Footer />

        {checkoutModal && checkoutData && (
          <CheckoutModal
            onClose={() => setCheckoutModal(false)}
            customer={checkoutData.customer}
            amount={checkoutData.amount}
          />
        )}
      </div>
    </>
  );
};

export default Products;
