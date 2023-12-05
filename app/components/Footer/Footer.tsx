import { FooterProps } from "./Footer.props";
import styles from "./Footer.module.css";
import cn from "classnames";
import { format } from "date-fns";

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <p className={styles.text}>OwlTop © 2020 - {format(new Date(), 'yyyy')} All rights reserved</p>
      <a href="#" target="_blank" className={styles.link}>
        Terms of use
      </a>
      <a href="#" target="_blank" className={styles.link}>
        Privacy Policy
      </a>
    </footer>
  );
};
