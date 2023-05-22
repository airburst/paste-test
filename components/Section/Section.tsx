import { ReactNode } from "react";
import styles from "./Section.module.css";

type Props = {
  children?: ReactNode;
  color?: "light" | "dark";
};

export const Section = ({ children, color }: Props) => {
  let classes = `${styles.section}`;
  // Set background colour
  if (color) {
    classes += ` ${styles[color]}`;
  }

  return (
    <div className={classes}>
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
};
