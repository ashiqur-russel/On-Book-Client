import { useState } from "react";
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

const Products = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery("");
  const { data: userData } = useGetMeQuery("");

  console.log(userData);

  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [gridView] = useState<boolean>(true);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    customer: string;
    amount: string;
  } | null>(null);

  const handleBuyNow = (product: {
    id: string;
    name: string;
    price: number;
  }) => {
    if (!user) {
      navigate("/signin", { replace: true });
      return;
    }
    setCheckoutData({
      customer: userData[0].name,
      amount: `$${product.price}`,
    });
    setCheckoutModal(true);
  };

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        Something goin on! Please Reload page or Try again later.
      </div>
    );
  }

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

        {showFilters && <Filters />}

        {/** Product List */}
        <div className="p-4">
          <div
            className={`grid ${
              gridView
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : "grid-cols-1"
            } gap-6`}
          >
            {data?.data?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={() => handleBuyNow(product)}
              />
            ))}
          </div>
        </div>

        <Footer />

        {/** Checkout Modal - Only Show If User Clicks Buy */}
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
