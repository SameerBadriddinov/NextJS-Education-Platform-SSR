import React from 'react'
import { HhAdvantagesProps } from './Advantages.props'
import styles from "./Advantages.module.css"
import CheckIcon from "./check.svg"

const Advantages = ({advantages}: HhAdvantagesProps) => {
  return (
    <>
      {advantages.map(s => (
        <div key={s._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{s.title}</div>
          <hr className={styles.vline} />
          <div>{s.description}</div>
        </div>
      ))}
    </>
  )
}

export default Advantages