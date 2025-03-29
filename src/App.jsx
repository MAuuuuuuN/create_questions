import { useState, useContext, useEffect } from "react";
import Modal from "./components/Modal.jsx";
import QuizSetting from "./components/QuizSetting.jsx";
import Quiz from "./components/Quiz.jsx";
import QuizResult from "./components/QuizResult.jsx";
import Loading from "./components/Loading.jsx";
import { quizContext, resultContext } from "./components/QuizContext.jsx";
import { addQuiz } from "./http.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [geminiState, setGeminiState] = useState("ready");
  const [nowShow, setNowShow] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);

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
    }, 3000);
  }, [result, setResult]);

  // 問題を生成
  const GeminiPrepare = async (value) => {
    setGeminiState("start");
    try {
      // geminiで問題をJSON形式で生成
      const geminiApiKey = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = geminiApiKey.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const promptSelect = value.sentence;
      const result = await model.generateContent(promptSelect);

      console.log(promptSelect);

      // 返ってきたレスポンスを整形
      const formatResult = result.response
        .text()
        .replace(/```/g, "")
        .replace(/json\s/, "");
      const createQuiz = JSON.parse(formatResult);

      console.log(createQuiz);

      // 問題ごとにJSON形式で問題をuseStateで保存
      const newQuestions = createQuiz.map((splitQuiz) => ({
        category: value.category,
        questionId: crypto.randomUUID(),
        question: splitQuiz.question,
        selects: JSON.stringify(splitQuiz.select),
        answer: splitQuiz.answer,
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
  };

  // 設定した内容をGeminiに送信
  function handleButtonClick(value) {
    GeminiPrepare(value);
  }

  // 問題出題をリセット
  function resetQuiz() {
    setGeminiState("ready");
    setResult([]);
  }

  console.log("app render");

  return (
    <>
      <div className="flex h-screen">
        <aside className="w-64 h-auto bg-gray-100 flex-none text-center">
          <div className="">
            <img
              src="src/images/Qreate.png"
              alt=""
              className="w-40 mt-3 mb-3 mx-auto"
            />
            <div className="my-5">
              <button
                onClick={showModal}
                className="my-2 px-15 py-1 rounded-xl text-center cursor-pointer hover:bg-stone-300"
              >
                履歴表示
              </button>
              <button
                // onClick={showModal}
                className="my-2 px-15 py-1 rounded-xl text-center cursor-pointer hover:bg-stone-300"
              >
                不正解出題
              </button>
            </div>
          </div>
        </aside>
        <div className="flex-1 flex justify-center items-center">
          {isShowModal && <Modal showModal={showModal} />}

          {/* 問題生成のボタン */}
          {(geminiState === "ready" || geminiState === "error") && (
            <div>
              <QuizSetting onButtonClick={handleButtonClick} />
            </div>
          )}

          {geminiState === "start" && (
            <div>
              <Loading />
            </div>
          )}

          {/* 問題文と選択肢と答えを設定 */}
          {/* 答えた問題を元に次の問題を表示 */}
          {/* 最後まで問題を解き終わるとresult画面を表示 */}
          {/* モーダル表示ボタン */}
          {geminiState === "finish" && (
            <>
              {quizList.map((question, index) => (
                <div
                  key={index}
                  className={nowShow === index ? "block" : "hidden"}
                >
                  <Quiz quizIndex={index} questionData={question} />
                </div>
              ))}
              <div className={nowShow === quizList.length ? "block" : "hidden"}>
                <QuizResult />
                <div className="text-center">
                  <button
                    className="mb-20 p-3 w-80 bg-amber-100 border-3 border-amber-400 rounded-xl text-lg cursor-pointer transition duration-300 ease-in-out hover:bg-amber-400"
                    onClick={resetQuiz}
                  >
                    最初から
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
