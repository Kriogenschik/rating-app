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
import { KeyboardEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MenuSecondLevelProps {
  menu: MenuItem[];
  menuItem: FirstLevelMenuItem;
}

export const MenuSecondLevel = ({ menu, menuItem }: MenuSecondLevelProps) => {
  // const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);
  const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();

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
      <ul className={styles.secondBlock}>
        {menuState.map((m) => {
          if (m.pages.map((p) => p.alias).includes(pathname.split("/")[2])) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((p) => (
      <motion.li key={p._id} variants={variantsChildren}>
        <Link
          aria-current={`/${route}/${p.alias}` === pathname ? "page" : false}
          tabIndex={isOpened ? 0 : -1}
          href={`/${route}/${p.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` === pathname,
          })}
        >
          {p.category}
        </Link>
      </motion.li>
    ));
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenuState(
      menuState.map((m) => {
        if (m._id.secondCategory === secondCategory) {
          setAnnounce(m.isOpened ? "closed" : "opened");
          m.isOpened = !m.isOpened;
        }
        return m;
      })
    );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  return (
    <>
      {announce && (
        <span role="log" className="visually-hidden">
          {announce === "opened" ? "open" : "close"}
        </span>
      )}
      {buildSecondLevel(menuItem)}
    </>
  );
};
