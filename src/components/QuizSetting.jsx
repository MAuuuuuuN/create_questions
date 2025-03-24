import { useRef, useState, useEffect } from 'react';
import { getCategory } from '../http.js';

import styles from './css/QuizSetting.module.css';

export default function QuizSetting({ onButtonClick }) {
  const questionSet = useRef();
  const categoryRefs = useRef([]);
  const [isComposing, setIsComposing] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({"number_of_quiz" : 3, "level" : ""});
  const [category, setCategory] = useState(["HTML", "CSS", "JavaScript", "HTTP"]);

  useEffect(() => {
    (async () => {
      const responseCategory = await getCategory();

      if (responseCategory.length > 0) {
        const categoryList = [];
        for (let i = 0; i < responseCategory.length; i++) {
          categoryList.push(responseCategory[i].category);
        }
        setCategory(categoryList);
      }
    })();
  }, [category]);

  function setting_prompt() {
    const prompt = {
      "category" : questionSet.current.value,
      "sentence" : ""
    };

    prompt.sentence = `${prompt.category}に関する知識を問う問題を出題してください。`;
    prompt.sentence = prompt.sentence + `問題は${advancedSettings.number_of_quiz}個出題してください。`;
    if (advancedSettings.level) {
      if(advancedSettings.level) {
        prompt.sentence = prompt.sentence + `難易度は${advancedSettings.level}向けにしてください。`;
      }
    }
    prompt.sentence = prompt.sentence + 'questionに問題文、selectに選択肢、answerに正解の選択肢を入れてください。選択肢を4つ設けて,正解の選択肢は1つとするように設定してください。次のようなJSON形式のような形で出力してください。[{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"},{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"}]';
    onButtonClick(prompt);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !isComposing) {
      setting_prompt();
    }
  }

  function handleCompositionStart() {
    setIsComposing(true);
  }

  function handleCompositionEnd() {
    setIsComposing(false);
  }

  function Setting(index) {
    const selectedCategory = categoryRefs.current[index].textContent;
    document.getElementById("create").value = selectedCategory;
    setting_prompt();
  }

  const handleNumberChange = (e) => {
    const number_value = parseInt(e.target.value) || 3;
    setAdvancedSettings(prev => ({
      ...prev,
      "number_of_quiz": number_value
    }));
  }

  const handleLevelChange = (e) => {
    const level_value = e.target.value;
    setAdvancedSettings(prev => ({
      ...prev,
      "level": level_value
    }));
  }

  return (
    <div>
      <h1>Generate Quiz by Gemini AI</h1>
      <input className={styles.input} id="create" onKeyDown={handleKeyDown} onCompositionStart={handleCompositionStart} onCompositionEnd={handleCompositionEnd} type="text" placeholder="例:HTML,CSS,JavaScript etc..." ref={questionSet}/>
      <div className={styles.categories}>
        {category.map((category, index) => (
          <p key={index} className={styles.category} onClick={() => Setting(index)} ref={el => categoryRefs.current[index] = el}>{category}</p>
        ))}
      </div>
        <div>
          <div>
            <p>問題数設定</p>
            <label>
              <input className={styles.number_of_quiz} min="1" max="10" onChange={handleNumberChange}/>
            </label>
          </div>
          <div className={styles.level}>
            <p>難易度設定</p>
            <label>
              <input type="radio" name="level" value="初心者" checked={advancedSettings.level === "初心者"} onChange={handleLevelChange}/>初心者
            </label>
            <label>
              <input type="radio" name="level" value="中級者" checked={advancedSettings.level === "中級者"} onChange={handleLevelChange}/>中級者
            </label>
            <label>
              <input type="radio" name="level" value="上級者" checked={advancedSettings.level === "上級者"} onChange={handleLevelChange}/>上級者
            </label>
          </div>
        </div>
      <button onClick={setting_prompt} className={styles.button}>作成</button>
    </div>
  )
}