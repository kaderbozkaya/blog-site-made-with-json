import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isMobile) {
    return null;
  }

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-5 right-5 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 transition duration-300"
    >
      🖱️
    </button>
  );
}
