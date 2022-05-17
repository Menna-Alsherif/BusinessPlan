import BusinessPlanNavbar from "../inc/BusinessPlanNavbar";
import Questionnaire from "../inc/Questionnaire";
import { useLocation, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import useGaTracker from "../useGaTracker";

function BusinessPlan() {
  useGaTracker();
  const location = useLocation();
  // Using use History action pop to determine Page reload and redirecting business plan name
  const history = useHistory();
  if (history.action === "POP") {
    return <Redirect to="/business-plan-name" />;
  }
  if (location.state === undefined)
    return <Redirect to="/business-plan-name" />;
  if (
    location.state.fromBusinessPlanName &&
    location.state.fromBusinessPlanName === true
  ) {
    return (
      <div>
        <div>
          <BusinessPlanNavbar />
        </div>
        <div>
          <Questionnaire />
        </div>
      </div>
    );
  }
  return null;
}

export default BusinessPlan;
