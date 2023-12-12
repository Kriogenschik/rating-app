"use client";

import { ProductProps } from "./Product.props";
import cn from "classnames";

import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceDolars } from "@/helpers/helpers";
import { Divider } from "../Divider/Divider";
import { useState } from "react";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";

export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  return (
    <>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <img
            src={"https://courses-top.ru" + product.image}
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
            <Tag key={c} className={styles.category} color="ghost">
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>price</div>
        <div className={styles.creditTitle}>credit</div>
        <div className={styles.rateTitle}>
          {product.reviewCount}{" "}
          {declOfNum(product.reviewCount, ["review", "reviews"])}
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Advantages:</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Flaws:</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance="primary">Details</Button>
          <Button
            appearance="ghost"
            className={styles.reviewBtn}
            arrow={isReviewOpened ? "down" : "right"}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >
            Rewievs
          </Button>
        </div>
      </Card>
      <Card
        color="blue"
        className={cn(styles.reviews, {
          [styles.opened]: isReviewOpened,
          [styles.closed]: !isReviewOpened,
        })}
      >
        {product.reviews.map((r) => (
          <div key={r._id}>
            <Review  review={r} />
            <Divider />
          </div>
        ))}
        <ReviewForm productId={product._id}/>
      </Card>
    </>
  );
};
