"use client"
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import styles from "./ReviewForm.module.css";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from './close.svg'
import { useForm, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit } = useForm<IReviewForm>();
  const onSubmit = (data: IReviewForm) => {
console.log(data);

  }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input {...register('name')} placeholder="Name" />
        <Input {...register('title')} placeholder="Review title" className={styles.title} />
        <div className={styles.rating}>
          <span>Rate:</span>
          <Controller
          control={control}
          name="rating"
          render={({field}) => (
            <Rating isEditable rating={field.value} ref={field.ref} setRating={field.onChange} />
          )}
          />
          
        </div>
        <Textarea {...register('description')} placeholder="review text" className={styles.description} />
        <div className={styles.submit}>
          <Button appearance="primary">Send</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Your review was sending</div>
        <div>
          Thank You! Your review will be published after checking
        </div>
        <CloseIcon className={styles.close}/>
      </div>
    </form>
  );
};
