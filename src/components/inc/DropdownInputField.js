const DropdownInputField = (props) => {
  function handleChange(e) {
    props.editAnswer(props.answer, convertYesNoToBooleanValue(e.target.value));
  }

 // function that switches on value to return to its original option in Yes or No cases 

  function convertBooleanToYesNoValue() {
    switch (props.value) {
      case true:
        return "Yes";
      case false:
        return "No";
      default:
        return props.value;
    }
  }

  //function that switches on input value to be sent as true or false  

  function convertYesNoToBooleanValue(value) {
    switch (value) {
      case "Yes":
        return true;
      case "No":
        return false;
      default:
        return value;
    }
  }

  return (
    <select
      className="form-select form-select-lg mb-3"
      aria-label=".form-select-lg example"
      required
      name={props.answer}
      onChange={(e) => {
        handleChange(e);
      }}
      value={convertBooleanToYesNoValue()}
    >
      {props.options.map((option, i) => (
        <option key={i} value={option === "N/A" ? "" : option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownInputField;
