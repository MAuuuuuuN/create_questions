import { createContext, useState, useEffect } from 'react';

export const quizContext = createContext([]);
export const answerContext = createContext([]);
export const resultContext = createContext({});

export function QuizProvider({ children }) {
  const [quizList, setQuizList] = useState([]);

  return (
    <quizContext.Provider value={{ quizList, setQuizList }}>
      {children}
    </quizContext.Provider>
  )
}

// 選択した選択肢と答えを比較して、正誤判定をする
export function AnswerProvider({ children }) {
  const [answerList, setAnswerList] = useState({
    userSelect: [],
    answerSelect: [],
    correct: []
  });

  // answerListの中身が変わるたびに実行される
  useEffect(() => {
    const correctList = [];

    if (answerList.userSelect.length > 0) {
      answerList.userSelect.forEach((select, index) => {
        if (select === answerList.answerSelect[index]) {
          correctList.push(true);
        } else {
          correctList.push(false);
        }
      })

      setAnswerList(prev => ({
        ...prev,
        correct: correctList,
      }))
    }
  }, [answerList.userSelect, answerList.answerSelect])

  return (
    <answerContext.Provider value={{ answerList, setAnswerList }}>
      {children}
    </answerContext.Provider >
  )
}

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    // console.log('Result has changed:', result);
  }, [result, setResult]);

  return (
    <resultContext.Provider value={{ result, setResult }}>
      {children}
    </resultContext.Provider >
  );
};