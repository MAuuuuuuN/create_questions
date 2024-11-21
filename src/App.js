import { useState } from 'react';

import ProblemSetting from './components/ProblemSetting.js';
import ProblemDisplay from './components/ProblemDisplay.js';
import AnswerDisplay from './components/AnswerDisplay.js';
import ShowAnswer from './components/ShowAnswer.js';

import styles from './style.module.css';

function App() {
  const [status, setStatus] = useState('');
  const [questionTexts, setQuestionTexts] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // 問題を生成
  async function GeminiPrepare(value) {
    setStatus("start");
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      // APIキーは、".env_sample"ファイルを複製して、".env"にリネームして記入
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt_select = `${value}に関する知識を問う問題を3つ出題してください。questionに問題文、selectに選択肢、answerに正解の選択肢を入れてください。選択肢を4つ設けて,正解の選択肢は1つとするように設定してください。次のようなJSON形式のような形で出力してください。[{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"},{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"}]`;
      const result = await model.generateContent(prompt_select);
      const response = result.response.text();
      const regex_response = response.replaceAll("```", '').replace(/json\s/, '');

      setQuestionTexts(JSON.parse(regex_response));

      setStatus("end");
    } catch (error) {
      setStatus("error");
    }
  }

  // 設定した内容をGeminiに送る
  function handleButtonClick(value) {
    GeminiPrepare(value);
  }

  // 問題の答えを表示する
  function handleShowAnswer(isShow) {
    setShowAnswer(isShow);
  }

  return (
    <>
    {/* 問題生成のボタン */}
      <ProblemSetting onButtonClick={handleButtonClick} />
      {/* 実行の状態を表示 */}
      <div className={styles.status}>
        <p className={styles.status_text}>ステータス : </p>
        {status === "" && <p className={styles.status_wait}>待機中</p>}
        {status === "start" && <><p className={styles.status_execute}>実行中</p><p>1分ほどかかる場合があります</p></>}
        {status === "end" && <p className={styles.status_finish}>終了</p>}
        {status === "error" && <><p className={styles.status_error}>エラー</p><p>キーを確認して再度実行してください</p></>}
      </div>
      {/* 問題文と選択肢と答えを設定 */}
      {questionTexts.map((questionText, index) => (
        <div key={index}>
          <ProblemDisplay questionValue={questionText.question} index={index} select1={questionText.select[0]} select2={questionText.select[1]} select3={questionText.select[2]} select4={questionText.select[3]} />
          <AnswerDisplay answerValue={questionText.answer} isShowAnswer={showAnswer} />
        </div>
      ))}
      {/* 答え表示ボタン */}
      {status === "end" && <ShowAnswer onShowAnswer={handleShowAnswer} isShow={showAnswer} />}
    </>
  );
}

export default App;