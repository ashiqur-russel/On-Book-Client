import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaShoppingCart } from "react-icons/fa";

const books = [
  {
    id: 1,
    title: "The Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1533561304446-88a43deb6229?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGF1dGhvcnxlbnwwfHwwfHx8MA%3D%3D",
    bgColor: "bg-[#0A0E1A]",
  },
  {
    id: 2,
    title: "The Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1528309709027-c6f96afc9415?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
    bgColor: "bg-[#1A1325]",
  },
  {
    id: 3,
    title: "The Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1533561304446-88a43deb6229?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGF1dGhvcnxlbnwwfHwwfHx8MA%3D%3D",
    bgColor: "bg-[#14280F]",
  },
  {
    id: 4,
    title: "The Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1664254020833-8c3a07cb24e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA2fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
    bgColor: "bg-[#332010]",
  },
];

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

  return (
    <div className="container mx-auto px-2 py-10">
      {/* Title Section */}
      <h2 className="text-3xl text-center mb-6 text-gray-900">
        Top - 10 Best Selling Books
      </h2>

      {/* Carousel */}
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className="px-2">
            <div className="flex overflow-hidden shadow-md border hover:shadow-lg transition-all h-36">
              {/* Left - Book Cover Image */}
              <div className="w-1/2">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right - Book Details */}
              <div
                className={`w-1/2 p-3 ${book.bgColor} text-white flex flex-col justify-between`}
              >
                <div>
                  <h3 className="text-sm font-semibold leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-300">by {book.author}</p>

                  {/* Star Rating */}
                  <div className="flex mt-1 text-yellow-400 text-xs">
                    {"★★★★★"}
                  </div>

                  <p className="text-sm font-semibold mt-1">{book.price}</p>
                </div>

                {/* Add to Cart Button */}
                <button className="mt-2 w-20   flex items-center justify-center border border-gray-400 px-3 py-1 text-xs hover:bg-gray-400 hover:text-black transition">
                  Add <FaShoppingCart className="ml-1 text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopSellingBooks;
