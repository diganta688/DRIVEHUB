import React from "react";

function ImageGalleryText({ q, ans }) {
  return (
    <div>
      <div className="mb-5 car-img-text-header text-center">
        <h1>{q}</h1>
      </div>
      <div>
        <h4 className="car-img-gallery-text">
          {ans.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h4>
      </div>
    </div>
  );
}

export default ImageGalleryText;
