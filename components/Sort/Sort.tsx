"use client";

import { SortEnum, SortProps } from "./Sort.props";
import cn from "classnames";
import SortIcon from "./Sort.svg";

import styles from "./Sort.module.css";
import { KeyboardEvent, useReducer } from "react";
import { sortReducer } from "@/page-components/TopPageComponent/sort.reducer";

export const Sort = ({
  // sort,
  // setSort,
  products,
  className,
  ...props
}: SortProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    { products, sort: SortEnum.Rating }
  );

  const setSort = async (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  const handleKeyDown = (e: KeyboardEvent, sort: SortEnum) => {
    if (e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      setSort(sort);
    }
  }

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id="sort">Sorting</div>
      <span
        id="rating"
        onClick={() => setSort(SortEnum.Rating)}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating,
        })}
        aria-selected={sort === SortEnum.Rating}
        aria-aria-labelledby="sort rating"
      >
        <SortIcon className={styles.sortIcon} /> By Rating
      </span>
      <span
      id="price"
        onClick={() => setSort(SortEnum.Price)}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price,
        })}
        aria-selected={sort === SortEnum.Price}
        aria-aria-labelledby="sort price"
      >
        <SortIcon className={styles.sortIcon} /> By Price
      </span>
    </div>
  );
};
