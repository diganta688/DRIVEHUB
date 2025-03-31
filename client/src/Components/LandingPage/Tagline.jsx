import React from "react";
import TrueFocus from "./TrueFocus";
import TextPressure from "./TextPressure";

function Tagline() {
  return (
    <div className="tagline" style={{position: "relative", marginBottom: "4rem"}}>
      <div style={{ position: "relative", height: "auto", cursor: "pointer"}} >
        <TextPressure
          text="DriveHUB"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#000"
          strokeColor="#ff0000"
        />
      </div>
      <div className="mt-3">
        <TrueFocus
          sentence="Your-Ride Your-Way"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>
      
    </div>
  );
}

export default Tagline;
