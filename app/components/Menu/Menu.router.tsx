'use client'
import { FirstLevelMenuItem, MenuItem, PageItem } from "@/interfaces/menu.iterface";
import styles from "./Menu.module.css";
import cn from "classnames";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getMenu } from "@/api/menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MenuSecondLevelProps {
  menu: MenuItem[],
  menuItem: FirstLevelMenuItem,
}

export const MenuSecondLevel = ({menu, menuItem}: MenuSecondLevelProps) => {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<MenuItem[]>(menu)

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {(menuState).map(m => {
          if (m.pages.map(p => p.alias).includes(pathname.split('/')[2])) {
            m.isOpened = true;
          }
          return (
          <div key={m._id.secondCategory}>
            <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
            <div className={cn(styles.secondLevelBlock, {
              [styles.secondLevelBlockOpened]: m.isOpened
            })}>
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        )})}
      </div>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(p => (
        <Link key={p._id} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: `/${route}/${p.alias}` === pathname
        })}>
          {p.category}
        </Link>
      ))
    )
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenuState(menuState.map(m => {
      if (m._id.secondCategory === secondCategory) {
        m.isOpened = !m.isOpened;
      }
      return m;
    }))
  }

  return <>{buildSecondLevel(menuItem)}</>
}