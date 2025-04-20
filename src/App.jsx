import { useState, useContext, useEffect, useCallback } from "react";
import Modal from "./components/Modal.jsx";
import QuizSetting from "./components/QuizSetting.jsx";
import Quiz from "./components/Quiz.jsx";
import QuizResult from "./components/QuizResult.jsx";
import Loading from "./components/Loading.jsx";
import IncorrectModal from "./components/IncorrectModal.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { quizContext, resultContext } from "./components/QuizContext.jsx";
import { addQuiz } from "./http.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from 'uuid';

// 定数の分離
const GEMINI_STATES = {
  READY: "ready",
  START: "start",
  FINISH: "finish",
  ERROR: "error"
};

const TRANSITION_DELAY = 3000;

function App() {
  const [geminiState, setGeminiState] = useState(GEMINI_STATES.READY);
  const [nowShow, setNowShow] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowIncorrect, setIsShowIncorrect] = useState(false);

  const { quizList, setQuizList } = useContext(quizContext);
  const { result, setResult } = useContext(resultContext);

  const showModal = useCallback(() => {
    setIsShowModal(prev => !prev);
  }, []);

  const showIncorrect = useCallback(() => {
    setIsShowIncorrect(prev => !prev);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!result?.length) {
        setNowShow(0);
      } else {
        setNowShow(result.length);
      }
    }, TRANSITION_DELAY);

    return () => clearTimeout(timer);
  }, [result]);

  const GeminiPrepare = async (value) => {
    setGeminiState(GEMINI_STATES.START);
    try {
      const geminiApiKey = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = geminiApiKey.getGenerativeModel({
        model: "gemini-2.0-flash",
      });
      
      const result = await model.generateContent(value.sentence);
      const formatResult = result.response
        .text()
        .replace(/```/g, "")
        .replace(/json\s/, "");
      
      const createQuiz = JSON.parse(formatResult);
      const newQuestions = createQuiz.map((splitQuiz) => ({
        category: value.category,
        questionId: uuidv4(),
        question: splitQuiz.question,
        selects: JSON.stringify(splitQuiz.select),
        answer: splitQuiz.answer,
      }));

      setQuizList(newQuestions);

      try {
        await Promise.all(newQuestions.map(quiz => addQuiz(quiz)));
      } catch (error) {
        console.error("Failed to save quizzes:", error);
      }

      setGeminiState(GEMINI_STATES.FINISH);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      setGeminiState(GEMINI_STATES.ERROR);
    }
  };

  const handleButtonClick = useCallback((value) => {
    GeminiPrepare(value);
  }, []);

  const resetQuiz = useCallback(() => {
    setGeminiState(GEMINI_STATES.READY);
    setResult([]);
  }, [setResult]);

  const renderQuizContent = () => {
    if (geminiState === GEMINI_STATES.START) {
      return <Loading />;
    }

    if (geminiState === GEMINI_STATES.FINISH) {
      return (
        <>
          {quizList.map((question, index) => (
            <div
              key={question.questionId}
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
      );
    }

    return <QuizSetting onButtonClick={handleButtonClick} />;
  };

  return (
    <div className="flex h-screen">
      <Sidebar onShowModal={showModal} onShowIncorrect={showIncorrect} />
      <div className="flex-1 flex justify-center items-center">
        {isShowModal && <Modal showModal={showModal} />}
        {isShowIncorrect && <IncorrectModal showModal={showIncorrect} />}
        {renderQuizContent()}
      </div>
    </div>
  );
}

export default App;
