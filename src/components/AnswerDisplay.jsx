import { useContext, useState } from 'react';
import { resultContext } from './QuizContext.jsx';
import { addSelect } from '../http.js';

export default function AnswerDisplay({ titleData, answerData, questionId, onCheckChange }) {
  const { setResult } = useContext(resultContext);
  const [buttonLabel, setButtonLabel] = useState(null);
  const handleClick = async () => {
    if(!onCheckChange) {
      return;
    }
    const isCorrect = onCheckChange === answerData;
    const questionResult = {
      question: titleData,
      correct: isCorrect,
      answer: answerData,
      select: onCheckChange,
    }

    setResult((prev) => {
      return [...prev, questionResult]
    });
    setButtonLabel(isCorrect ? '正解' : '不正解');

    try {
      await addSelect(questionId, isCorrect, onCheckChange);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="sm:w-200 w-100 min-h-20 m-auto mt-10 sm:mx-auto text-center border-3 border-green-600 shadow-md rounded-md transition duration-300 ease-in-out hover:bg-green-50 hover:border-3 hover:border-lime-400">
        {buttonLabel != null ? (
          <>
            <div>
              <p className="font-bold text-lg m-2">{buttonLabel}</p>
            </div>
            <p className="m-2">正解の選択肢 : {answerData}</p>
          </>
        ) : <button onClick={handleClick} className="w-full h-full text-lg font-bold cursor-pointer">正解を表示する</button>}
      </div>
    </>
  )
}