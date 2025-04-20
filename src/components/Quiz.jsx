import { useState } from 'react';
import QuestionDisplay from './QuestionDisplay.jsx';
import SelectDisplay from './SelectDisplay.jsx';
import AnswerDisplay from './AnswerDisplay.jsx';

// スタイル定数
const STYLES = {
  container: "max-w-3xl mx-auto p-4",
  card: "bg-white shadow-lg rounded-lg p-6 space-y-6",
  section: "space-y-4",
};

const Quiz = ({ quizIndex, questionData }) => {
  const [checkedValue, setCheckedValue] = useState(null);

  const handleSelectChange = (value) => {
    setCheckedValue(value);
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.card}>
        <div className={STYLES.section}>
          <QuestionDisplay 
            quizIndex={quizIndex} 
            titleData={questionData.question} 
          />
        </div>
        
        <div className={STYLES.section}>
          <SelectDisplay 
            quizIndex={quizIndex} 
            selectData={questionData.selects} 
            onCheckChange={handleSelectChange} 
          />
        </div>

        <div className={STYLES.section}>
          <AnswerDisplay 
            titleData={questionData.question} 
            answerData={questionData.answer} 
            questionId={questionData.questionId} 
            onCheckChange={checkedValue} 
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;