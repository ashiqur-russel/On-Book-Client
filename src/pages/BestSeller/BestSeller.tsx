import { AiOutlineShoppingCart } from "react-icons/ai";

const books = [
  {
    id: 1,
    title: "The Spoke Zaratusra",
    author: "Friedrich Nietzsche",
    price: "$32.00",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Confession of a Mask",
    author: "Yukio Mishima",
    price: "$28.00",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "The Rebel",
    author: "Albert Camus",
    price: "$18.00",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    price: "$36.00",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60",
  },
];

const Bestsellers = () => {
  return (
    <div className="fontMona">
      <div className="container mx-auto px-10">
        {/* Header Section */}
        <div className="flex px-1 justify-between items-center">
          <h2 className="text-4xl text-gray-900">Bestsellers</h2>
          <a
            href="#"
            className="text-gray-700 hover:underline text-sm hidden md:inline lg:inline"
          >
            See all
          </a>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <div
              key={book.id}
              className=" border-gray-200  p-2  hover:border-2 transition"
            >
              {/* Book Image */}
              <div className="w-full h-60 overflow-hidden mb-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book Details */}
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">by: {book.author}</p>
              <p className="text-lg font-bold text-gray-900">{book.price}</p>

              {/* Ratings */}
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-yellow-400 ${
                      index < book.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Add to Cart Button */}
              <button className="mt-4 flex items-center  justify-center w-22 bg-gray-900 text-white py-2  hover:bg-gray-700 transition">
                Add <AiOutlineShoppingCart className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
