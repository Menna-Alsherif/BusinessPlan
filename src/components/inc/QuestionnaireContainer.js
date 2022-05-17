import ScrollToTop from "../scrollToTop";
import BusinessPlanNavbar from "./BusinessPlanNavbar";

const QuestionnaireContainer = (props) => {
  return (
    <div>
      <div>
        <BusinessPlanNavbar />
      </div>
      <div>
        <ScrollToTop />
        <div className="text-center ">
          <div className="container">
            <h3>Your Are Only A Few Answers Away</h3>
            <h3>Please Answer The Following Questions</h3>
            <div className="underline mx-auto"></div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-4">
                <h3>
                  CLIENT BRIEF
                  <br />
                  (6-7 Questions)
                </h3>
              </div>
              <div className="col-md-4">
                <h3>
                  BUSINESS MODEL
                  <br />
                  (6-13 Questions)
                </h3>
              </div>
              <div className="col-md-4">
                <h3>
                  FINANCIAL FORECAST
                  <br />
                  (13 Questions)
                </h3>
              </div>
            </div>
            <div className="progress">
              <div
                className={`progress-bar progress-bar-${props.progress}`}
                role="progressbar"
                aria-valuenow={props.progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {props.progress}%
              </div>
            </div>
          </div>
        </section>

        {props.children}
      </div>
    </div>
  );
};

export default QuestionnaireContainer;
