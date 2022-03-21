import React, { ForwardedRef, forwardRef, useRef, useState } from 'react'
import { ProductProps } from './Product.props'
import cn from "classnames"
import styles from "./Product.module.css"
import Card from '../Card/Card'
import Rating from '../Rating/Rating'
import Tag from '../Tag/Tag'
import { declOfNum, priceRu } from '../../helpers/helpers'
import Button from '../Button/Button'
import Divider from '../Divider/Divider'
import Image from 'next/image'
import {Review, ReviewFrom} from '../'
import { motion } from 'framer-motion'

// eslint-disable-next-line
const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReview, setIsReview] = useState<boolean>(false)
  const reviewRef = useRef<HTMLDivElement>(null)

  const variants = {
    visible: {opacity: 1, height: "auto"},
    hidden: {opacity: 0, height: 0},
  }

  const scrollToReview = () => {
    setIsReview(true)
    reviewRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  return (
    <div className={className} ref={ref} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          {/* eslint-disable-next-line */}
          <img 
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image} 
            alt={product.title} 
            width={70}
            height={70}
          />
        </div>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>
            {priceRu(product.price)}
            {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
          </div>
          <div className={styles.credit}>
            {priceRu(product.credit)}/<span className={styles.month}>мес</span>
          </div>
          <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
          <div className={styles.tags}>{product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}</div>
          <div className={styles.priceTitle} aria-hidden={true}>цена</div>
          <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
          <div className={styles.rateTitle}>
            <a href='#ref' onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
          </div>
          <Divider className={styles.hr} />
          <div className={styles.description}>{product.description}</div>
          <div className={styles.features}>
            {product.characteristics.map(c => (
              <div className={styles.characteristic} key={c.name}>
                <span className={styles.characteristicsName}>{c.name}</span>
                <span className={styles.characteristicsDots}></span>
                <span className={styles.characteristicsValue}>{c.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.advBlock}>
            {product.advantages && <div className={styles.advantages}>
              <div className={styles.advTitle}>преимушества</div>
              <div>{product.advantages}</div>
            </div>}

            {product.disadvantages && <div className={styles.disadvantages}>
              <div className={styles.advTitle}>недостатки</div>
              <div>{product.disadvantages}</div>
            </div>}
          </div>
          <Divider className={cn(styles.hr, styles.hr2)} />
          
          <div className={styles.actions}>
            <Button appearance='primary' >Узнать подробнее</Button>
            <Button 
              appearance='ghost'
              arrow={isReview ? "down" : "right"} 
              className={styles.reviewBtn}
              onClick={() => setIsReview(!isReview)}
            >Читать отзывы</Button>
          </div>
      </Card>
      
      <motion.div 
        animate={isReview ? "visible" : 'hidden'}
        variants={variants}
        initial="hidden"
      >
        <Card color='blue' className={styles.reviews} ref={reviewRef}>
          {product.reviews.map(r => (
            <div key={r._id}>
              <Review key={r._id} review={r} />
              <Divider />
            </div>
          ))}
          <ReviewFrom productId={product._id} />
        </Card>
      </motion.div>
    </div>
  )
}))

export default Product