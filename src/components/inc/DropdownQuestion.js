import React, { useState } from "react";

const DropdownQuestion = (props) => {
  const [answer, setAnswer] = useState("");
  function handleChange(e) {
    setAnswer(e.target.value);
    props.editAnswer(props.answer, e.target.value);
  }

  return (
    <div className="col-md-9 question pt-5">
      <div className="row">
        <div className="col-11">
          <h4 className="bg-red text-white py-4">{props.question.Q}</h4>
        </div>
        <div className="col-1">
          <h3 className="py-4" data-tip={props.question.T}>
            <i className="fas fa-info"></i>
          </h3>
        </div>
      </div>
      <select
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        required
        name="A1"
        onChange={(e) => {
          handleChange(e);
        }}
        value={answer}
      >
        {props.question.options.map((option, i) => (
          <option key={i} value={option === "N/A" ? "" : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownQuestion;
