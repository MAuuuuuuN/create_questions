export default function AnswerDisplay({ answerData, isShowAnswer }) {
  return (
    <>
      <div>
        {isShowAnswer && <p>{answerData}</p>}
        {!isShowAnswer && <p><br/></p>}
      </div>
    </>
  )
}