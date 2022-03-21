import { ButtonIconProps, icons } from './ButtonIcon.props'
import styles from "./ButtonIcon.module.css"
import ArrowIcon from "./arrow.svg"
import cn from "classnames"

const Button = ({appearance, icon, children, className, ...props}: ButtonIconProps): JSX.Element => {
  const IconComp = icons[icon]
  return(
    <button
      className={cn(styles.button,className, {
        [styles.primary]: appearance == "primary",
        [styles.white]: appearance == 'white'
      })}
      {...props}
    >
      <IconComp />
    </button>
  )
}

export default Button