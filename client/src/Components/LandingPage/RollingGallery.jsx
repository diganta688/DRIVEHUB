import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import "./RollingGallery.css";

const IMGS = [
  "data:image/jpeg;base64,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",
  "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VwZXJjYXJ8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1611740801331-d8b5d6962822?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VwZXJjYXJ8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1566024164372-0281f1133aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VwZXJjYXJ8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cGVyY2FyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1543796559-9f8555fbedc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxzdXBlcmNhcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHN1cGVyY2FyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1618264366449-c8a2a1b799ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHN1cGVyY2FyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1628063945950-b3745dc9ec8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHN1cGVyY2FyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1576682840448-ab0b32db2800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxzdXBlcmNhcnxlbnwwfHwwfHx8MA%3D%3D"
];


const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = IMGS;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5; // Increased width for items
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 0.1,
        ease: "easeOut",
      },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  // Autoplay effect with adjusted timing
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 360 / faceCount,
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - 360 / faceCount);
      }, 2000);

      return () => clearInterval(autoplayRef.current);
    }
  }, [autoplay, rotation, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pause on hover with smooth transition
  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop(); // Stop the animation smoothly
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - 360 / faceCount,
        transition: { duration: 2, ease: "linear" },
      });
      rotation.set(rotation.get() - 360 / faceCount);

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 360 / faceCount,
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - 360 / faceCount);
      }, 2000);
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left"></div>
      <div className="gallery-gradient gallery-gradient-right"></div>
      <div className="gallery-content">
        <motion.div
          drag="x"
          className="gallery-track"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
            >
              <img src={url} alt="gallery" className="gallery-img" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
