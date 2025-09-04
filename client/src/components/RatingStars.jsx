import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const RatingStars = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const total = 5;

  return (
    <div className="flex items-center gap-1 ">
      {Array.from({ length: total }).map((_, i) => {
        const isFull = i < full;
        const isHalf = i === full && half;

        return (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Star
              className={`w-5 h-5 ${
                isFull
                  ? "fill-yellow-400"
                  : isHalf
                  ? "fill-gradient-to-r from-yellow-400 to-gray-300 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </motion.div>
        );
      })}
      <span className="ml-2 text-xs font-medium text-gray-600">
        {rating ? rating.toFixed(1) : "No Ratings"}
      </span>
    </div>
  );
};

export default RatingStars;
