import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const RatingStarsInput = ({ rating, setRating }) => {
  const total = 5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => {
        const index = i + 1;
        const isActive = index <= rating;

        return (
          <motion.div
            type="button"
            key={index}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRating(index)}
            className="focus:outline-none"
          >
            <Star
              className={`w-7 h-7 transition ${
                isActive
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
            />
          </motion.div>
        );
      })}
      <span className="ml-2 text-sm text-gray-600 font-medium">
        {rating} / 5
      </span>
    </div>
  );
};

export default RatingStarsInput;
