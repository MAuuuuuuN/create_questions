

export default function ProblemDisplay({ problemData, quizIndex }) {
  return (
    <div>
      <p>問題{quizIndex + 1} : {problemData}</p>
    </div>
  );
}