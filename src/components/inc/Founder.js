import React from "react";
import InputString from "./InputFieldString";
import InputFieldPercentage from "./InputFieldPercentage";

const Founder = (props) => {
  return (
    <div className="row">
      <div className="col-md-3">
        <h4>Founder {props.founderNumber}</h4>
      </div>
      <div className="col-md-3">
        <InputString
          value={props.value[0]}
          placeholder={props.placeholder.P1}
          required={props.required}
          answer={props.answer[0]}
          pattern="^(?=\S)[a-zA-Z 0-9]*[^\s]$"
          title="Founder's name accepts only letters, numbers and spaces"
          editAnswer={props.editAnswer}
        />
      </div>
      <div className="col-md-3">
        <InputString
          value={props.value[1]}
          placeholder={props.placeholder.P2}
          required={props.required}
          answer={props.answer[1]}
          pattern="^(?=\S)[a-zA-Z 0-9]*[^\s]$"
          title="Founder's role accepts only letters, numbers and spaces"
          editAnswer={props.editAnswer}
        />
      </div>
      <div className="col-md-3">
        <InputFieldPercentage
          value={props.value[2]}
          min={props.min}
          className={props.className}
          placeholder={props.placeholder.P3}
          required={props.required}
          answer={props.answer[2]}
          editAnswer={props.editAnswer}
        />
      </div>
    </div>
  );
};

export default Founder;
