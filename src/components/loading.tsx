"use client";

import { useEffect, useState } from "react";
import { useLoading } from "src/components/loading-context";
import styles from "../../../src/app/styles/loading.module.css";

const Loading = () => {
  const { isLoading, hideLoading } = useLoading();
  const [fadeClass, setFadeClass] = useState(styles.gif);

  useEffect(() => {
    if (!isLoading) return;

    // reset state and trigger fade-in
    setFadeClass(styles.gif);
    const fadeInDelay = setTimeout(() => {
      setFadeClass(`${styles.gif} ${styles.fadeIn}`);
    }, 0);

    const fadeOutTimer = setTimeout(() => {
      setFadeClass(`${styles.gif} ${styles.fadeOut}`);
    }, 2000); // show duration

    const removeTimer = setTimeout(() => {
      hideLoading();
    }, 2700); // match with transition

    return () => {
      clearTimeout(fadeInDelay);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles.loading}>
      <img src="/loading.gif" alt="Loading" className={fadeClass} />
    </div>
  );
};

export default Loading;
