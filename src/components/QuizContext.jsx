import { createContext, useState } from 'react';

export const quizContext = createContext([]);
export const resultContext = createContext({});

export function QuizProvider({ children }) {
  const [quizList, setQuizList] = useState([]);

  console.log(quizList);

  return (
    <quizContext.Provider value={{ quizList, setQuizList }}>
      {children}
    </quizContext.Provider>
  )
}

// 選択した選択肢を保存
export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState([]);

  return (
    <resultContext.Provider value={{ result, setResult }}>
      {children}
    </resultContext.Provider >
  );
};