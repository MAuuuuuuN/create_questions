export default function QuestionDisplay({ quizIndex, titleData }) {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-5">問題{quizIndex + 1}</h2>
      <p className="m-5 text-xl">{titleData}</p>
    </div>
  );
}