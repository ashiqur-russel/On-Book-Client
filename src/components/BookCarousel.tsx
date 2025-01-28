import Slider from "react-slick";

const books = [
  {
    id: 1,
    title: "The Stranger",
    description: "A classic novel exploring existentialism.",
  },
  { id: 2, title: "1984", description: "A dystopian novel by George Orwell." },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    description: "A story of racial injustice.",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    description: "A tale of decadence and idealism.",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    description: "A romantic novel by Jane Austen.",
  },
];

const BookCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto ">
      <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className="px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600">{book.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookCarousel;
