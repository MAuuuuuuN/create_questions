export default function QuestionDisplay({ questionData, quizIndex }) {
  return (
    <div>
      <h2>問題{quizIndex + 1}</h2>
      <p>{questionData}</p>
    </div>
  );
}