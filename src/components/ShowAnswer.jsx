export default function ShowAnswer({ onShowAnswer, isShow }) {
  function showAnswerButton() {
    onShowAnswer(!isShow);
  }

  return (
    <>
      {!isShow && <button onClick={showAnswerButton}>正解を表示する</button>}
      {isShow && <button onClick={showAnswerButton}>正解を隠す</button>}
    </>
  )
}