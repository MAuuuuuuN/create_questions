import styles from './css/SelectDisplay.module.css';

export default function SelectDisplay({ quizIndex, selectData, radioRefs, onCheckChange }) {
  const selectParse = JSON.parse(selectData);

  const handleChange = (event) => {
    const value = event.target.value;
    onCheckChange(value);
  };

  return (
    <>
      <fieldset>
        <ul className={styles.problem_list}>
          {selectParse.map((select, index) => (
            <li key={index}>
              <label className={styles.selectLabel}>
                <input
                  name={quizIndex}
                  type="radio"
                  value={select}
                  onChange={handleChange}
                />
                <p>{select}</p>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  )
}