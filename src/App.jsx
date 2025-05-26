import { useState, useContext, useEffect, useCallback } from "react";
import Modal from "./components/Modal.jsx";
import QuizSetting from "./components/QuizSetting.jsx";
import Quiz from "./components/Quiz.jsx";
import QuizResult from "./components/QuizResult.jsx";
import Loading from "./components/Loading.jsx";
import IncorrectModal from "./components/IncorrectModal.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SetQuestions from "./components/SetQuestions.jsx";
import { quizContext, resultContext } from "./components/QuizContext.jsx";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from 'uuid';
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_KEY, import.meta.env.VITE_ANON_KEY);

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { quizList, setQuizList } = useContext(quizContext);
  const { result, setResult } = useContext(resultContext);

  const showModal = useCallback(() => {
    setIsShowModal(prev => !prev);
  }, []);

  const showIncorrect = useCallback(() => {
    setIsShowIncorrect(prev => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
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
        const { error } = await supabase
          .from('quizList')
          .insert(newQuestions.map(quiz => ({
            category: quiz.category,
            questionId: quiz.questionId,
            question: quiz.question,
            select: quiz.selects,
            answer: quiz.answer
          })));

          if (error !== null) {
            throw new Error(error);
          }
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
      return <SetQuestions quizList={quizList} nowShow={nowShow} resetQuiz={resetQuiz} />
    }

    return <QuizSetting onButtonClick={handleButtonClick} />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {geminiState !== "finish" && 
        <Sidebar 
          showModal={showModal} 
          showIncorrect={showIncorrect} 
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />
      }
      <div className="flex-1 flex justify-center items-center p-4 lg:p-8 bg-neutral-100">
        {isShowModal && <Modal showModal={showModal} />}
        {isShowIncorrect && <IncorrectModal showModal={showIncorrect} />}
        {renderQuizContent()}
      </div>
    </div>
  );
}

export default App;
