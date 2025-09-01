import React from "react";

const RatingStars = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const total = 5;

  return (
    <div className="flex items-center gap-1 text-yellow-500 text-2xl">
      {Array.from({ length: total }).map((_, i) => (
        <span>{i < full ? "⭑" : i === full && half ? "⭒" : "⭒"}</span>
      ))}
      <span className="ml-2 text-xs text-muted">
        {rating ? rating.toFixed(1) : "No Ratings"}
      </span>
    </div>
  );
};

export default RatingStars;
