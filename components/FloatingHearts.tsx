"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; animationDuration: number; size: number }[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 5 + 5, // 5-10s
        size: Math.random() * 20 + 10, // 10-30px
      };
      
      setHearts((prevHearts) => [...prevHearts, newHeart]);

      // Remove heart after animation finishes
      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.filter((h) => h.id !== newHeart.id));
      }, newHeart.animationDuration * 1000);
    };

    const interval = setInterval(createHeart, 800); // Create a new heart every 800ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px] text-primary/30"
          initial={{ y: 0, x: 0, opacity: 0.8, scale: 0.5 }}
          animate={{
            y: -1000,
            x: Math.random() * 200 - 100,
            opacity: 0,
            scale: 1.5,
          }}
          transition={{
            duration: heart.animationDuration,
            ease: "easeOut",
          }}
          style={{ left: `${heart.left}%`, fontSize: `${heart.size}px` }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
