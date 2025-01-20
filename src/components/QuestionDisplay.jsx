export default function QuestionDisplay({ questionData, quizIndex }) {
  return (
    <div>
      <p>問題{quizIndex + 1} : {questionData}</p>
    </div>
  );
}