import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaShoppingCart } from "react-icons/fa";
import { useGetBestSellingProductsQuery } from "@/redux/features/product/productApi";
import { addToCart } from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";

const TopSellingBooks = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 2,
    rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          dots: true,
        },
      },
    ],
  };
  const dispatch = useAppDispatch();

  const {
    data: products,
    isLoading,
    error,
  } = useGetBestSellingProductsQuery("");

  if (isLoading) {
    return (
      <div className="text-center text-lg text-gray-600 py-10">
        Loading best-selling books...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500 py-10">
        Failed to load best-selling books.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-10">
      <h2 className="text-3xl text-center mb-6 text-gray-900">
        Top - 10 Best Selling Books
      </h2>

      {/* Carousel */}
      <Slider {...settings}>
        {products && products.length > 0 ? (
          products.map((book) => (
            <div key={book._id} className="px-2">
              <div className="flex overflow-hidden shadow-md border hover:shadow-lg transition-all h-36">
                {/* Left - Book Cover Image */}
                <div className="w-1/2">
                  <img
                    src={book.productImg}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right - Book Details */}
                <div className="w-1/2 p-3 bg-gray-900 text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-300">by {book.author}</p>

                    {/* Star Rating (Placeholder) */}
                    <div className="flex mt-1 text-yellow-400 text-xs">
                      {"★★★★★"}
                    </div>

                    <p className="text-sm font-semibold mt-1">${book.price}</p>
                  </div>

                  <button
                    onClick={() => dispatch(addToCart(book))}
                    className="mt-2 cursor-pointer w-20 flex items-center justify-center border border-gray-400 px-3 py-1 text-xs hover:bg-gray-400 hover:text-black transition"
                  >
                    Add <FaShoppingCart className="ml-1 text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">
            No best-selling books found.
          </div>
        )}
      </Slider>
    </div>
  );
};

export default TopSellingBooks;
