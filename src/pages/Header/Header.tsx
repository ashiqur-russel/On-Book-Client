const books = [
  {
    id: 1,
    title: "The Stranger",
    author: "Albert Camus",
    image:
      "https://images.unsplash.com/photo-1630344745876-cd39d1b58100?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Der Process",
    author: "Franz Kafka",
    image:
      "https://images.unsplash.com/photo-1734082133900-c59e3c4dd63a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzI2fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Metamorphosis",
    author: "Franz Kafka",
    image:
      "https://images.unsplash.com/photo-1589829068083-7cbcc8f6eed4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const Header = () => {
  return (
    <div className="py-12 px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Heading Section */}
        <div className="lg:flex lg:items-center lg:justify-between text-center lg:text-left">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Find Your Next <br /> Book
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Our most popular and trending{" "}
              <span className="font-bold">On.Book</span> perfect. <br />
              Not sure what to read now? Match your next reading mood perfectly.
            </p>
            <button className="mt-6 bg-black text-white px-8 py-3 text-lg rounded-md hover:bg-gray-700 transition">
              Explore Now
            </button>
          </div>

          {/* Book Cards: Only Display on Large Screens */}
          <div className="relative lg:w-1/2 hidden lg:flex flex-col items-center mt-12 lg:mt-0">
            <div className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth">
              {books.map((book, index) => {
                const isMiddle = index === 1; // Middle card should be flipped
                return (
                  <div key={book.id} className="text-center flex-shrink-0">
                    <div
                      className={`w-40 h-64 bg-gray-100 overflow-hidden shadow-lg ${
                        isMiddle ? "rounded-b-[100px]" : "rounded-t-[100px]"
                      }`}
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="mt-3 text-gray-900 text-base font-semibold">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
