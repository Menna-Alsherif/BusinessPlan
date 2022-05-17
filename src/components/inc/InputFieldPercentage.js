import React from "react";
import NumberFormat from "react-number-format";

const InputFieldPercentage = (props) => {
  // fn that takes a value and returns true if between minimum value and 100 or if it is an empty string -> used for percentage values in founder 1 stake and raised funding stake
  const withValueCapMin = (inputObj) => {
    const { value } = inputObj;
    if ((value >= props.min && value <= 100.0) || value === "") return true;
    return false;
  };
  // fn that takes a value and return true if between 0 and 100 -> used for percentage values
  const withValueCapPercentage = (inputObj) => {
    const { value } = inputObj;
    if (value <= 100.0) return true;
    return false;
  };
  return (
    <NumberFormat
      placeholder={props.placeholder}
      required={props.required}
      className={props.className}
      value={props.value}
      allowNegative={false}
      isAllowed={
        props.min !== undefined ? withValueCapMin : withValueCapPercentage
      }
      suffix={" %"}
      onValueChange={(values) => {
        props.editAnswer(
          props.answer,
          isNaN(values.floatValue) ? "" : values.floatValue
        );
      }}
      inputmode="numeric"
      fixedDecimalScale={false}
      decimalScale={2}
    />
  );
};

export default InputFieldPercentage;
