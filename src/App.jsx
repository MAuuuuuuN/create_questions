import { useState, useContext, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import QuizSetting from './components/QuizSetting.jsx';
import ShowAnswer from './components/ShowAnswer.jsx';
import Quiz from './components/Quiz.jsx';
import styles from './style.module.css';
import { quizContext, answerContext } from './components/QuizContext.jsx';
import { addQuiz } from './http.js';

function App() {
  const [geminiState, setGeminiState] = useState('ready');
  const [showAnswer, setShowAnswer] = useState(false);
  const quizs = useContext(quizContext);
  const { setAnswerList } = useContext(answerContext);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const radioButtons = document.querySelectorAll('#quiz input[type="radio"]:checked + p');
    const radioButtonList = [];

    radioButtons.forEach(radioButton => {
      const label = radioButton.textContent;
      radioButtonList.push(label);
    });

    if (radioButtons.length > 0) {
      setAnswerList(prevState => ({
        ...prevState,
        userSelect: radioButtonList
      }));
    }
  }, [showAnswer, setAnswerList])

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

      try {
        for (const quiz of quizList) {
          await addQuiz(quiz);
        }
      } catch (error) {
        console.log(error);
      }

      quizs.setQuizList(() => {
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

      setAnswerList(prevState => ({
        ...prevState,
        answerSelect: quizList.map(quiz => quiz.answer)
      }));

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

  function resetQuiz() {
    setGeminiState('ready');
  }

  return (
    <>
      {/* モーダル表示 */}
      <Modal opened={opened} onClose={close} title="Authentication" centered size="70%" overlayProps={{ backgroundOpacity: 0.55, blur: 3, }}>
        テスト
      </Modal>

      {geminiState !== 'finish' && (
        <div className={styles.quizSetting}>
          {/* 問題生成のボタン */}
          <QuizSetting onButtonClick={handleButtonClick} />

          {/* 実行の状態を表示 */}
          <div className={styles.status}>
            <p className={styles.status_text}>ステータス : </p>
            {states
              .filter((state) => state.stateNow === geminiState)
          .map((state) => (
            <p key={state.stateNow} className={styles[`status_${state.stateNow}`]}>{state.stateValue}</p>
              ))}
          </div>
        </div>
      )}

      {geminiState === "finish" && (
        <Carousel height={500} slideSize="80%" controlsOffset="200px" controlSize="50px" slideGap="100px">
          {quizs.quizList.map((question, index) => (
            <Carousel.Slide>
              <Quiz key={question.questionId} quizId={question.quiestionId} quizData={question} quizIndex={index} isShowAnswer={showAnswer} />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
      {/* 問題文と選択肢と答えを設定 */}

      <div className={styles.button_low}>
        {/* 答え表示ボタン */}
        {geminiState === "finish" && <ShowAnswer onShowAnswer={handleShowAnswer} isShow={showAnswer} />}

        {/* モーダル表示ボタン */}
        <Button variant="default" onClick={open}>モーダルを表示</Button>
        <Button variant="default" onClick={resetQuiz}>リセットする</Button>
      </div>
    </>
  );
}

export default App;