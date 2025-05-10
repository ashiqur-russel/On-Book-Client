import React, { Suspense, lazy, useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/shared/Footer";
import RecentListings from "./components/RecentListings/RecentListings";
import ContactInformation from "./components/ContactInformation/ContactInformation";
import RecentNonfiction from "./components/RecentNonfiction/RecentNonfiction";
import CustomStyledSpinner from "./components/shared/LoaderSpinner";

const Header = lazy(() => import("./pages/Header/Header"));
const Bestsellers = lazy(() => import("./pages/BestSeller/BestSeller"));
const BookFairSection = lazy(() => import("./pages/BookFair/BookFair"));
const BookCarousel = lazy(() => import("./components/BookCarousel"));
const Offers = lazy(() => import("./pages/Offers/Offers"));

const App = () => {
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  useEffect(() => {
    console.log("useEffect: Setting isLoadingInitial to false after 500ms");
    const timer = setTimeout(() => {
      setIsLoadingInitial(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoadingInitial) {
    return <CustomStyledSpinner />;
  }

  console.log("App: Showing main content");
  return (
    <div className="min-h-screen flex flex-col h-[100vh]">
      <main className="flex-1">

        <Suspense fallback={<CustomStyledSpinner />}>
          <Header />
        </Suspense>
        <Suspense fallback={<CustomStyledSpinner />}>
          <BookCarousel />
        </Suspense>

        <Suspense fallback={<CustomStyledSpinner />}>
          <Bestsellers />
        </Suspense>

        <Suspense fallback={<CustomStyledSpinner />}>
          <BookFairSection />
        </Suspense>

        <Suspense fallback={<CustomStyledSpinner />}>
          <Offers />
        </Suspense>
        <ContactInformation />
        <RecentListings />
        <RecentNonfiction />
      </main>
      <Footer />
    </div>
  );
};

export default App;
