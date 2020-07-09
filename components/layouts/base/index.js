import styles from './styles.module.css'

export default ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>root<span>system</span></div>
      {children}
    </div>
  )
}

