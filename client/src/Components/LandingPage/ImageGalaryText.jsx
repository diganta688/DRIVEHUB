import React from "react";

function ImageGalleryText({ q, ans }) {
  return (
    <div>
      <div className="mb-3 car-img-text-header text-center font-bold text-3xl font-serif">
        <h2>{q}</h2>
      </div>
      <div>
        <p >
          {ans.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}

export default ImageGalleryText;
