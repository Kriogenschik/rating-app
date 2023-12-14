"use client";

import { SortProps } from "./Products.props";
import cn from "classnames";

import styles from "./Products.module.css";
import { useReducer } from "react";
import { sortReducer } from "@/page-components/TopPageComponent/sort.reducer";
import { Product } from "../Product/Product";
import { useReducedMotion } from "framer-motion";

export const Products = ({
  products,
  className,
  ...props
}: SortProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    { products, sort: 0 }
  );

  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn(styles.products, className)} {...props} role="list">
      {sortedProducts &&
        sortedProducts.map((p) => (
          <Product
            layout={shouldReduceMotion ? false : true}
            product={p}
            key={p._id}
            role="listItem"
          />
        ))}
    </div>
  );
};
