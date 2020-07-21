import styles from './styles.module.css'

export default ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

