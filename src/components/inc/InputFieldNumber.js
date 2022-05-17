import NumberFormat from "react-number-format";

const InputFieldNumber = (props) => {
  // fn that takes a value and returns true if value is greater than or equal minimum value and 100 or if it is an empty string -> used for raised funding values
  const withValueCapMin = (inputObj) => {
    const { value } = inputObj;
    if (value >= props.min || value === "") return true;
    return false;
  };

  return (
    <NumberFormat
      placeholder={props.placeholder}
      required={props.required}
      className={props.className}
      thousandsGroupStyle="thousand"
      value={props.value}
      isAllowed={
        props.min !== undefined
          ? withValueCapMin
          : () => {
              return true;
            }
      }
      allowNegative={false}
      suffix={props.suffix}
      inputmode="numeric"
      onValueChange={(values) => {
        props.editAnswer(
          props.answer,
          isNaN(parseInt(values.value)) ? "" : parseInt(values.value)
        );
      }}
      thousandSeparator={props.separator}
    />
  );
};

export default InputFieldNumber;
