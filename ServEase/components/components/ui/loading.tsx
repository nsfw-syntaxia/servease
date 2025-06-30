"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "../../../src/app/styles/loading.module.css";

const Loading = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [fadeClass, setFadeClass] = useState(styles.gif); // base class

  useEffect(() => {
    setVisible(true);
    setFadeClass(styles.gif); // reset

    // trigger fade-in one frame later
    const fadeInDelay = setTimeout(() => {
      setFadeClass(`${styles.gif} ${styles.fadeIn}`);
    }, 0);

    const fadeOutTimer = setTimeout(() => {
      setFadeClass(`${styles.gif} ${styles.fadeOut}`);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2700);

    return () => {
      clearTimeout(fadeInDelay);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className={styles.loading}>
      <img src="/loading.gif" alt="Loading" className={fadeClass} />
    </div>
  );
};

export default Loading;
