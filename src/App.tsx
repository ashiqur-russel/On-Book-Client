import { Suspense, lazy } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";
import Footer from "./components/shared/Footer";

const Header = lazy(() => import("./pages/Header/Header"));
const Bestsellers = lazy(() => import("./pages/BestSeller/BestSeller"));
const BookFairSection = lazy(() => import("./pages/BookFair/BookFair"));
const BookCarousel = lazy(() => import("./components/BookCarousel"));
const Offers = lazy(() => import("./pages/Offers/Offers"));
const TopSellingBooks = lazy(
  () => import("./pages/TopSellingBooks/TopSellingBooks")
);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col h-[100vh]">
      <main className="flex-1">
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Header />
          <Bestsellers />
          <BookFairSection />
          <BookCarousel />
          <Offers />
          <TopSellingBooks />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
