import React, { useState } from "react";

const CheckBoxInputField = (props) => {
  const [selectAll, setSelectAll] = useState(false); 

  const handleOnChange = (e) => {
    if (props.editAnswer.name === "editAnswerBM") {
      props.editAnswer(props.answer, e.target.checked);
    } else {
      setSelectAll(e.target.checked);
      props.editAnswer(props.update_all_array, e.target.checked);
    }
  };

  return (
    <>
      <input
        className={props.className}
        type="checkbox"
        key={props.key}
        name={props.answer}
        required={props.required}
        checked={
          props.editAnswer.name === "editAnswerBM" ? props.value : selectAll
        }
        value={
          props.editAnswer.name === "editAnswerBM" ? props.value : selectAll
        }
        onClick={props.onClick}
        onChange={(e) => handleOnChange(e)}
        id={props.option}
      />
      <label className="form-check-label" htmlFor={props.option}>
        {props.option}
      </label>
    </>
  );
};

export default CheckBoxInputField;
