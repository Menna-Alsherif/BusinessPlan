import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import InputFieldString from "./InputFieldString";
import QuestionnaireContainer from "./QuestionnaireContainer";
import Question from "./Question";
import DropdownInputField from "./DropdownInputField";
import InputFieldDate from "./InputFieldDate";
import Founder from "./Founder";
import { WarningPopUpModal } from "./WarningPopUpModal";
import { RemoveWheelFunctionality } from "./RemoveWheelFunctionality";
import { Prompt } from "react-router-dom";
import HandleUserExit from "../HandleUserExit.js";
import useFetch from "use-http";
import Loader from "./Loader";
import InputFieldNumber from "./InputFieldNumber";
import { useReroutingModal } from "./ReroutingModal";
import FallbackUI from "./FallbackUI";
import NavigationButtons from "./NavigationButtons";
import InputFieldPercentage from "./InputFieldPercentage";

function Section1({ nextStep, serverError }) {
  RemoveWheelFunctionality();

  const {
    sectionClientBriefQuestions,
    sectionClientBrief,
    editAnswerCB,
    user,
    editUser,
  } = useContext(GlobalContext);

  const { reRoutePopUpModal } = useReroutingModal();

  const {
    post: createNewBusinessPlan,
    loading: new_business_plan_loading,
    error: create_new_business_plan_error,
  } = useFetch(`/business_plan_view`);

  const {
    post: saveClientBriefAnswers,
    loading: save_client_brief_loading,
    error: save_client_brief_error,
  } = useFetch(`/client_brief_answer_view`);

  const {
    A1,
    A2,
    A3,
    A4,
    A5,
    A6,
    A7,
    A8,
    A9,
    A10,
    A11,
    A12,
    A13,
    A14,
    A15,
    A16,
    A17,
    A18,
    A19,
    A20,
  } = sectionClientBrief;
  const { Q1, Q2, Q3, Q4, Q5, Q6, Q7 } = sectionClientBriefQuestions;
  const today = new Date().toISOString().slice(0, 10);
  const year_end = `${new Date().getFullYear()}-12-31`;

  const [error_not_handled, setErrorNotHandled] = useState(false);

  useEffect(() => {
    editAnswerCB(
      "A20",
      (100 - A13 - A16 - A19) % 1 !== 0
        ? (100 - A13 - A16 - A19).toFixed(2)
        : 100 - A13 - A16 - A19
    );
  }, [A13, A16, A19]);

  useEffect(() => {
    if (A1 !== "Other") {
      editAnswerCB("A2", "");
    }
  }, [A1]);

  const CreateBpApi = async () => {
    const business_plan = {
      name: user.business_plan_name,
      user: user.user_id,
      is_sent: false,
    };

    //Api call to create new business plan
    const newBusinessPlan = await createNewBusinessPlan(business_plan);
    if (
      newBusinessPlan &&
      newBusinessPlan.non_field_errors &&
      newBusinessPlan.non_field_errors[0] ===
        "This business plan name already exists. Please choose another name!"
    ) {
      reRoutePopUpModal(
        "This business plan name already exists." +
          "<br />" +
          "Please choose another name!",
        "/business-plan-name"
      );
    } else if (
      newBusinessPlan &&
      newBusinessPlan.non_field_errors &&
      newBusinessPlan.non_field_errors[0] ===
        "Number of unfinished business plans had been exceeded"
    ) {
      reRoutePopUpModal(
        "You have exceeded the maximum number of unfinished business plans." +
          "<br />" +
          "Please delete a business plan before creating a new one!",
        "/business-plan-name"
      );
    } else {
      return newBusinessPlan.id;
    }
  };

  const SaveClientBriefApi = async (answers) => {
    //Api call to save client brief section answers
    const save_client_brief_answers_response = await saveClientBriefAnswers(
      answers
    );
    if (save_client_brief_answers_response) {
      if (save_client_brief_answers_response.id) {
        nextStep();
      } else if (save_client_brief_answers_response.data) {
        if (
          save_client_brief_answers_response.data.founders &&
          save_client_brief_answers_response.data.founders ===
            "Invalid stake value."
        ) {
          WarningPopUpModal("Founder 1's stake value should be more than 0");
        } else if (
          save_client_brief_answers_response.data.establishment_date &&
          save_client_brief_answers_response.data.establishment_date ===
            "Invalid value."
        ) {
          A4
            ? WarningPopUpModal("Establishment date should not exceed today")
            : WarningPopUpModal(
                "Establishment date should not be prior to today"
              );
        } else if (
          save_client_brief_answers_response.data.funding_raised_date &&
          save_client_brief_answers_response.data.funding_raised_date ===
            "Invalid value."
        ) {
          if (A7) {
            WarningPopUpModal("Funding Raised Date should not exceed today");
          }
        } else if (
          A7 &&
          save_client_brief_answers_response.data.funding_raised_value &&
          save_client_brief_answers_response.data.funding_raised_value ===
            "Invalid value."
        ) {
          WarningPopUpModal("Funding raised value should be more than 0");
        } else if (
          A7 &&
          save_client_brief_answers_response.data.funding_raised_percentage &&
          save_client_brief_answers_response.data.funding_raised_percentage ===
            "Invalid value."
        ) {
          WarningPopUpModal("Investor Stake should be more than 0");
        }
      } else {
        setErrorNotHandled(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if other founders stake is a positive number
    if (A20 < 0) {
      WarningPopUpModal("Founders total stake should not exceed 100%");
      return;
    }

    let answers = {
      sector_name: A1 === "Other" ? A2 : A1,
      development_stage: A3,
      is_established: A4,
      establishment: { date: A5, capital: A6 },
      is_raised_funding: A7,
      //Checking for empty strings to conform with backend valiation schema
      // Checking if user answered A7 with yes to send funding values if no to clear funding values
      funding_raised: {
        value: A7 ? A8 : 0,
        percentage: A7 ? A9 : 0,
        date: A7 ? A10 : "",
      },
      founders: {
        founder1: { name: A11, role: A12, stake: A13 },
        founder2: {
          name: A14,
          role: A15,
          stake: A16 === "" ? 0 : A16,
        },
        founder3: {
          name: A17,
          role: A18,
          stake: A19 === "" ? 0 : A19,
        },
        "other founders": { stake: parseFloat(A20) },
      },
      business_plan: user.business_plan_id,
    };

    if (user.is_new_business_plan) {
      const business_plan_id = await CreateBpApi();
      if (business_plan_id) {
        editUser("business_plan_id", business_plan_id);
        editUser("is_new_business_plan", false);
        answers["business_plan"] = business_plan_id;
        await SaveClientBriefApi(answers);
      } else {
        setErrorNotHandled(true);
      }
    } else {
      await SaveClientBriefApi(answers);
    }
  };

  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;

  return (
    <>
      <Loader loading={new_business_plan_loading || save_client_brief_loading}>
        {!(create_new_business_plan_error || save_client_brief_error) ? (
          <>
            <HandleUserExit />

            <Prompt message="Are you sure you want to leave without saving? " />
          </>
        ) : (
          ""
        )}
        <QuestionnaireContainer progress={"33"}>
          <form onSubmit={handleSubmit}>
            <NavigationButtons
              prev_button={false}
              submit_name={"Save And Continue"}
            />
            <section className="section">
              <div className="container bg-c-light py-4">
                <div className="row justify-content-center text-center">
                  <div className="col-md-12">
                    <h1>CLIENT BRIEF</h1>
                  </div>
                  <Question question={Q1}>
                    <DropdownInputField
                      options={Q1.options}
                      editAnswer={editAnswerCB}
                      value={A1}
                      answer="A1"
                    />
                    {A1 === "Other" ? (
                      <InputFieldString
                        placeholder={Q1.Placeholder.P1}
                        required={true}
                        pattern="^(?=\S)[a-zA-Z\s&-]*[^\s]$"
                        title="Sector Name accepts only letters, spaces and the special characters & and -"
                        editAnswer={editAnswerCB}
                        value={A2}
                        answer="A2"
                      />
                    ) : null}
                  </Question>
                  <Question question={Q2}>
                    <DropdownInputField
                      options={Q2.options}
                      editAnswer={editAnswerCB}
                      value={A3}
                      answer="A3"
                    />
                  </Question>
                  <Question question={Q3}>
                    <DropdownInputField
                      options={Q3.options}
                      editAnswer={editAnswerCB}
                      value={A4}
                      answer="A4"
                    />
                  </Question>
                  <Question question={Q4}>
                    <InputFieldDate
                      editAnswer={editAnswerCB}
                      answer="A5"
                      min={A4 ? null : today}
                      max={A4 ? today : year_end}
                      value={A5}
                      required={true}
                    />
                    <InputFieldNumber
                      className={"form-control form-control-lg"}
                      placeholder={Q4.Placeholder.P1}
                      required={true}
                      separator={true}
                      suffix={" EGP"}
                      editAnswer={editAnswerCB}
                      answer="A6"
                      value={A6}
                    />
                  </Question>
                  <Question question={Q5}>
                    <DropdownInputField
                      options={Q5.options}
                      editAnswer={editAnswerCB}
                      answer="A7"
                      value={A7}
                    />
                  </Question>
                  {A7 === true ? (
                    <>
                      <Question question={Q6}>
                        <InputFieldNumber
                          className={"form-control form-control-lg"}
                          placeholder={Q6.Placeholder.P1}
                          required={true}
                          suffix={" EGP"}
                          separator={true}
                          editAnswer={editAnswerCB}
                          answer="A8"
                          value={A8}
                          min={1}
                        />

                        <InputFieldPercentage
                          className={"form-control form-control-lg"}
                          placeholder={Q6.Placeholder.P2}
                          required={true}
                          editAnswer={editAnswerCB}
                          answer="A9"
                          value={A9}
                          min={1}
                        />
                        <InputFieldDate
                          editAnswer={editAnswerCB}
                          answer="A10"
                          value={A10}
                          required={true}
                          max={today}
                        />
                      </Question>
                    </>
                  ) : null}
                  <Question question={Q7}>
                    <Founder
                      className={"form-control form-control-lg"}
                      placeholder={Q7.Placeholder}
                      required={true}
                      founderNumber={1}
                      editAnswer={editAnswerCB}
                      answer={["A11", "A12", "A13"]}
                      value={[A11, A12, A13]}
                      min={1}
                    />
                    <Founder
                      className={"form-control form-control-lg"}
                      placeholder={Q7.Placeholder}
                      required={A14 || A15 || A16 ? true : false}
                      founderNumber={2}
                      editAnswer={editAnswerCB}
                      answer={["A14", "A15", "A16"]}
                      value={[A14, A15, A16]}
                    />
                    <Founder
                      className={"form-control form-control-lg"}
                      placeholder={Q7.Placeholder}
                      required={A17 || A18 || A19 ? true : false}
                      founderNumber={3}
                      editAnswer={editAnswerCB}
                      answer={["A17", "A18", "A19"]}
                      value={[A17, A18, A19]}
                    />
                    <div className="row">
                      <div className="col-md-3">
                        <h4>Other Founders</h4>
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-3"></div>
                      <div className="col-md-3">
                        <h4>
                          {(100 - A13 - A16 - A19) % 1 !== 0
                            ? (100 - A13 - A16 - A19).toFixed(2)
                            : 100 - A13 - A16 - A19}
                          %
                        </h4>
                      </div>
                    </div>
                  </Question>
                </div>
              </div>
            </section>

            <NavigationButtons
              prev_button={false}
              submit_name={"Save And Continue"}
            />
          </form>
        </QuestionnaireContainer>
      </Loader>
    </>
  );
}

export default Section1;
