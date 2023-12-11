'use client'

import { SortEnum, SortProps } from "./Sort.props";
import cn from "classnames";
import SortIcon from "./Sort.svg";

import styles from "./Sort.module.css";
import { useReducer } from "react";
import { sortReducer } from "@/page-components/TopPageComponent/sort.reducer";

export const Sort = ({
  // sort,
  // setSort,
  products,
  className,
  ...props
}: SortProps): JSX.Element => {
  const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating});

  const setSort = async (sort: SortEnum) => {
    dispatchSort({type: sort})
  }

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}>
        <SortIcon className={styles.sortIcon} /> By Rating
      </span>
      <span onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}>
        <SortIcon className={styles.sortIcon} /> By Price
      </span>
    </div>
  );
};
