import { useRef, useState, useEffect } from "react";
import { getCategory } from "../http.js";

export default function QuizSetting({ onButtonClick }) {
  const questionSet = useRef();
  const categoryRefs = useRef([]);
  const [isComposing, setIsComposing] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    number_of_quiz: 3,
    level: "初心者",
  });
  const [openSettings, setOpenSettings] = useState({
    number_of_quiz: false,
    level: false,
  });
  const [category, setCategory] = useState([
    "HTML",
    "CSS",
    "JavaScript",
    "HTTP",
  ]);

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
  }, []);

  function setting_prompt() {
    if(!questionSet.current.value) {
      return;
    }
    const prompt = {
      category: questionSet.current.value,
      sentence: "",
    };

    prompt.sentence = `${prompt.category}に関する知識を問う問題を出題してください。`;
    prompt.sentence =
      prompt.sentence +
      `問題は${advancedSettings.number_of_quiz}個出題してください。`;
    if (advancedSettings.level) {
      if (advancedSettings.level) {
        prompt.sentence =
          prompt.sentence +
          `難易度は${advancedSettings.level}向けにしてください。`;
      }
    }
    prompt.sentence =
      prompt.sentence +
      'questionに問題文、selectに選択肢、answerに正解の選択肢を入れてください。選択肢を4つ設けて,正解の選択肢は1つとするように設定してください。次のようなJSON形式のような形で出力してください。[{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"},{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"}]';
    onButtonClick(prompt);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !isComposing) {
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
  }

  function openNumberChange() {
    if(!openSettings.number_of_quiz) {
      setOpenSettings({
        number_of_quiz: true,
        level: false,
      });
    } else {
      setOpenSettings({
        number_of_quiz: false,
        level: false,
      });
    }
  }

  function openLevelChange() {
    if(!openSettings.level) {
      setOpenSettings({
        number_of_quiz: false,
        level: true,
      });
    } else {
      setOpenSettings({
        number_of_quiz: false,
        level: false,
      });
    }
  }

  const handleNumberChange = (e) => {
    const number_value = parseInt(e.target.value);
    if (!Number.isInteger(number_value)) {
      return;
    }
    setAdvancedSettings((prev) => ({
      ...prev,
      number_of_quiz: number_value,
    }));
  };

  const handleLevelChange = (e) => {
    const level_value = e.target.value;
    setAdvancedSettings((prev) => ({
      ...prev,
      level: level_value,
    }));
  };

  return (
    <>
      <div>
        <h2 className="text-center text-3xl text-stone-800 font-bold">
          今日は何を学習しますか？
        </h2>
        <div className="sm:my-0 my-2 sm:py-5 px-3 sm:px-0 text-center">
          {category.map((category, index) => (
            <button
              className="border-2 border-gray-200 sm:mx-5 mx-1 sm:my-0 my-1 px-5 py-1 rounded-md cursor-pointer hover:bg-gray-200"
              key={index}
              onClick={() => Setting(index)}
              ref={(el) => (categoryRefs.current[index] = el)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="sm:m-auto m-2 px-2 sm:w-150 h-auto border-1 border-gray-200 shadow-md rounded-md">
          <div className="">
            <input
              type="text"
              id="create"
              className="w-full p-3 pb-5 focus:outline-none"
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              ref={questionSet}
              placeholder="Let's do it!"
            />
          </div>
          <div className="flex justify-between mx-2 pb-3">
            <div>
              <div
                className="inline-block mr-1 px-4 py-1 border-1 border-gray-200 rounded-3xl cursor-pointer hover:bg-gray-200"
                onClick={openNumberChange}
              >
                <p className="inline-block">問題数 : </p>
                <label className="inline-block ml-1 cursor-pointer">
                  <p>{advancedSettings.number_of_quiz}問</p>
                </label>
              </div>
              <div
                className="inline-block ml-1 px-4 py-1 border-1 border-gray-200 rounded-3xl cursor-pointer hover:bg-gray-200"
                onClick={openLevelChange}
              >
                <p>{advancedSettings.level}</p>
              </div>
            </div>
            <button className={`px-4 py-1 border-1 border-gray-200 bg-stone-800 text-white rounded-3xl ${questionSet.current?.value ? "hover:bg-stone-200 hover:text-stone-800 cursor-pointer" : "cursor-not-allowed"}`} onClick={setting_prompt}>
              作成
            </button>
          </div>
        </div>
        <div className="h-30 p-5">
        {openSettings.number_of_quiz && (
          <div className="flex w-auto pt-2 pb-4 pl-8 border-b-2 border-b-stone-400">
            <p className="mr-1">問題数設定 : </p>
            <div className="">
              <input
                className="inline-block mr-1 w-10 border-b-1 border-stone-300 text-right bg-white outline-none"
                type="text"
                onChange={handleNumberChange}
              />
              <p className="inline-block">問</p>
            </div>
            {/* <p className="ml-5 text-stone-500">※最大10問まで</p> */}
          </div>
        )}
        {openSettings.level && (
          <div className="flex w-auto p-2 pl-8 border-b-2 border-b-stone-400">
            <p className="mr-1 py-1">難易度設定 : </p>
            <div className="">
              <label className="inline-block">
                <input
                  type="radio"
                  name="level"
                  className="hidden"
                  value="初心者"
                  checked={advancedSettings.level === "初心者"}
                  onChange={handleLevelChange}
                />
                <p className="inline-block ml-1 px-4 py-1 border-1 border-stone-300 rounded-3xl cursor-pointer hover:border-gray-200">
                  初心者
                </p>
              </label>
              <label className="inline-block">
                <input
                  type="radio"
                  name="level"
                  className="hidden"
                  value="中級者"
                  checked={advancedSettings.level === "中級者"}
                  onChange={handleLevelChange}
                />
                <p className="inline-block ml-1 px-4 py-1 border-1 border-stone-300 rounded-3xl cursor-pointer hover:border-gray-200">
                  中級者
                </p>
              </label>
              <label className="inline-block">
                <input
                  type="radio"
                  name="level"
                  className="hidden"
                  value="上級者"
                  checked={advancedSettings.level === "上級者"}
                  onChange={handleLevelChange}
                />
                <p className="inline-block ml-1 px-4 py-1 border-1 border-stone-300 rounded-3xl cursor-pointer hover:border-gray-200">
                  上級者
                </p>
              </label>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
