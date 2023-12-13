"use client";
import {
  FirstLevelMenuItem,
  MenuItem,
  PageItem,
} from "@/interfaces/menu.iterface";
import styles from "./Menu.module.css";
import cn from "classnames";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface MenuSecondLevelProps {
  menu: MenuItem[];
  menuItem: FirstLevelMenuItem;
}

export const MenuSecondLevel = ({ menu, menuItem }: MenuSecondLevelProps) => {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: "auto",
    },
    hidden: { opacity: 0, height: 0 },
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menuState.map((m) => {
          if (m.pages.map((p) => p.alias).includes(pathname.split("/")[2])) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
              >
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((p) => (
      <motion.div key={p._id} variants={variantsChildren}>
        <Link
          href={`/${route}/${p.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` === pathname,
          })}
        >
          {p.category}
        </Link>
      </motion.div>
    ));
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenuState(
      menuState.map((m) => {
        if (m._id.secondCategory === secondCategory) {
          m.isOpened = !m.isOpened;
        }
        return m;
      })
    );
  };

  return <>{buildSecondLevel(menuItem)}</>;
};
