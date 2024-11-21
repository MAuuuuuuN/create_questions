export default function AnswerDisplay({ answerValue, isShowAnswer }) {
  return (
    <>
      <div>
        {isShowAnswer && <p>{answerValue}</p>}
        {!isShowAnswer && <p><br/></p>}
      </div>
    </>
  )
}