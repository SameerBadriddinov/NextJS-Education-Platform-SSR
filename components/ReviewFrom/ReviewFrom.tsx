import React, { useState } from 'react'
import { ReviewFromProps } from './ReviewFrom.props'
import styles from "./ReviewFrom.module.css"
import cn from "classnames"
import Input from '../Input/Input'
import Rating from '../Rating/Rating'
import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'
import CloseIcon from "./close.svg"
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface'
import axios from 'axios'
import { API } from '../../helpers/api'

const ReviewForm = ({productId, className, ...props}: ReviewFromProps): JSX.Element => {
  const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const onSubmit = async (formData: IReviewForm) => {
    console.log(productId)
    try{
      const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId})
      if(data.message) {
        setIsSuccess(true)
        reset()
      }else{
        setError("Что то пошло не так")
      }
    }catch(e) {
      setError(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input 
          error={errors.name} 
          {...register("name", {required: {value: true, message: "Заполните имя"}})} 
          placeholder='Имя' 
        />
        <Input 
          error={errors.title} 
          {...register("title", {required: {value: true, message: "Заполните Заголовок"}})} 
          placeholder='Заголовок отзывов' 
          className={styles.title} 
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller 
            control={control}
            name="rating" 
            rules={{required: {value: true, message: "Укажите рейтинг"}}} 
            render={({field}) => (
              <Rating 
                isEditable 
                rating={field.value} 
                error={errors.rating}
                ref={field.ref} 
                setRating={field.onChange} 
              />
            )}
          />
        </div>
        <Textarea 
          error={errors.description} 
          {...register("description", {required: {value: true, message: "Заполните описание"}})} 
          className={styles.description} 
          placeholder="Текст отзывов" 
        />
        <div className={styles.submit}>
          <Button appearance='primary'>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>

      {isSuccess && <div className={cn(styles.success, styles.panel)}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>
          Спаибо, ваш отзыв будет опубликован после проверки.
        </div>
        <CloseIcon className={styles.close} onClick={() => (setIsSuccess(false))}/>
      </div>}

      {error && <div className={cn(styles.error, styles.panel)}>
        Что-то пошло не так, попробуйте обновить страницу
        <CloseIcon className={styles.close} onClick={() => setError(undefined)}/>
      </div>}

    </form>
  )
}

export default ReviewForm