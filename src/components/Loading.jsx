import styles from './css/Loading.module.css';

export default function Lodaing() {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.generating}>生成中</p>
        <div className={styles.loader}></div>
      </div>
    </>
  )
}