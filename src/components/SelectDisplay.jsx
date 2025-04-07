import { useState } from "react";

export default function SelectDisplay({
  quizIndex,
  selectData,
  onCheckChange,
}) {
  const selectParse = JSON.parse(selectData);
  const [checkedValue, setChackedValue] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    onCheckChange(value);
    setChackedValue(value);
  };

  return (
    <>
      <fieldset className="my-2">
        <ul>
          {selectParse.map((select, index) => (
            <li
              key={index}
              className={`flex items-center text-center justify-center sm:w-auto w-100 sm:m-5 mx-auto my-1 p-2 border-3 shadow-md rounded-md text-lg transition duration-300 ease-in-out ${checkedValue === select ? "bg-indigo-100  border-blue-500" : "border-gray-200 hover:bg-indigo-50 hover:border-3 hover:border-blue-300"}`}
            >
              <label className="flex items-center justify-center w-200 min-h-15 cursor-pointer">
                <input
                  name={quizIndex}
                  type="radio"
                  className="hidden"
                  value={select}
                  onChange={handleChange}
                />
                <p className="m-auto">{select}</p>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  );
}
