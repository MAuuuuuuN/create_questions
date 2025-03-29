import { useContext } from 'react';
import { resultContext } from './QuizContext.jsx';

export default function QuizResult() {
  const { result } = useContext(resultContext);
  const totalQuestions = result.length;
  const totalCorrect = result.reduce((correctTotal, question) => {
    if (question.correct === true) {
      return correctTotal + 1;
    } else {
      return correctTotal;
    }
  }, 0);

  return (
    <>
      <div className="m-10 text-center">
        <h2 className="text-3xl font-bold">リザルト</h2>
        <p className="mb-5 text-xl">{totalQuestions}問中{totalCorrect}正解</p>
        {result.map((questionResult, index) => {
          return (
            <div key={index} className="my-5 pb-3 border-b border-b-stone-300">
              <p className="text-xl font-bold">{index + 1}問目</p>
              <p className="text-lg mb-2">{questionResult.question}</p>
              <div>
                <p>正解 : {questionResult.answer}</p>
                <p>あなたの答え : {questionResult.select}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}