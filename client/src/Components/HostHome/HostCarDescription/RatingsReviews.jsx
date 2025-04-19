import React from "react";

const reviews = [
  {
    name: "John Doe",
    date: "2023-07-15",
    rating: 4.5,
    comment: "Great car! Very clean and drove perfectly. Would definitely rent again.",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Sarah Johnson",
    date: "2023-06-22",
    rating: 5,
    comment:
      "Excellent condition and very comfortable for long trips. The host was very responsive and helpful.",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "Michael Chen",
    date: "2023-05-30",
    rating: 4,
    comment: "Good car, everything worked as expected. Pick up and drop off were smooth.",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

const getStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push("★");
    } else if (i - rating < 1) {
      stars.push("☆");
    } else {
      stars.push("☆");
    }
  }
  return stars.join(" ");
};

const RatingsReviews = () => {
  const totalReviews = reviews.length;
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  const starCounts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    const rounded = Math.round(r.rating);
    starCounts[rounded - 1]++;
  });

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Ratings & Reviews</h2>

      {/* Average Rating */}
      <div className="flex items-center mb-6">
        <div className="text-4xl font-bold mr-4">{avgRating.toFixed(1)}</div>
        <div>
          <div className="text-yellow-500 text-lg">{getStars(avgRating)}</div>
          <div className="text-sm text-gray-500">{totalReviews} reviews</div>
        </div>
      </div>

      {/* Rating Breakdown */}
      {[5, 4, 3, 2, 1].map((star, i) => (
        <div key={star} className="flex items-center mb-1">
          <div className="w-6 text-sm">{star} ★</div>
          <div className="flex-1 mx-2 bg-gray-200 rounded h-2 overflow-hidden">
            <div
              className="bg-yellow-400 h-full"
              style={{ width: `${(starCounts[star - 1] / totalReviews) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm w-4 text-right">
            {starCounts[star - 1] || 0}
          </div>
        </div>
      ))}

      {/* Review Details */}
      <h3 className="text-lg font-medium mt-6 mb-4">Review Details</h3>
      <div className="space-y-6">
        {reviews.map((r, i) => (
          <div key={i} className="border-b pb-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-yellow-500 text-sm">
                    {getStars(r.rating)} <span className="text-gray-500">({r.rating})</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{r.date}</div>
            </div>
            <p className="text-gray-700 mt-2">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsReviews;
