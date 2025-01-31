import { lazy } from "react";

// Lazy load BookCarousel and ensure CSS is loaded
const LazyBookCarousel = lazy(async () => {
  await import("slick-carousel/slick/slick.css");
  await import("slick-carousel/slick/slick-theme.css");
  return import("./BookCarousel");
});

export default LazyBookCarousel;
