import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BuyProductModal from '@/components/modals/BuyProductModal';
import { useGetProductByIdQuery } from "../../redux/features/product/productApi";
import { useGetMeQuery } from "@/redux/features/user/registerApi";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import CustomStyledSpinner from '@/components/shared/LoaderSpinner';


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: myData, refetch: refetchUser } = useGetMeQuery("");
  const userRole = myData?.[0]?.role;
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id!);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const isLoggedIn = myData && myData.length > 0;

  const handleAuthRequiredAction = (callback: () => void) => {
    if (!isLoggedIn) {
      navigate(`/signin?redirect=${encodeURIComponent(location.pathname)}`);
    } else {
      callback();
    }
  };

  const handleBuyNow = () => {
    handleAuthRequiredAction(() => {
      setIsModalOpen(true);
      refetchUser();
    });
  };

  // const [addRating] = useAddRatingMutation();

  const handleRateBook = async (rating: number) => {
    setUserRating(rating);
    setHoverRating(null);
    console.log(`Rated book with ${rating} stars`);

    try {
      //await addRating({ productId: id!, rating }).unwrap();
      toast.success("Thanks for your rating!");
    } catch (err) {
      console.error("Rating failed:", err);
      toast.error("Failed to submit rating.");
    }
  };


  if (isLoading) {
    return <div className="text-center text-lg font-semibold">{<CustomStyledSpinner />}</div>;
  }


  if (isError || !product) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        Product not found!
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">

          <div className="p-4 md:p-6 text-sm text-gray-600 flex items-center">
            <span
              className="hover:text-red-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              home
            </span>
            <span className="mx-1">{'>'}</span>
            <span
              className="hover:text-red-600 cursor-pointer"
              onClick={() => navigate("/products")}
            >
              books
            </span>
            <span className="mx-1">{'>'}</span>
            <span
              className="hover:text-red-600 cursor-pointer"
              onClick={() => navigate(`/products?category=${product.category}`)}
            >
              {product.category}
            </span>
            <span className="mx-1">{'>'}</span>
            <span className="font-semibold text-gray-900">{product.title}</span>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-4 md:p-6">
              <img
                src={product.productImg}
                alt={product.title}
                className="w-full rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2 md:mb-3">
                {product.title}
              </h1>
              <p className="text-gray-600 mb-4 md:mb-5">By {product.author}</p>
              <div className="flex items-center mb-4 md:mb-5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "mr-1",
                      index < product.rating ? "text-yellow-400" : "text-gray-400"
                    )}
                  />
                ))}
                <span className="text-sm text-gray-500">(125 Reviews)</span>
              </div>
              <p className="text-gray-700 text-base mb-4 md:mb-5">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.oldPrice}
                  </span>
                )}
                <span
                  className={cn(
                    "text-sm",
                    product.inStock ? "text-green-500" : "text-red-500"
                  )}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-4 md:mb-5">
                <Button
                  onClick={handleBuyNow}
                  className={cn(
                    "w-full sm:w-auto",
                    userRole === "admin"
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-black hover:bg-gray-700 text-white"
                  )}
                  disabled={userRole === "admin"}
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className={cn(
                    "w-full sm:w-auto",
                    userRole === "admin"
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-black hover:bg-gray-700 text-white"
                  )}
                  disabled={userRole === "admin"}
                >
                  Buy Now
                </Button>
                <Button
                  className={cn(
                    "w-full sm:w-auto",
                    userRole === "admin"
                      ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                  )}
                  disabled
                >
                  Add to Wishlist
                </Button>
              </div>
              {/* Be the first one to review Section */}
              <div className="p-4 md:p-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Be the first one to review</h2>
                <p className="text-gray-600 mb-4">Review the book today!</p>
                <div
                  className="flex items-center gap-1 mt-4"
                  onMouseLeave={() => setHoverRating(null)}
                >
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    const starValue = starIndex;
                    const currentRating = hoverRating ?? userRating ?? product.rating;
                    const isFull = currentRating >= starValue;
                    const isHalf = currentRating >= starValue - 0.5 && currentRating < starValue;

                    return (
                      <div
                        key={starIndex}
                        className="relative w-6 h-6 cursor-pointer"
                        onMouseMove={(e) => {
                          const { left, width } = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - left;
                          const percent = x / width;
                          setHoverRating(percent > 0.5 ? starValue : starValue - 0.5);
                        }}
                        onClick={() => {
                          handleAuthRequiredAction(() => {
                            if (hoverRating) handleRateBook(hoverRating);
                          });
                        }}
                      >
                        {/* Gray base star */}
                        <Star className="text-gray-300 w-full h-full" />

                        {/* Gold overlay star */}
                        {(isFull || isHalf) && (
                          <Star
                            className="text-yellow-400 w-full h-full absolute top-0 left-0"
                            style={{
                              clipPath: isFull ? 'none' : 'inset(0 50% 0 0)',
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={() =>
                      handleAuthRequiredAction(() => {
                        if (hoverRating) handleRateBook(hoverRating);
                      })
                    }
                  >
                    Rate the book
                  </Button>
                </div>

              </div>
              {/* Tags Section */}
              <div className="p-4 md:p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {/* Replace these with actual tags from your product data */}
                  <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">#hardback</span>
                  <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">#war</span>
                  <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">#seals</span>
                  <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">#usmc</span>
                  <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">#benghazi</span>
                  <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">#nonfiction</span>
                </div>
              </div>

            </div>
          </div>



          {/* Product Details Section */}
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">ISBN:</span>{" "}
                  {product.isbn}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">Publisher:</span>{" "}
                  {product.publisher}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">
                    Publication Date:
                  </span>{" "}
                  {product.publicationDate}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">Language:</span>{" "}
                  {product.language}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">Pages:</span>{" "}
                  {product.pages}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">
                    Dimensions:
                  </span>{" "}
                  {product.dimensions}
                </p>
              </div>
            </div>
          </div>

          {/* Publisher Description Section */}
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Publisher Description</h2>
            <p className="text-gray-700">
              {product.description} {/* Use product description */}
            </p>
            {/* Add a "Read more" link if the description is long */}
            <Button variant="link" size="sm" className="p-0 mt-2">
              Read more <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="p-4 md:p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">OnBook Buyer Protection</h2>
            {/* Add details about buyer protection */}
            <p className="text-gray-600 text-sm">
              Get full refund if item not as described.
            </p>
          </div>
        </div>
      </div>
      {myData && userRole === "user" && isModalOpen && (
        <BuyProductModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          user={myData[0]?.name}
        />
      )}
    </div>
  );
};

export default ProductDetails;

