import "./App.css";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import Header from "./pages/Header/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCarousel from "./components/BookCarousel";
import Bestsellers from "./pages/BestSeller/BestSeller";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col h-[100vh]">
      <Navbar />
      <Header />
      <Bestsellers />
      <BookCarousel />
      <div className="grid lg:grid-cols-3  h-screen md:grid-cols-2 grid-cols-1 gap-2 p-2">
        {" "}
      </div>

      <Footer />
    </div>
  );
};

export default App;
