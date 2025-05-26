import Quiz from "./Quiz";
import QuizResult from "./QuizResult";

export default function SetQuestions({ quizList, nowShow, resetQuiz }) {
  return (
    <>
      {quizList.map((question, index) => (
        <div
          key={question.questionId}
          className={nowShow === index ? "block" : "hidden"}
        >
          <Quiz quizIndex={index} questionData={question} />
        </div>
      ))}
      <div className={nowShow === quizList.length ? "block" : "hidden"}>
        <QuizResult />
        <div className="text-center">
          <button
            className="mb-20 p-3 w-80 bg-amber-100 border-3 border-amber-400 rounded-xl text-lg cursor-pointer transition duration-300 ease-in-out hover:bg-amber-400"
            onClick={resetQuiz}
          >
            最初から
          </button>
        </div>
      </div>
    </>
  );
}
