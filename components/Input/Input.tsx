import {InputProps} from "./Input.props"
import styles from "./Input.module.css"
import cn from "classnames"
import { ForwardedRef, forwardRef } from 'react'

// eslint-disable-next-line
const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>):JSX.Element => {
  return (
    <div className={cn(styles.inputWrapper, className)}>
      <input className={cn(styles.input, {
        [styles.error]: error
      })} ref={ref} {...props} />
      {error && <span className={styles.errorMsg}>{error.message}</span>}
    </div>
  )
})

export default Input