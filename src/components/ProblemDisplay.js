import styles from './ProblemDisplay.module.css';

export default function ProblemDisplay({ questionValue, index, select1, select2, select3, select4 }) {
  return (
    <div>
      <p>問題{index + 1} : {questionValue}</p>
      <fieldset>
        <ul className={styles.problem_list}>
          <li><label htmlFor={`group${index}-radioOption1`}><input type="radio" id={`group${index}-radioOption1`} name={index} />{select1}</label></li>
          <li><label htmlFor={`group${index}-radioOption2`}><input type="radio" id={`group${index}-radioOption2`} name={index} />{select2}</label></li>
          <li><label htmlFor={`group${index}-radioOption3`}><input type="radio" id={`group${index}-radioOption3`} name={index} />{select3}</label></li>
          <li><label htmlFor={`group${index}-radioOption4`}><input type="radio" id={`group${index}-radioOption4`} name={index} />{select4}</label></li>
        </ul>
      </fieldset>
    </div >
  )
}