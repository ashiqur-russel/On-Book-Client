const books = [
  {
    id: 1,
    title: "The Rebel",
    author: "Albert Camus",
    price: "$18.00",
    image:
      "https://images.unsplash.com/photo-1645733794256-3e933d03cd1d?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotation: "-rotate-12",
    position: "top-1 left-10",
  },
  {
    id: 2,
    title: "Confession of a Mask",
    author: "Yukio Mishima",
    price: "$28.00",
    image:
      "https://images.unsplash.com/photo-1734082134491-45a0a54560cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA4fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
    rotation: "rotate-6",
    position: "top-0 right-10",
  },
  {
    id: 3,
    title: "Secret Societies",
    author: "Arkon Darual",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1711185896213-83f3f2e20fd5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzE1fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
    rotation: "-rotate-3",
    position: "top-20 left-24",
  },
  {
    id: 4,
    title: "The Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1711185901250-7d1f67272e53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzE4fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
    rotation: "rotate-9",
    position: "top-32 right-14",
  },
  {
    id: 5,
    title: "The Idiot",
    author: "Fyodor Dostoyevsky",
    price: "$22.00",
    image:
      "https://images.unsplash.com/photo-1734082133900-c59e3c4dd63a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzI2fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
    rotation: "-rotate-9",
    position: "top-80 left-10",
  },
];

const BookFairSection = () => {
  return (
    <>
      <div className="bg-[#0A0E1A] mx-20 text-white relative mt-16 ">
        <div className="container mx-auto  flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Left Side - Book Cards */}
          <div className="relative overflow-hidden -z-0 lg:inline hidden w-full lg:w-1/2 h-[400px]">
            {books.map((book) => (
              <div
                key={book.id}
                className={`absolute overflow-hidden w-40 md:w-48 lg:w-52 bg-[#12172B] shadow-lg transform ${book.rotation} ${book.position} transition duration-300 hover:scale-105`}
                style={{ zIndex: Math.floor(Math.random() * 5) }}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
                <p className="text-sm text-gray-300">by {book.author}</p>
                <p className="text-md font-semibold">{book.price}</p>
              </div>
            ))}
          </div>

          {/* Right Side - Event Info */}
          <div className="lg:w-1/2">
            <div className=" border-gray-400 p-8 relative max-w-md mx-auto lg:mx-0">
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Online Book Fairs 2022
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                In a country teetering on the brink of civil war, two young
                people meet—sensual, fiercely independent Nadia and gentle,
                restrained Saeed. The unrest roiling their city.
              </p>

              <button className="mt-4 border border-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-400 hover:text-black transition">
                Create Account →
              </button>

              {/* Decorative Border Line */}
              <div className="absolute top-0 right-0 w-16 border-t border-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookFairSection;
