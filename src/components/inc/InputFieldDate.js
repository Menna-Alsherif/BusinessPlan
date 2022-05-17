const InputFieldDate = (props) => {
  function handleChange(e) {
    props.editAnswer(props.answer, e.target.value);
  }
  return (
    <input
      className="form-control form-control-lg"
      type="date"
      min={props.min}
      max={props.max}
      placeholder="Pick Date"
      aria-label="Pick Date"
      required={props.required}
      name={props.answer}
      value={props.value}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
};

export default InputFieldDate;
