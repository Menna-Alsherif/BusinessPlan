const InputFieldString = (props) => {
  function handleChange(e) {
    props.editAnswer(props.answer, e.target.value);
  }

  // function that checks for nulls in values and returns empty string
  function handleNullValues() {
    if (props.value === null) {
      return "";
    } else {
      return props.value;
    }
  }

  return (
    <input
      className="form-control form-control-lg"
      type="text"
      placeholder={props.placeholder}
      name={props.answer}
      pattern={props.pattern}
      title={props.title}
      required={props.required}
      value={handleNullValues()}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
};

export default InputFieldString;
