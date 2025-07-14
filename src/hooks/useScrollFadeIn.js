// hooks/useScrollFadeIn.js
import { useRef, useEffect, useState } from "react";

const useScrollFadeIn = (direction = "up", duration = 1, delay = 0) => {
  const dom = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const handleDirection = (name) => {
    switch (name) {
      case "up":
        return "translate3d(0, 20%, 0)";
      case "down":
        return "translate3d(0, -20%, 0)";
      case "left":
        return "translate3d(20%, 0, 0)";
      case "right":
        return "translate3d(-20%, 0, 0)";
      default:
        return;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // 한 번만 실행
        }
      },
      { threshold: 0.1 }
    );

    if (dom.current) {
      observer.observe(dom.current);
    }

    return () => observer.disconnect();
  }, []);

  return {
    ref: dom,
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translate3d(0, 0, 0)" : handleDirection(direction),
      transition: `all ${duration}s ease-out ${delay}s`,
    },
  };
};

export default useScrollFadeIn;
