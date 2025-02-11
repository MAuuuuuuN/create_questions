import styles from './css/Question.module.css';

export default function QuestionDisplay({ quizIndex, titleData }) {
  return (
    <div className={styles.title}>
      <h2>問題{quizIndex + 1}</h2>
      <p>{titleData}</p>
    </div>
  );
}