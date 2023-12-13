"use client";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import styles from "./ReviewForm.module.css";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";
import { useState } from "react";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      console.log({ ...formData });
      if (
        formData.name &&
        formData.title &&
        formData.rating &&
        formData.description
      ) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Something Going wrong...");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Type your name" },
          })}
          placeholder="Name"
          error={errors.name}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Type title" },
          })}
          placeholder="Review title"
          className={styles.title}
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Rate:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "set rating" } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register("description", {
            required: { value: true, message: "Type yur review" },
          })}
          placeholder="Review text"
          className={styles.description}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary">Send</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={styles.success}>
          <div className={styles.successTitle}>Your review was sending</div>
          <div>Thank You! Your review will be published after checking</div>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
        </div>
      )}
      {error && (
        <div className={styles.error}>
          {error}
          <CloseIcon className={styles.close} onClick={() => setError('')}/>
        </div>
      )}
    </form>
  );
};
