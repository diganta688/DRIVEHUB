import React from "react";
import { Star } from "lucide-react";

const CarImageCard = ({ carDetails }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="aspect-[4/3] relative group">
        <img
          src={carDetails.image}
          alt={carDetails.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <h1 className="text-2xl font-bold text-white">{carDetails.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-white">{carDetails.rating}</span>
            <span className="text-white/70">({carDetails.reviews} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarImageCard;
