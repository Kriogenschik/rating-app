"use client";

import { SortProps } from "./Products.props";
import cn from "classnames";

import styles from "./Products.module.css";
import { Product } from "../Product/Product";
import { useReducedMotion } from "framer-motion";

export const Products = ({
  products,
  className,
  ...props
}: SortProps): JSX.Element => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn(styles.products, className)} {...props} role="list">
      {products &&
        products.map((p) => (
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
