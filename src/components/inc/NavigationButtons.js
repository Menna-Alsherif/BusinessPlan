import React, { useContext } from "react";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";

const NavigationButtons = ({ submit_name, prev_button }) => {
  const { prevStep } = useContext(GlobalContext);
  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-4 d-grid">
            {prev_button ? (
              <button
                type="button"
                className="btn btn-light border-red btn-lg rounded-pill m-4"
                onClick={() => prevStep()}
              >
                Previous
              </button>
            ) : null}
          </div>

          <div className="col-md-4 d-grid">
            <button
              type="submit"
              className={`btn ${
                submit_name === "Proceed to Checkout"
                  ? "btn-danger bg-red"
                  : "btn-light border-red"
              } btn-lg rounded-pill m-4 d-grid`}
            >
              {submit_name}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavigationButtons;
