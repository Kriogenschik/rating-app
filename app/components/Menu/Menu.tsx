// 'use client'

import { getMenu } from "@/api/menu";
import styles from "./Menu.module.css";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.iterface";
import CoursesIcon from './icons/courses.svg'
import ServicesIcon from './icons/services.svg'
import BooksIcon from './icons/books.svg'
import ProductsIcon from './icons/products.svg'
import { TopLevelCategory } from "@/interfaces/page.interface";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const firstLevelMenu: FirstLevelMenuItem[] = [
  {route: 'courses', name: "Courses", icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
  {route: 'services', name: "Services", icon: <ServicesIcon/>, id: TopLevelCategory.Services},
  {route: 'books', name: "Books", icon: <BooksIcon/>, id: TopLevelCategory.Books},
  {route: 'products', name: "Products", icon: <ProductsIcon/>, id: TopLevelCategory.Products},
];

export const Menu = async (): Promise<JSX.Element> => {
  const menu = await getMenu();

  // const router = useRouter();

  const firstCategory = 0

  const openSecondLevel = (secondCategory: string) => {
    menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        m.isOpened = !m.isOpened;
      }
      return m;
    })
  }

  const buildFirstLevel = () => {
    return(
      <>
      {firstLevelMenu.map(m => (
        <div key={m.route}>
          <Link href={`/${m.route}`}>
            <div className={cn(styles.firstLevel, {
              [styles.firstLevelActive]: m.id === firstCategory
            })}>
              {m.icon}
              <span>{m.name}</span>
            </div>
          </Link>
          {m.id === firstCategory && buildSecondLevel(m)}
        </div>
      ))}
      </>
    )
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map(m => {
          // if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
          //   m.isOpened = true;
          // }
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
          [styles.thirdLevelActive]: false
        })}>
          {p.category}
        </Link>
      ))
    )
  }

  return (
      <div className={styles.menu}>
        {buildFirstLevel()}
      </div>
  );
};
