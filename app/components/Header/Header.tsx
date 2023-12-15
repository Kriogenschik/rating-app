"use client";

import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import Logo from "../../logo.svg";
import { ButtonIcon } from "@/components/ButtonIcon/ButtonIcon";
import { motion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsopened] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    setIsopened(false);
  }, [path]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
    },
  };
  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo />
      <ButtonIcon
        appearance="white"
        icon="menu"
        onClick={() => setIsopened(true)}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={"closed"}
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.closeMenu}
          appearance="white"
          icon="close"
          onClick={() => setIsopened(false)}
        />
      </motion.div>
    </header>
  );
};
