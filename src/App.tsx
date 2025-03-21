import { Suspense, lazy } from "react";
import "./App.css";
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
        {/* Header */}
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header />
        </Suspense>

        {/* Bestsellers */}
        <Suspense fallback={<div>Loading Bestsellers...</div>}>
          <Bestsellers />
        </Suspense>

        {/* BookFairSection */}
        <Suspense fallback={<div>Loading Book Fair...</div>}>
          <BookFairSection />
        </Suspense>

        {/* BookCarousel */}
        <Suspense fallback={<div>Loading Carousel...</div>}>
          <BookCarousel />
        </Suspense>

        {/* Offers */}
        <Suspense fallback={<div>Loading Offers...</div>}>
          <Offers />
        </Suspense>

        {/* TopSellingBooks */}
        <Suspense fallback={<div>Loading Top Selling...</div>}>
          <TopSellingBooks />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
