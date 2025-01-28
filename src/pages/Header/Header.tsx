import React, { useRef, useState } from "react";

const books = [
  {
    id: 1,
    title: "The Stranger",
    author: "Albert Camus",
    image:
      "https://images.unsplash.com/photo-1630344745876-cd39d1b58100?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
    flipped: false,
  },
  {
    id: 2,
    title: "Der Process",
    author: "Franz Kafka",
    image:
      "https://images.unsplash.com/photo-1589829068083-7cbcc8f6eed4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    flipped: true,
  },
];

const Header = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.scrollWidth / books.length;
      const scrollAmount = index * slideWidth;
      carouselRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-[#FAF8F6] py-16">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Find Your Next <br /> Book
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Our most popular and trending{" "}
              <span className="font-bold">On.Book</span> perfect. <br />
              Not sure what to read now? Match your next reading mood perfectly.
            </p>
            <button className="mt-6 bg-black text-white px-8 py-3 rounded text-lg hover:bg-gray-700 transition">
              Explore Now
            </button>
          </div>

          {/* Carousel Section */}
          <div className="relative lg:w-1/2 flex flex-col items-center mt-12 lg:mt-0">
            {/* Carousel */}
            <div
              ref={carouselRef}
              id="carousel"
              className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {books.map((book, index) => (
                <div key={book.id} className="text-center flex-shrink-0">
                  <div className="w-48 h-80 bg-gray-100 rounded-t-full overflow-hidden shadow-md">
                    <img
                      src={book.image}
                      alt={book.title}
                      className={`w-full h-full object-cover ${
                        book.flipped ? "transform scale-x-[-1]" : ""
                      }`}
                    />
                  </div>
                  <h3 className="mt-4 text-gray-900 text-lg font-semibold">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex space-x-2 mt-4">
              {books.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeIndex === index ? "bg-black" : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
