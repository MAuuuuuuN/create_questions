import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QuizProvider } from './components/QuizContext.jsx';
import { AnswerProvider } from './components/QuizContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QuizProvider>
        <AnswerProvider>
            <App />
        </AnswerProvider>
    </QuizProvider>
);