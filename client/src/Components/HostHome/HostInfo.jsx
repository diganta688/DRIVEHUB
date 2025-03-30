import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const HostInfo = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = "easeOutCubic",
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const lines = text.split("\n");
  const words = lines.map((line) =>
    line.split(" ").map((word) => word.split(""))
  );
  const letters = words.flat(2);
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next) => {
            await next(animationTo);
            animatedCount.current += 1;
            if (
              animatedCount.current === letters.length &&
              onLetterAnimationComplete
            ) {
              onLetterAnimationComplete();
            }
          }
        : animationFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <div
      ref={ref}
      className={`split-parent overflow-hidden inline-block ${className}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
    >
      {words.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className={`block ${
            lineIndex === 1
              ? "text-3xl text-gray-500 mt-2"
              : "text-5xl text-gray-700"
          }`}
        >
          {line.map((word, wordIndex) => (
            <span
              key={wordIndex}
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              {word.map((letter, letterIndex) => {
                const index =
                  words
                    .slice(0, lineIndex)
                    .flat(2)
                    .concat(words[lineIndex].slice(0, wordIndex).flat())
                    .length + letterIndex;

                return (
                  <animated.span
                    key={index}
                    style={springs[index]}
                    className="inline-block transform transition-opacity will-change-transform"
                  >
                    {letter}
                  </animated.span>
                );
              })}
              <span style={{ display: "inline-block", width: "0.3em" }}>
                &nbsp;
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HostInfo;
