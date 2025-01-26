import { useContext } from 'react';
import { answerContext } from './QuizContext.jsx';

export default function AnswerDisplay({ answerData, isShowAnswer, quizIndex }) {
  const { answerList } = useContext(answerContext)
  const correct = answerList.correct[quizIndex];

  return (
    <>
      <div>
        {isShowAnswer ? (
          <>
            <p>{answerData}</p>
            {correct ? <p>正解</p> : <p>不正解</p>}
          </>
        ) : <p><br /></p>}
      </div>
    </>
  )
}