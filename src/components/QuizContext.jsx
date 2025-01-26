import { createContext, useState, useEffect } from 'react';

export const quizContext = createContext([]);
export const answerContext = createContext([]);

export function QuizProvider({ children }) {
  const [quizList, setQuizList] = useState([]);

  return <quizContext.Provider value={{ quizList, setQuizList }}>
    {children}
  </quizContext.Provider>
}

export function AnswerProvider({ children }) {
  const [answerList, setAnswerList] = useState({
    userSelect: [],
    answerSelect: [],
    correct: []
  });


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

  return <answerContext.Provider value={{ answerList, setAnswerList }}>
    {children}
  </answerContext.Provider>
}