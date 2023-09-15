import { useEffect, useState } from "react";

const useCheckIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 426;
  const isTablet = width <= 769;

  return { isTablet, isMobile };
};

export default useCheckIsMobile;
