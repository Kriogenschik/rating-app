'use client'

import { SortEnum, SortProps } from "./Products.props";
import cn from "classnames";
import SortIcon from "./Sort.svg";

import styles from "./Products.module.css";
import { useReducer } from "react";
import { sortReducer } from "@/page-components/TopPageComponent/sort.reducer";
import { Product } from "../Product/Product";

export const Products = ({
  // sort,
  // setSort,
  products,
  className,
  ...props
}: SortProps): JSX.Element => {
  const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: 0});

  
  return (
    <div className={cn(styles.products, className)} {...props}>
      {sortedProducts && sortedProducts.map((p) => <Product layout product={p} key={p._id}/>)}
    </div>
  );
};
