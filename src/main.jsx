import React from "react";
import { QuizProvider } from "./components/QuizContext.jsx";
import { ResultProvider } from "./components/QuizContext.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizProvider>
      <ResultProvider>
        <App />
      </ResultProvider>
    </QuizProvider>
  </StrictMode>
);
