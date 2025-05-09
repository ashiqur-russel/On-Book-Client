import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Heart, ShoppingBag } from 'lucide-react';

interface Book {
    title: string;
    author?: string;
    image: string;
    price: number;
}

const bookListings: Book[] = [
    {
        title: 'A Love Letter to Whiskey',
        author: 'Kandi Steiner',
        image: 'https://images.pangobooks.com/images/4bdde995-079b-49bc-9a59-47b762fa4cea?auto=webp&format=webp&height=300&quality=85&crop=5%3A6',
        price: 18.0,
    },
    {
        title: 'Becoming Dangerous',
        author: 'Kristen J. Sollee',
        image: 'https://images.pangobooks.com/images/f0046fdf-d4a3-4d87-b949-172b1ff21528?auto=webp&format=webp&height=300&quality=85&crop=5%3A6',
        price: 15.0,
    },
    {
        title: 'Treat Yourself to Life',
        author: 'Raymond Charles Barker',
        image: 'https://images.pangobooks.com/images/90d1f176-7db5-4c7c-bbee-9d9221dad34b?width=800&quality=85&crop=1%3A1',
        price: 3.0,
    },
    {
        title: 'Killers of a Certain Age',
        author: 'Deanna Raybourn',
        image: 'https://images.pangobooks.com/images/f16f23d7-e288-4121-8f05-0e6a760d33d8?width=800&quality=85&crop=1%3A1',
        price: 6.0,
    },
    {
        title: 'Storm Child',
        author: 'Michael Robotham',
        image: 'https://images.pangobooks.com/images/d6730865-cdce-4ae6-be93-2097152da41d?width=800&quality=85&crop=1%3A1',
        price: 14.0,
    },
    {
        title: 'Dial a for Aunties',
        author: 'Jesse Q. Sutanto',
        image: 'https://images.pangobooks.com/images/7ef3e16f-7a71-44b9-92b3-894608319afb?width=800&quality=85&crop=1%3A1',
        price: 8.0,
    },
    {
        title: 'The Original Daughter',
        author: 'Jemimah Wei',
        image: 'https://images.pangobooks.com/images/39a0749d-dcdc-4f37-9f6e-efa09a387696?width=800&quality=85&crop=1%3A1',
        price: 12.0,
    },
];

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => (
    <div className="bg-white rounded-md shadow-md overflow-hidden flex flex-col w-48">
        <div className="h-36 overflow-hidden rounded-t-md">
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-3 flex flex-col flex-grow">
            <p className="text-xs text-gray-600 truncate">{book.author}</p>
            <h3 className="text-sm font-semibold text-gray-800 truncate mt-1">{book.title}</h3>
            <div className="mt-auto flex justify-between items-end">
                <span className="text-sm font-bold text-purple-600">${book.price.toFixed(2)}</span>
                <div className="flex flex-col items-end space-y-1">
                    <button className="text-gray-500 hover:text-purple-600">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="text-gray-500 hover:text-purple-600">
                        <ShoppingBag className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const RecentListings: React.FC = () => {
    const settings: import('react-slick').Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <div className="py-8">
            <style>{`
        .slick-prev,
        .slick-next {
          color: black !important;
          z-index: 1;
        }
        .slick-prev:before,
        .slick-next:before {
          color: black !important;
        }
        .slick-prev:hover,
        .slick-next:hover {
          opacity: 0.8;
        }
      `}</style>

            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex justify-center items-center"></h2>
                    <h2 className="text-3xl flex justify-center items-center ml-13 text-gray-900 mb-5 md:text-left">
                        Most recent listings
                    </h2>
                    <a href="#" className="mr-8 text-indigo-600 text-sm hover:underline">
                        See all
                    </a>
                </div>
                <div className="flex flex-col justify-center">
                    <Slider {...settings}>
                        {bookListings.map((book, index) => (
                            <div key={index} className="ml-6 flex justify-center items-center">
                                <BookCard book={book} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default RecentListings;
