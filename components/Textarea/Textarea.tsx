import React, { ForwardedRef, forwardRef } from 'react'
import { TextareaProps } from './Textarea.props'
import styles from "./Textarea.module.css"
import cn from "classnames"

// eslint-disable-next-line
const Textarea = forwardRef(({className, error, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <div className={cn(styles.textareaWrapper, className)}>
      <textarea className={cn(styles.textarea, {
        [styles.error]: error
      })} ref={ref} {...props} />
      {error && <span className={styles.errorMsg}>{error.message}</span> }
    </div>
  )
})

export default Textarea