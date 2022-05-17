import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "use-http";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import Loader from "../inc/Loader";
import BusinessPlanNavbar from "../inc/BusinessPlanNavbar";
import QuestionsAnswers from "../inc/QuestionsAnswers";
import useGaTracker from "../useGaTracker";
import FallbackUI from "../inc/FallbackUI";
import { useReroutingModal } from "../inc/ReroutingModal";

const BusinessPlanAnswers = ({ serverError }) => {
  useGaTracker();
  const search = useLocation().search;
  const business_plan_id = new URLSearchParams(search).get("business_plan_id");
  const {
    getClientBriefAnswers,
    getBusinessModelAnswers,
    getFinancialForecastAnswers,
  } = useContext(GlobalContext);

  const { reRoutePopUpModal } = useReroutingModal();
  const [error_not_handled, setErrorNotHandled] = useState(false);
  const {
    get: getBusinessPlanAnswers,
    loading: business_plan_answers_loading,
  } = useFetch(`/business-plan-answers/${business_plan_id}`);

  // function that fetches answers from back end with business plan id and saves it to the state

  const getBusinessPlanAnswersApi = async () => {
    const get_business_plan_answers_response = await getBusinessPlanAnswers();
    if (
      get_business_plan_answers_response &&
      get_business_plan_answers_response.client_brief_answer
    ) {
      getClientBriefAnswers(
        get_business_plan_answers_response.client_brief_answer
      );
      getBusinessModelAnswers(
        get_business_plan_answers_response.business_model_answer
      );
      getFinancialForecastAnswers(
        get_business_plan_answers_response.financial_forecast_answer
      );
    } else if (get_business_plan_answers_response.detail === "Not Found") {
      reRoutePopUpModal(
        "Sorry for the inconvenience, there was a problem fetching your business plan. Please try again later!",
        "/business-plan-name"
      );
    } else {
      setErrorNotHandled(true);
    }
  };

  useEffect(() => {
    getBusinessPlanAnswersApi();
  }, []);
  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;

  return (
    <Loader loading={business_plan_answers_loading}>
      <BusinessPlanNavbar />
      <QuestionsAnswers />
    </Loader>
  );
};

export default BusinessPlanAnswers;
