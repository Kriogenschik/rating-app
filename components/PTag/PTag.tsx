import { PtagProps } from "./Ptag.props";
import cn from "classnames";

import styles from "./PTag.module.css";

export const PTag = ({
  size = "m",
  children,
  className,
  ...props
}: PtagProps): JSX.Element => {
  return (
    <p
      className={cn(styles.text, className, {
        [styles.small]: size === "s",
        [styles.middle]: size === "m",
        [styles.large]: size === "lg",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
