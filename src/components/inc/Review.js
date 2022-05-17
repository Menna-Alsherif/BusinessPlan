import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import useFetch from "use-http";
import { Prompt } from "react-router-dom";
import HandleUserExit from "../HandleUserExit.js";
import Loader from "./Loader";
import QuestionsAnswers from "./QuestionsAnswers";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState.js";
import FallbackUI from "./FallbackUI.js";
import NavigationButtons from "./NavigationButtons.js";

const Review = ({ serverError }) => {
  const { user } = useContext(GlobalContext);
  const [error_not_handled, setErrorNotHandled] = useState(false);

  const {
    get: generateBusinessPlanApi,
    loading: generate_business_plan_loading,
    response: generate_business_plan_response,
  } = useFetch(
    `/generate_business_plan?username=${user.username}&business_plan_id=${user.business_plan_id}`
  );

  const history = useHistory();

  const generateBP = async () => {
    // fetch BP name
    // Generate BP
    return await generateBusinessPlanApi();
  };

  const routeChange = async (e) => {
    e.preventDefault();
    await generateBP();
    if (generate_business_plan_response.status === 200) {
      const location = {
        pathname: "/checkout",
        state: { fromReview: true },
      };
      history.push(location);
    } else {
      setErrorNotHandled(true);
    }
  };
  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  const navigation_component = (
    <form onSubmit={routeChange}>
      <NavigationButtons
        prev_button={true}
        submit_name={"Proceed to Checkout"}
      />
    </form>
  );

  return (
    <Loader loading={generate_business_plan_loading}>
      <HandleUserExit />
      {/* //Prompt to block user from leaving questionnaire when thinking "back" goes back to section 3 */}
      <Prompt
        message={(location) => {
          return location.pathname.startsWith("/business-plan-name")
            ? `Are you sure you want to leave the Questionnaire?`
            : true;
        }}
      />
      <QuestionsAnswers navigation_component={navigation_component} />
      {navigation_component}
    </Loader>
  );
};

export default Review;
