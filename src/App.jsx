import { useState } from 'react';

import QuizSetting from './components/QuizSetting.jsx';
import ShowAnswer from './components/ShowAnswer.jsx';
import Quiz from './components/Quiz.jsx';

import styles from './style.module.css';

function App() {
  const [geminiState, setGeminiState] = useState('ready');
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionList, setQuestionList] = useState([]);

  const states = [
    {
      "stateNow": "ready",
      "stateValue": "待機中",
    },
    {
      "stateNow": "start",
      "stateValue": "実行中",
    },
    {
      "stateNow": "finish",
      "stateValue": "完了",
    },
    {
      "stateNow": "error",
      "stateValue": "エラー",
    },
  ]

  // 問題を生成
  async function GeminiPrepare(value) {
    setGeminiState("start");
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const geminiApiKey = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = geminiApiKey.getGenerativeModel({ model: "gemini-1.5-flash" });
      const promptSelect = `${value}に関する知識を問う問題を3つ出題してください。questionに問題文、selectに選択肢、answerに正解の選択肢を入れてください。選択肢を4つ設けて,正解の選択肢は1つとするように設定してください。次のようなJSON形式のような形で出力してください。[{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"},{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"}]`;
      const result = await model.generateContent(promptSelect);
      const formatResult = result.response.text().replaceAll("```", '').replace(/json\s/, '');
      const quizList = JSON.parse(formatResult);

      setQuestionList(() => {
        const newQuestions = quizList.map((quiz) => ({
          questionId: crypto.randomUUID(),
          question: quiz.question,
          selects: quiz.select.map(select => ({
            optionId: crypto.randomUUID(),
            option: select
          })),
          answer: quiz.answer
        }));

        return [...newQuestions];
      });

      setGeminiState("finish");
    } catch (error) {
      setGeminiState("error");
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
      <QuizSetting onButtonClick={handleButtonClick} />
      {/* 実行の状態を表示 */}
      {/* ToDo : オブジェクトなどを利用して簡潔にまとめる */}
      <div className={styles.status}>
        <p className={styles.status_text}>ステータス : </p>
        {states
          .filter((state) => state.stateNow === geminiState)
          .map((state) => (
            <p key={state.stateNow} className={styles[`status_${state.stateNow}`]}>{state.stateValue}</p>
          ))}
      </div>
      {/* 問題文と選択肢と答えを設定 */}
      {questionList.map((question, index) => (
        <Quiz key={question.questionId} quizId={question.quiestionId} quizData={question} quizIndex={index} isShowAnswer={showAnswer} />
      ))}
      {/* 答え表示ボタン */}
      {geminiState === "finish" && <ShowAnswer onShowAnswer={handleShowAnswer} isShow={showAnswer} />}
    </>
  );
}

export default App;