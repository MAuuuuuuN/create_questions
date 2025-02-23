import { useState, useContext, useEffect } from 'react';

import Modal from './components/Modal.jsx';
import QuizSetting from './components/QuizSetting.jsx';
import Quiz from './components/Quiz.jsx';
import QuizResult from './components/QuizResult.jsx';
import Loading from './components/Loading.jsx';
import { quizContext, resultContext } from './components/QuizContext.jsx';

import styles from './style.module.css';
import { addQuiz } from './http.js';

function App() {
  const [geminiState, setGeminiState] = useState('ready');
  const [nowShow, setNowShow] = useState(0);
  const [ isShowModal, setIsShowModal ] = useState(false);

  const { quizList, setQuizList } = useContext(quizContext);
  const { result, setResult } = useContext(resultContext);

  function showModal() {
    setIsShowModal(!isShowModal);
  }

  // 正解を表示して数秒後に次の問題に遷移
  useEffect(() => {
    setTimeout(() => {
      if (result.length === 0 || result == null) {
        setNowShow(0);
      } else if (result.length > 0) {
        setNowShow(result.length);
      }
    }, 5000);
  }, [result, setResult]);

  // 問題を生成
  async function GeminiPrepare(value) {
    setGeminiState("start");
    try {
      // geminiで問題をJSON形式で生成
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const geminiApiKey = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = geminiApiKey.getGenerativeModel({ model: "gemini-1.5-flash" });
      const promptSelect = `${value}に関する知識を問う問題を3つ出題してください。questionに問題文、selectに選択肢、answerに正解の選択肢を入れてください。選択肢を4つ設けて,正解の選択肢は1つとするように設定してください。次のようなJSON形式のような形で出力してください。[{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"},{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"}]`;
      const result = await model.generateContent(promptSelect);

      // 返ってきたレスポンスを整形
      const formatResult = result.response.text().replaceAll("```", '').replace(/json\s/, '');
      const createQuiz = JSON.parse(formatResult);

      // 問題ごとにJSON形式で問題をuseStateで保存
      const newQuestions = createQuiz.map((splitQuiz) => ({
        category: value,
        questionId: crypto.randomUUID(),
        question: splitQuiz.question,
        selects: JSON.stringify(splitQuiz.select),
        answer: splitQuiz.answer
      }));

      setQuizList(newQuestions);

      // SQLに出題する問題を保存
      try {
        for (const quiz of newQuestions) {
          await addQuiz(quiz);
        }
      } catch (error) {
        console.error(error);
      }

      // 問題出題ステータスを完了に変更
      setGeminiState("finish");
    } catch (error) {
      // エラー時の表示
      setGeminiState("error");
      console.error(error);
    }
  }

  // 設定した内容をGeminiに送信
  function handleButtonClick(value) {
    GeminiPrepare(value);
  }

  // 問題出題をリセット
  function resetQuiz() {
    setGeminiState('ready');
    setResult([]);
  }

  return (
    <>
    <div className={styles.header}>
      <button className={styles.header_button} onClick={showModal}>履歴表示</button>
    </div>
      {isShowModal && (
        <Modal showModal={showModal} />
      )}

      {(geminiState === 'ready' || geminiState ===  'error') && (
        <div className={styles.quizSetting}>
          {/* 問題生成のボタン */}
          <QuizSetting onButtonClick={handleButtonClick} />
        </div>
      )}

      {geminiState === 'start' && (
        <div>
          <Loading />
        </div>
      )}

      {/* 問題文と選択肢と答えを設定 */}
      {geminiState === "finish" && (
        <>
          {/* 答えた問題を元に次の問題を表示 */}
          {quizList.map((question, index) => (
            <div key={index} className={nowShow === index ? styles.quiz_show : styles.quiz_hidden}>
              <Quiz quizIndex={index} questionData={question} />
            </div>
          ))}
          {/* 最後まで問題を解き終わるとresult画面を表示 */}
          <div className={nowShow === quizList.length ? styles.quiz_show : styles.quiz_hidden}>
            <QuizResult />
            <div className={styles.button_low}>
              {/* モーダル表示ボタン */}
              <button onClick={resetQuiz} className={styles.reset}>最初から</button>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default App;