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

const nonFictionBookListings: Book[] = [
    {
        title: 'A Power Governments Cannot Suppress',
        author: 'Howard Zinn',
        image: 'https://images.pangobooks.com/images/9a5c2c7a-8225-435c-9bc7-3d0d19c2561d?width=800&quality=85&crop=1%3A1',
        price: 24.99,
    },
    {
        title: 'Killer Show',
        author: 'John Barylick',
        image: 'https://images.pangobooks.com/images/e40a3224-bd98-4b82-93a8-74db8f84f6af?width=800&quality=85&crop=1%3A1',
        price: 12.50,
    },
    {
        title: 'Having Our Say',
        author: 'Sarah L. Delany and A. Elizabeth Delany',
        image: 'https://images.pangobooks.com/images/70eff319-5994-4354-9277-d77758f5a88f?width=800&quality=85&crop=1%3A1',
        price: 10.00,
    },
    {
        title: 'BTS poster book',
        author: 'Various',
        image: 'https://images.pangobooks.com/images/3f799da3-a3c2-4559-b64e-5c5a7d8dcc92?width=800&quality=85&crop=1%3A1',
        price: 5.00,
    },
    {
        title: 'The Book of Charlie',
        author: 'David Von Drehle',
        image: 'https://images.pangobooks.com/images/4e2420ba-2667-4803-9440-ce5c17193c0b?width=800&quality=85&crop=1%3A1',
        price: 5.86,
    },
    {
        title: 'Satyajit Ray: the Inner Eye',
        author: 'Andrew Robinson',
        image: 'https://images.pangobooks.com/images/fbae1216-5487-4507-a834-46a975ede906?width=800&quality=85&crop=1%3A1',
        price: 8.00,
    },
    {
        title: 'Eyes on Target',
        author: 'Scott McEwen, Richard Miniter',
        image: 'https://images.pangobooks.com/images/fd4a8071-7800-4e27-8917-a6ae9ab44b38?width=800&quality=85&crop=1%3A1',
        price: 5.00,
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

const RecentNonfiction: React.FC = () => {
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
                    <h2 className="text-3xl font-semibold text-gray-900 mb-5 md:text-left">
                    </h2>

                    <h2 className="text-3xl flex justify-center items-center ml-13 text-gray-900 mb-5 md:text-left">
                        Most recent in nonfiction

                    </h2>
                    <a href="#" className="mr-8 text-indigo-600 text-sm hover:underline">
                        See all
                    </a>
                </div>
                <div className="flex flex-col justify-center">
                    <Slider {...settings}>
                        {nonFictionBookListings.map((book, index) => (
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

export default RecentNonfiction;