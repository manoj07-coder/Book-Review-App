import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const RatingStars = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const total = 5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => {
        const isFull = i < full;
        const isHalf = i === full && half;

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
          >
            {isFull ? (
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ) : isHalf ? (
              <div className="relative w-5 h-5">
                {/* Background empty star */}
                <Star className="w-5 h-5 text-gray-300" />
                {/* Overlay half star */}
                <Star
                  className="w-5 h-5 text-yellow-400 fill-yellow-400 absolute top-0 left-0 overflow-hidden"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              </div>
            ) : (
              <Star className="w-5 h-5 text-gray-300" />
            )}
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
