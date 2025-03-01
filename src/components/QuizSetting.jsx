import { useRef, useState, useEffect } from 'react';
import { getCategory } from '../http.js';

import styles from './css/QuizSetting.module.css';

export default function QuizSetting({ onButtonClick }) {
  const questionSet = useRef();
  const categoryRefs = useRef([]);
  const [isComposing, setIsComposing] = useState(false);
  const [category, setCategory] = useState(["HTML", "CSS", "JavaScript", "HTTP"]);

  useEffect(() => {
    (async () => {
      const responseCategory = await getCategory();

      if(responseCategory.length > 0) {
        const categoryList = [...category];
        for(let i = 0; i < responseCategory.length; i++) {
          categoryList.push(responseCategory[i].category);
        }
        while (categoryList.length > category.length) {
          categoryList.shift();
        }
        setCategory(categoryList);
      }
    } )();
  }, [category]);

  function setting_prompt() {
    onButtonClick(questionSet.current.value);
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

  return (
    <div>
      <h1>Generate Quiz by Gemini AI</h1>
      <input className={styles.input} id="create" onKeyDown={handleKeyDown} onCompositionStart={handleCompositionStart} onCompositionEnd={handleCompositionEnd} type="text" placeholder="例:HTML,CSS,JavaScript etc..." ref={questionSet}></input>
      <div className={styles.categories}>
        {category.map((category, index) => (
          <p key={index} className={styles.category} onClick={() => Setting(index)} ref={el => categoryRefs.current[index] = el}>{category}</p>
        ))}
      </div>
      <button onClick={setting_prompt} className={styles.button}>作成</button>
    </div>
  )
}