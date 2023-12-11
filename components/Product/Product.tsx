"use client";

import { ProductProps } from "./Product.props";
import cn from "classnames";

import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { priceDolars } from "@/helpers/helpers";

export const Product = ({
  // sort,
  // setSort,
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  return (
    <Card className={styles.product}>
      <div className={styles.logo}>
        <img
          src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
          alt={product.title}
        />
      </div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>
        {priceDolars(product.price)}
        {product.oldPrice && (
          <Tag className={styles.oldPrice} color="green">
            {priceDolars(product.price - product.oldPrice)}
          </Tag>
        )}
      </div>
      <div className={styles.credit}>
        {priceDolars(product.credit)}/
        <span className={styles.month}>month</span>
      </div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className={styles.tags}>
        {product.categories.map((c) => (
          <Tag key={c} color="ghost">
            {c}
          </Tag>
        ))}
      </div>
      <div className={styles.priceTitle}>price</div>
      <div className={styles.creditTitle}>credit</div>
      <div className={styles.rateTitle}>{product.reviewCount} reviews</div>
      <hr className={styles.hr} />
      <div className={styles.description}>{product.description}</div>
      <div className={styles.feature}>features</div>
      <div className={styles.advantages}>
        <div className={styles.advBlock}>
          <div>Advantages:</div>
          <div>{product.advantages}</div>
        </div>
        <div className={styles.disadvantages}>
          <div>Flaws:</div>
          <div>{product.disadvantages}</div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.actions}>
        <Button appearance="primary">Details</Button>
        <Button appearance="ghost" arrow={"right"}>
          Rewievs
        </Button>
      </div>
    </Card>
    // <Card className={cn(styles.product, className)} {...props}>
    //   <div></div>
    // </Card>
  );
};
