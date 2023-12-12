"use client";
import { RatingProps } from "./Rating.props";
import cn from "classnames";
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";
import StarIcon from "./star.svg";

import styles from "./Rating.module.css";

export const Rating = forwardRef(({
  isEditable = false,
  rating,
  setRating,
  className,
  ...props
}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArrray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.isEditable]: isEditable,
            })}
          onMouseEnter={() => changeDispay(i + 1)}
          onMouseLeave={() => changeDispay(rating)}
          onClick={() => saveRating(i + 1)}
        >
          <StarIcon
            
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGElement>) =>
              isEditable && handleSpace(i + 1, e)
            }
          />
        </span>
      );
    });
    setRatingArrray(updatedArray);
  };

  const changeDispay = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(i);
  };

  const saveRating = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(i);
  };

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code !== "Space" || !setRating) {
      return;
    }
    setRating(i);
  };

  return (
    <div {...props} ref={ref}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  );
});
