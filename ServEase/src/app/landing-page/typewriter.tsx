import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/landing-page.module.css";

const Typewriter = ({
  lines,
  typingSpeed = 100,
  pauseBetweenLines = 500,
  pauseAtEnd = 2000,
  className = "",
  style = {},
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (isTyping) {
          if (currentLineIndex < lines.length) {
            const currentLine = lines[currentLineIndex];
            if (currentCharIndex < currentLine.length) {
              setDisplayText((prev) => {
                const allLines = lines.slice(0, currentLineIndex).join("\n");
                const currentPartial = currentLine.slice(
                  0,
                  currentCharIndex + 1
                );
                return currentLineIndex === 0
                  ? currentPartial
                  : allLines + "\n" + currentPartial;
              });
              setCurrentCharIndex((prev) => prev + 1);
            } else {
              if (currentLineIndex < lines.length - 1) {
                setTimeout(() => {
                  setCurrentLineIndex((prev) => prev + 1);
                  setCurrentCharIndex(0);
                }, pauseBetweenLines);
              } else {
                setTimeout(() => {
                  setIsTyping(false);
                }, pauseAtEnd);
              }
            }
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setCurrentLineIndex(0);
            setCurrentCharIndex(0);
            setIsTyping(true);
          }
        }
      },
      isTyping ? typingSpeed : typingSpeed * 0.5
    );

    return () => clearTimeout(timer);
  }, [
    currentLineIndex,
    currentCharIndex,
    isTyping,
    displayText,
    lines,
    typingSpeed,
    pauseBetweenLines,
    pauseAtEnd,
  ]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className={className} style={style}>
      {displayText.split("\n").map((line, index) => (
        <p key={index} className={styles.areYouLooking}>
          {line}
          {index === displayText.split("\n").length - 1 && (
            <span
              style={{
                opacity: showCursor ? 1 : 0,
                transition: "opacity 0.1s",
                marginLeft: "2px",
                fontWeight: "normal",
              }}
            >
              |
            </span>
          )}
        </p>
      ))}
    </div>
  );
};

export default Typewriter;
