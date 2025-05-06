import { NavLink } from "react-router";

const offers = [
  {
    id: 1,
    flipped: false,

    discount: "50%",
    image:
      "https://images.unsplash.com/photo-1664254020833-8c3a07cb24e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA2fHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    flipped: true,

    discount: "30%",
    image:
      "https://images.unsplash.com/photo-1533561304446-88a43deb6229?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGF1dGhvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    flipped: false,
    discount: "20%",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEyfHxhdXRob3J8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    flipped: false,
    discount: "20%",
    image:
      "https://images.pangobooks.com/images/31987ea3-3b36-4687-8e5a-5185ac54f260?width=800&quality=85&crop=1%3A1",
  },
];

const Offers = () => {
  return (
      <div className="w-full px-3 md:px-10 lg:px-24 py-10">
      <h2 className="text-3xl flex justify-center items-center ml-13 text-gray-900 mb-5 md:text-left">
          Offers
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className="text-center mx-auto w-72 ">
              <div
                className={`w-[100] h-80 overflow-hidden bg-gray-300 relative ${
                  offer.flipped ? "rounded-t-[100px]" : "rounded-b-[100px]"
                }`}
              >
                <img
                  src={offer.image}
                  alt={`Discount ${offer.discount}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-4 text-lg font-semibold text-gray-900">
                This month's <br /> discount - {offer.discount}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="px-6 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition">
            <NavLink to={"/products"}>SEE ALL</NavLink>
          </button>
        </div>
      </div>

  );
};

export default Offers;
