import React, { useState, useEffect, useContext } from "react";
import BusinessPlanNavbar from "../inc/BusinessPlanNavbar";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import Loader from "../inc/Loader";
import CustomizedDropdown from "../inc/CustomizedDropdown";
import useGaTracker from "../useGaTracker";
import FallbackUI from "../inc/FallbackUI";
import { WarningPopUpModal } from "../inc/WarningPopUpModal";

function BusinessPlanName({ serverError }) {
  useGaTracker();
  const [name, setName] = useState("");
  const [column_size, setColumnSize] = useState(6);
  const [unfinished_questionnaires, setUnfinishedQuestionnaires] = useState([]);
  const [finished_businessplans, setFinishedBusinessPlans] = useState([]);
  const [exceeds_limit, setExceedsLimit] = useState(false);
  const [name_already_exists, setNameAlreadyExists] = useState(false);
  const [error_not_handled, setErrorNotHandled] = useState(false);
  const [unfinished_questionnaire_id, setUnfinishedQuestionnaireID] =
    useState(0);
  const [finished_businessplan_id, setFinishedBusinessPlanID] = useState(0);
  const [saved_section] = useState({});
  const history = useHistory();
  const {
    getClientBriefAnswers,
    getBusinessModelAnswers,
    editStep,
    getFinancialForecastAnswers,
    clearBusinessPlan,
    createNewBusinessPlan,
    createUnfinishedBusinessPlan,
    user,
    setBusinessPlanID,
  } = useContext(GlobalContext);

  const unfinished_questionnaires_length = unfinished_questionnaires.length;
  const finished_businessplans_length = finished_businessplans.length;

  const {
    get: getUserBusinessPlans,
    loading: user_business_plans_loading,
    error: user_business_plans_error,
  } = useFetch(`/business_plan_view`);
  const {
    get: getBusinessPlanSectionAnswers,
    loading: get_business_plan_section_answers_loading,
  } = useFetch(
    `/business-plan-sections-answers/${unfinished_questionnaire_id}`
  );

  const {
    delete: deleteBusinessPlan,
    loading: delete_business_plan_loading,
    response: delete_business_plan_response,
  } = useFetch(`business_plan_view/${unfinished_questionnaire_id}`);

  useEffect(() => {
    getBusinessPlan();
  }, []);

  useEffect(() => {
    checkBusinessPlanName();
  }, [name, unfinished_questionnaires]);

  // checks unfinished and finished business plans and set columns size accordingly

  useEffect(() => {
    // if user has NEITHER unfinished nor finished business plans
    if (
      finished_businessplans_length === 0 &&
      unfinished_questionnaires_length === 0
    ) {
      setColumnSize(12);
      // if user has BOTH unfinished or finished business plans
    } else if (
      finished_businessplans_length > 0 &&
      unfinished_questionnaires_length > 0
    ) {
      setColumnSize(4);
      // if user has EITHER unfinished or finished business plans
    } else if (
      (finished_businessplans_length === 0) !==
      (unfinished_questionnaires_length === 0)
    ) {
      setColumnSize(6);
    }
  }, [finished_businessplans, unfinished_questionnaires]);

  const setFinishedBusinessPlanId = (id) => {
    setFinishedBusinessPlanID(id);
  };

  const setUnfinishedQuestionnaireId = (id) => {
    setUnfinishedQuestionnaireID(id);
  };

  // function that checks if number of business_plans >= 10 and if entered name is not repeated

  const checkBusinessPlanName = () => {
    if (unfinished_questionnaires) {
      if (unfinished_questionnaires_length > 0) {
        const exceeds = unfinished_questionnaires_length >= 10;
        const exists =
          unfinished_questionnaires.find(
            (business_plan) =>
              business_plan.name.toLowerCase() === name.toLowerCase()
          ) ||
          finished_businessplans.find(
            (business_plan) =>
              business_plan.name.toLowerCase() === name.toLowerCase()
          );
        if (exceeds) {
          setExceedsLimit(true);
        } else {
          setExceedsLimit(false);
        }
        if (exists) {
          setNameAlreadyExists(true);
        } else {
          setNameAlreadyExists(false);
        }
      }
    }
  };

  //Get un/finished Business Plan names for user to select

  const getBusinessPlan = async () => {
    const business_plans = await getUserBusinessPlans();
    if (business_plans) {
      setUnfinishedQuestionnaires(
        await business_plans.filter(
          (business_plan) => business_plan.is_purchased === false
        )
      );
      setFinishedBusinessPlans(
        await business_plans.filter(
          (business_plan) => business_plan.is_purchased === true
        )
      );
      //Reseting answers and business plan id for creating new businessPlans
      clearBusinessPlan();
    }
  };

  //Gets every Section's Answers if they exist to make the questionnaire persistant from one End Point

  const GetBpAnswers = async () => {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const business_plan_section_answers_response =
      await getBusinessPlanSectionAnswers();
    if (business_plan_section_answers_response.client_brief_answer) {
      if (business_plan_section_answers_response.client_brief_answer !== null) {
        saved_section["client_brief"] =
          business_plan_section_answers_response.client_brief_answer;
        getClientBriefAnswers(
          business_plan_section_answers_response.client_brief_answer
        );
      }
      if (
        business_plan_section_answers_response.business_model_answer !== null
      ) {
        saved_section["business_model"] =
          business_plan_section_answers_response.business_model_answer;
        getBusinessModelAnswers(
          business_plan_section_answers_response.business_model_answer
        );
      }
      if (
        business_plan_section_answers_response.financial_forecast_answer !==
        null
      ) {
        saved_section["financial_forecast"] =
          business_plan_section_answers_response.financial_forecast_answer;
        getFinancialForecastAnswers(
          business_plan_section_answers_response.financial_forecast_answer
        );
      }
      return true;
    } else {
      setErrorNotHandled(true);
    }
  };

  const location = {
    pathname: "/business-plan",
    state: { fromBusinessPlanName: true },
  };

  const routeChangeCreate = (e) => {
    e.preventDefault();
    createNewBusinessPlan(name);
    if (!exceeds_limit && !name_already_exists) {
      history.push(location);
    }
  };

  const RouteChangeSelect = async (e) => {
    e.preventDefault();
    createUnfinishedBusinessPlan(
      unfinished_questionnaires.find(
        (plan) => plan.id == unfinished_questionnaire_id
      ).name,
      unfinished_questionnaire_id
    );
    const get_bp_answers_response = await GetBpAnswers();
    if (get_bp_answers_response) {
      // user continue business plan from review step
      if ("financial_forecast" in saved_section) {
        editStep(4);
      }
      // user continue business plan from section 3 step
      else if ("business_model" in saved_section) {
        editStep(3);
      }
      // user continue business plan from section 2 step
      else if ("client_brief" in saved_section) {
        editStep(2);
      } else if (!("client_brief" in saved_section)) {
        return;
      }
      history.push(location);
    }
  };

  // funtion on submit of finished business plan views the answers of such business plan with id

  const viewFinishedBusinessPlan = async (e) => {
    e.preventDefault();
    if (finished_businessplan_id > 0) {
      setBusinessPlanID(finished_businessplan_id);
      let path = `business-plan-answers/?business_plan_id=${finished_businessplan_id}`;
      history.push(path);
    }
  };

  // api function to delete business plan and then refetches business plans again from backend

  const deleteBusinessPlanApi = async () => {
    const delete_business_plan_response_api = await deleteBusinessPlan();
    if (delete_business_plan_response.status === 204) {
      await getBusinessPlan();
    } else if (
      delete_business_plan_response_api.detail &&
      delete_business_plan_response_api.detail === "Object not deleted."
    ) {
      const business_plan_name = unfinished_questionnaires.find(
        (plan) => plan.id == unfinished_questionnaire_id
      ).name;
      WarningPopUpModal(
        `Sorry for the inconvenience, Business Plan <b>${business_plan_name}</b> has not been deleted. Please try again.`
      );
    } else {
      setErrorNotHandled(true);
    }
  };

  if (user_business_plans_error || error_not_handled)
    return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <Loader
      loading={
        user_business_plans_loading ||
        get_business_plan_section_answers_loading ||
        delete_business_plan_loading
      }
    >
      {!user_business_plans_loading ? (
        <div>
          <div>
            <BusinessPlanNavbar />
          </div>
          <section className="section">
            <div className="container bg-c-light py-4">
              <>
                <div className="row text-center">
                  <form
                    onSubmit={routeChangeCreate}
                    className={`col-md-${column_size}`}
                  >
                    <div className="row p-4">
                      <h4 className="bg-red text-white py-4">
                        Create New Business Plan
                      </h4>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Name"
                        aria-label="Enter Name"
                        pattern="^(?=\S)[A-Za-z0-9 ]*[^.\s.\W]$"
                        title="Your Business Plan Name should only contain letters, numbers and spaces"
                        required
                        disabled={exceeds_limit}
                        name="businessplanname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div
                        hidden={!exceeds_limit && !name_already_exists}
                        className="text-left"
                      >
                        <div
                          class="alert alert-danger mt-3 text-black"
                          role="alert"
                        >
                          {name_already_exists && !exceeds_limit ? (
                            <>
                              This Business Plan Name already exists. <br />{" "}
                              Please Choose another Name!
                            </>
                          ) : (
                            ""
                          )}
                          {exceeds_limit ? (
                            <>
                              You have exceeded the maximum number of unfinished
                              business plans <br /> Please delete a business
                              plan before creating a new one
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="row justify-content-center"
                      hidden={exceeds_limit || name_already_exists}
                    >
                      <div className="col-md-8 d-grid">
                        <button
                          type="submit"
                          className="btn btn-danger bg-red btn-lg rounded-pill"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </form>
                  {unfinished_questionnaires.length > 0 ? (
                    <>
                      <form
                        onSubmit={RouteChangeSelect}
                        className={`col-md-${column_size}`}
                      >
                        <div className="row p-4">
                          <h4 className="bg-red text-white py-4">
                            Continue Unfinished Questionnaire
                          </h4>
                          <CustomizedDropdown
                            list={unfinished_questionnaires}
                            submit_function={deleteBusinessPlanApi}
                            setSelectFunction={setUnfinishedQuestionnaireId}
                            functionality={"DELETE"}
                          />
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-8 d-grid">
                            <button
                              type="submit"
                              className="btn btn-danger bg-red btn-lg rounded-pill"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  ) : (
                    ""
                  )}
                  {finished_businessplans.length > 0 ? (
                    <>
                      <form
                        onSubmit={viewFinishedBusinessPlan}
                        className={`col-md-${column_size}`}
                      >
                        <div className="row p-4">
                          <h4 className="bg-red text-white py-4">
                            Finished Business Plans
                          </h4>
                          <CustomizedDropdown
                            list={finished_businessplans}
                            setSelectFunction={setFinishedBusinessPlanId}
                            functionality={"STATUS"}
                          />
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-8 d-grid">
                            <button
                              type="submit"
                              className="btn btn-danger bg-red btn-lg rounded-pill"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            </div>
          </section>
        </div>
      ) : (
        ""
      )}
    </Loader>
  );
}

export default BusinessPlanName;
