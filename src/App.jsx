import { useState, useContext, useEffect } from 'react';
import { Button } from '@mantine/core';

import QuizSetting from './components/QuizSetting.jsx';
import Quiz from './components/Quiz.jsx';
import QuizResult from './components/QuizResult.jsx';
import styles from './style.module.css';
import { quizContext, resultContext } from './components/QuizContext.jsx';
import { addQuiz } from './http.js';

function App() {
  const [geminiState, setGeminiState] = useState('ready');
  const [nowShow, setNowShow] = useState();

  const { quizList, setQuizList } = useContext(quizContext);
  const { result, setResult } = useContext(resultContext);

  useEffect(() => {
    setTimeout(() => {
      if (result.length === 0 || result == null) {
        setNowShow(0);
      } else if (result.length > 0) {
        setNowShow(result.length);
      }
    }, 1000);

  }, [result, setResult])

  // 問題を生成
  async function GeminiPrepare(value) {
    setGeminiState("start");
    console.log('gemini : start');
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const geminiApiKey = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = geminiApiKey.getGenerativeModel({ model: "gemini-1.5-flash" });
      const promptSelect = `${value}に関する知識を問う問題を3つ出題してください。questionに問題文、selectに選択肢、answerに正解の選択肢を入れてください。選択肢を4つ設けて,正解の選択肢は1つとするように設定してください。次のようなJSON形式のような形で出力してください。[{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"},{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"}]`;
      const result = await model.generateContent(promptSelect);
      const formatResult = result.response.text().replaceAll("```", '').replace(/json\s/, '');
      const createQuiz = JSON.parse(formatResult);

      try {
        for (const quiz of createQuiz) {
          await addQuiz(quiz);
        }
      } catch (error) {
        console.log(error);
      }

      setQuizList(() => {
        const newQuestions = createQuiz.map((quiz) => ({
          questionId: crypto.randomUUID(),
          question: quiz.question,
          selects: JSON.stringify(quiz.select),
          answer: quiz.answer
        }));

        return newQuestions;
      });

      setGeminiState("finish");
      console.log("gemini : finished");
    } catch (error) {
      setGeminiState("error");
      console.log("gemini : error");
      console.error(error);
    }
  }

  // 設定した内容をGeminiに送る
  function handleButtonClick(value) {
    GeminiPrepare(value);
  }

  function resetQuiz() {
    setGeminiState('ready');
  }

  return (
    <>
      {geminiState !== 'finish' && (
        <div className={styles.quizSetting}>
          {/* 問題生成のボタン */}
          <QuizSetting onButtonClick={handleButtonClick} />
        </div>
      )}

      {/* 問題文と選択肢と答えを設定 */}
      {geminiState === "finish" && (
        <>
          {quizList.map((question, index) => (
            <div className={nowShow === index ? styles.quiz_show : styles.quiz_hidden}>
              <Quiz key={index} quizIndex={index} questionData={question} />
            </div>
          ))}
          <div className={nowShow === quizList.length ? styles.quiz_show : styles.quiz_hidden}>
            <QuizResult></QuizResult>
            <div className={styles.button_low}>
              {/* モーダル表示ボタン */}
              <Button variant="default" onClick={resetQuiz}>リセットする</Button>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default App;