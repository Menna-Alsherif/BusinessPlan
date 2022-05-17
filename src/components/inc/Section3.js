import React, { useContext, useState, useEffect } from "react";
import Question from "./Question";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import DropdownInputField from "./DropdownInputField";
import QuestionnaireContainer from "./QuestionnaireContainer";
import InputFieldNumber from "./InputFieldNumber";
import InputFieldDate from "./InputFieldDate";
import { RemoveWheelFunctionality } from "./RemoveWheelFunctionality";
import { WarningPopUpModal } from "./WarningPopUpModal";
import Loader from "./Loader";
import useFetch from "use-http";
import { Prompt } from "react-router-dom";
import HandleUserExit from "../HandleUserExit.js";
import FallbackUI from "./FallbackUI";
import NavigationButtons from "./NavigationButtons";
import InputFieldPercentage from "./InputFieldPercentage";
import { getDynamicYear, Years } from "./DynamicDates";

const Section3 = ({ nextStep, serverError }) => {
  const {
    sectionFinancialForecastQuestions,
    sectionFinancialForecast,
    editAnswerFF,
    user,
  } = useContext(GlobalContext);

  const [error_not_handled, setErrorNotHandled] = useState(false);
  const [device_type, setDeviceType] = useState("");
  const {
    First: first_year,
    Second: second_year,
    Third: third_year,
    Fourth: fourth_year,
    Fifth: fifth_year,
  } = Years;

  RemoveWheelFunctionality();

  const {
    post: saveFinancialForecastAnswers,
    loading: save_financial_forecast_answers_loading,
  } = useFetch(`/financial_forecast_answer_view`);

  const {
    A281,
    A282,
    A283,
    A284,
    A285,
    A286,
    A287,
    A288,
    A289,
    A290,
    A291,
    A292,
    A293,
    A294,
    A295,
    A296,
    A297,
    A298,
    A299,
    A300,
    A301,
    A302,
    A303,
    A304,
    A305,
    A306,
    A307,
    A308,
    A309,
    A310,
    A311,
    A312,
    A313,
    A314,
    A315,
    A316,
    A317,
    A318,
    A319,
    A320,
    A321,
    A322,
    A323,
    A324,
    A325,
    A326,
    A327,
    A328,
    A329,
    A330,
    A331,
    A332,
  } = sectionFinancialForecast;

  const { Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13 } =
    sectionFinancialForecastQuestions;
  const media_answers = [
    { A289: A289 },
    { A290: A290 },
    { A291: A291 },
    { A292: A292 },
    { A293: A293 },
  ];

  const target_employees_answers = {
    Management: [{ A306: A306 }, { A307: A307 }, { A308: A308 }],
    "Finance/Accounting": [{ A309: A309 }, { A310: A310 }, { A311: A311 }],
    Marketing: [{ A312: A312 }, { A313: A313 }, { A314: A314 }],
    Sales: [{ A315: A315 }, { A316: A316 }, { A317: A317 }],
    "Business Development": [{ A318: A318 }, { A319: A319 }, { A320: A320 }],
    "Software Development": [{ A321: A321 }, { A322: A322 }, { A323: A323 }],
    Other: [{ A324: A324 }, { A325: A325 }, { A326: A326 }],
  };

  const office_utitlies_expenses_answers = {
    "Average Office Rent/Month": { A327: A327 },
    "Utilities Cost/Month (Internet, Electricity & others)": { A328: A328 },
  };

  const investment_bugdet_answers = {
    "Software Assets": { A329: A329 },
    "Furniture, Equipment and Machinery": { A330: A330 },
    Vehicles: { A331: A331 },
    "Average Price Per Computer": { A332: A332 },
  };

  const year_start = `${new Date().getFullYear()}-01-01`;
  const year_end = `${new Date().getFullYear()}-12-31`;

  const department_dates_errors = {
    employees_Management: "Management",
    employees_Other: "Other",
    "employees_Business Development": "Business Development",
    "employees_Finance/Accounting": "Finance/Accounting",
    employees_Marketing: "Marketing",
    employees_Sales: "Sales",
    "employees_Software Development": "Software Development",
  };

  const financialForecastAnswersAPI = async () => {
    const answers = {
      revenue_model: A281,
      price: A282,
      gross_profit_margin: A283,
      price_growth: A284,
      cost_growth: A285,
      sales_receipts: A286,
      collect_pay: {
        collect_days: A287,
        pay_days: A288,
      },
      marketing_channels: {
        facebook: A289,
        instagram: A290,
        google: A291,
        linkedin: A292,
        sms: A293,
      },
      marketing_plan: {
        [first_year]: {
          videos: A294,
          posts: A299,
        },
        [second_year]: {
          videos: A295,
          posts: A300,
        },
        [third_year]: {
          videos: A296,
          posts: A301,
        },
        [fourth_year]: {
          videos: A297,
          posts: A302,
        },
        [fifth_year]: {
          videos: A298,
          posts: A303,
        },
      },
      marketing_cost: {
        videos: A304,
        posts: A305,
      },
      employees: {
        Management: {
          number: A306,
          salaries: A307,
          hire_date: A308,
        },
        "Finance/Accounting": {
          number: A309,
          salaries: A310,
          hire_date: A311,
        },
        Marketing: {
          number: A312,
          salaries: A313,
          hire_date: A314,
        },
        Sales: {
          number: A315,
          salaries: A316,
          hire_date: A317,
        },
        "Business Development": {
          number: A318,
          salaries: A319,
          hire_date: A320,
        },
        "Software Development": {
          number: A321,
          salaries: A322,
          hire_date: A323,
        },
        Other: {
          number: A324,
          salaries: A325,
          hire_date: A326,
        },
      },
      office_utilities_cost: {
        office: A327,
        utilities: A328,
      },
      fixed_assets: {
        software: A329,
        office: A330,
        vehicles: A331,
        computer: A332,
      },
      business_plan: user.business_plan_id,
    };

    // Change values to zeros for each department with no hirings
    Object.values(answers["employees"]).forEach((role) => {
      if (role["number"] === "") {
        Object.keys(role).forEach((key) => {
          role[key] = 0;
        });
      }
    });

    // Check for marketing channels cumulative values
    // + to parse string to float
    let total_marketing_channels = +A289 + +A290 + +A291 + +A292 + +A293;
    if (total_marketing_channels !== 100) {
      WarningPopUpModal("Marketing channels sum should be equal 100%");
      return false;
    }

    if (A327 === "" || A328 === "") {
      WarningPopUpModal(
        "Please enter 0 if you don't have Office Rent or Utilities Cost"
      );
      return false;
    }

    if (A329 === "" || A330 === "" || A331 === "" || A332 === "") {
      WarningPopUpModal("Please enter 0 for unobtained fixed assets");
      return false;
    }

    //Api call to save financial_forecast_answers

    const save_financial_forecast_answers_response =
      await saveFinancialForecastAnswers(answers);
    if (save_financial_forecast_answers_response) {
      if (save_financial_forecast_answers_response.id) {
        return true;
      } else if (save_financial_forecast_answers_response.data) {
        Object.entries(department_dates_errors).map(
          ([department_date_error, department_date_name]) => {
            if (
              save_financial_forecast_answers_response.data[
                department_date_error
              ] &&
              save_financial_forecast_answers_response.data[
                department_date_error
              ] === "Invalid hiring date."
            ) {
              return WarningPopUpModal(
                `${department_dates_errors[department_date_error]} Employees Hiring Date should be in ${first_year}`
              );
            }
          }
        );
      } else {
        setErrorNotHandled(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const financial_forecast_answers_api_response =
      await financialForecastAnswersAPI();
    if (financial_forecast_answers_api_response) {
      nextStep();
    }
  };

  useEffect(() => {
    getDeviceType();
  }, []);

  const getDeviceType = () => {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression 
   containing some mobile devices keywords 
   to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
   it returns boolean value*/
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  };

  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <Loader loading={save_financial_forecast_answers_loading}>
      <HandleUserExit />
      <Prompt message="Are you sure you want to leave without saving? " />
      <QuestionnaireContainer progress={"100"}>
        <form onSubmit={handleSubmit}>
          <NavigationButtons
            prev_button={true}
            submit_name={"Save And Continue"}
          />
          <section className="section">
            <div className="container bg-c-light py-4">
              <div className="row justify-content-center text-center">
                <div className="col-md-12">
                  <h1>FINANCIAL FORECAST</h1>
                </div>
                <Question question={Q1}>
                  <DropdownInputField
                    options={Q1.options}
                    editAnswer={editAnswerFF}
                    answer="A281"
                    value={A281}
                  />
                </Question>
                <Question question={Q2}>
                  <InputFieldNumber
                    className={"form-control form-control-lg"}
                    placeholder={Q2.Placeholder.P1}
                    required={true}
                    suffix={" EGP"}
                    separator={true}
                    editAnswer={editAnswerFF}
                    answer="A282"
                    value={A282}
                  />
                </Question>
                <Question question={Q3}>
                  <InputFieldPercentage
                    className={"form-control form-control-lg"}
                    placeholder={Q3.Placeholder.P1}
                    required={true}
                    editAnswer={editAnswerFF}
                    answer="A283"
                    value={A283}
                  />
                </Question>
                <Question question={Q4}>
                  <DropdownInputField
                    options={Q4.options}
                    editAnswer={editAnswerFF}
                    answer="A284"
                    value={A284}
                  />
                </Question>
                <Question question={Q5}>
                  <DropdownInputField
                    options={Q5.options}
                    editAnswer={editAnswerFF}
                    answer="A285"
                    value={A285}
                  />
                </Question>
                <Question question={Q6}>
                  <DropdownInputField
                    options={Q6.options}
                    editAnswer={editAnswerFF}
                    answer="A286"
                    value={A286}
                  />
                </Question>
                <Question question={Q7}>
                  <div className="row">
                    <div className="col-md-6">
                      <h4>Days Until collecting sales receipts</h4>
                    </div>
                    <div className="col-md-6">
                      <InputFieldNumber
                        className={"form-control form-control-lg"}
                        placeholder={Q7.Placeholder.P1}
                        required={true}
                        suffix={" Days"}
                        separator={false}
                        editAnswer={editAnswerFF}
                        answer="A287"
                        value={A287}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h4>Days Until paying your suppliers</h4>
                    </div>
                    <div className="col-md-6">
                      <InputFieldNumber
                        className={"form-control form-control-lg"}
                        placeholder={Q7.Placeholder.P1}
                        required={true}
                        suffix={" Days"}
                        separator={false}
                        editAnswer={editAnswerFF}
                        answer="A288"
                        value={A288}
                      />
                    </div>
                  </div>
                </Question>
                <Question question={Q8}>
                  {["Facebook", "Instagram", "Google", "Linkedin", "SMS"].map(
                    (media, index) => {
                      return (
                        <div key={index} className="row">
                          <div className="col-md-6">
                            <h4>{media}</h4>
                          </div>
                          <div className="col-md-6">
                            <InputFieldPercentage
                              placeholder={Q8.Placeholder.P1}
                              className={"form-control form-control-lg"}
                              required={true}
                              editAnswer={editAnswerFF}
                              answer={Object.keys(media_answers[index])[0]}
                              value={Object.values(media_answers[index])[0]}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </Question>
                <Question question={Q9}>
                  <>
                    {device_type === "mobile" ? (
                      <div className="container d-flex align-items-center justify-content-center">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row d-flex justify-content-center align-items-center">
                              <h5> Promotional Videos</h5>
                            </div>

                            {[
                              { A294: A294 },
                              { A295: A295 },
                              { A296: A296 },
                              { A297: A297 },
                              { A298: A298 },
                            ].map((answer, index) => {
                              return (
                                <div key={index} className="row my-3 ">
                                  <div className="col-2 d-flex justify-content-center align-items-center">
                                    <h5>{getDynamicYear(index)}</h5>
                                  </div>
                                  <div className="col-10">
                                    <InputFieldNumber
                                      className={
                                        "form-control form-control-lg text-center"
                                      }
                                      placeholder={Q9.Placeholder.P1}
                                      required={true}
                                      suffix={" Video(s)"}
                                      separator={false}
                                      editAnswer={editAnswerFF}
                                      answer={Object.keys(answer)[0]}
                                      value={Object.values(answer)[0]}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="col-md-6">
                            <div className="row">
                              <h5 className="d-flex justify-content-center align-items-center">
                                Static Posts
                              </h5>
                            </div>
                            {[
                              { A299: A299 },
                              { A300: A300 },
                              { A301: A301 },
                              { A302: A302 },
                              { A303: A303 },
                            ].map((content, index) => {
                              return (
                                <div key={index} className="row my-3">
                                  <div className="col-2 d-flex justify-content-center align-items-center">
                                    <h5>{getDynamicYear(index)}</h5>
                                  </div>
                                  <div className="col-10">
                                    <InputFieldNumber
                                      className={
                                        "form-control form-control-lg text-center"
                                      }
                                      placeholder={Q9.Placeholder.P2}
                                      required={true}
                                      suffix={" Post(s)"}
                                      separator={false}
                                      editAnswer={editAnswerFF}
                                      answer={Object.keys(content)[0]}
                                      value={Object.values(content)[0]}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-2"></div>
                          <div className="col-2">
                            <h5 className="text-center pe-2">{first_year}</h5>
                          </div>
                          <div className="col-2">
                            <h5 className="text-center pe-2">{second_year}</h5>
                          </div>
                          <div className="col-2">
                            <h5 className="text-center pe-2">{third_year}</h5>
                          </div>
                          <div className="col-2">
                            <h5 className="text-center pe-2">{fourth_year}</h5>
                          </div>
                          <div className="col-2">
                            <h5 className="text-center pe-2">{fifth_year}</h5>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2">Promotional Videos</div>

                          {[
                            { A294: A294 },
                            { A295: A295 },
                            { A296: A296 },
                            { A297: A297 },
                            { A298: A298 },
                          ].map((answer, index) => {
                            return (
                              <div key={index} className="col-2">
                                <InputFieldNumber
                                  className={
                                    "form-control form-control-lg text-center"
                                  }
                                  placeholder={Q9.Placeholder.P1}
                                  required={true}
                                  suffix={""}
                                  separator={false}
                                  editAnswer={editAnswerFF}
                                  answer={Object.keys(answer)[0]}
                                  value={Object.values(answer)[0]}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div className="row">
                          <div className="col-2 d-flex align-items-center justify-content-center">
                            Static Posts
                          </div>
                          {[
                            { A299: A299 },
                            { A300: A300 },
                            { A301: A301 },
                            { A302: A302 },
                            { A303: A303 },
                          ].map((content, index) => {
                            return (
                              <div key={index} className="col-2">
                                <InputFieldNumber
                                  className={
                                    "form-control form-control-lg text-center"
                                  }
                                  placeholder={Q9.Placeholder.P2}
                                  required={true}
                                  suffix={""}
                                  separator={false}
                                  editAnswer={editAnswerFF}
                                  answer={Object.keys(content)[0]}
                                  value={Object.values(content)[0]}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </>
                </Question>
                <Question question={Q10}>
                  <div className="row">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                      <h4>Promotional Video</h4>
                    </div>
                    <div className="col-md-6">
                      <InputFieldNumber
                        className={"form-control form-control-lg"}
                        placeholder={Q10.Placeholder.P1}
                        required={true}
                        suffix={" EGP"}
                        separator={true}
                        editAnswer={editAnswerFF}
                        answer="A304"
                        value={A304}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                      <h4>Static Post</h4>
                    </div>
                    <div className="col-md-6">
                      <InputFieldNumber
                        className={"form-control form-control-lg"}
                        placeholder={Q10.Placeholder.P1}
                        required={true}
                        suffix={" EGP"}
                        separator={true}
                        editAnswer={editAnswerFF}
                        answer="A305"
                        value={A305}
                      />
                    </div>
                  </div>
                </Question>
                <Question question={Q11}>
                  {Object.entries(target_employees_answers).map(
                    ([field, answer], index) => {
                      return (
                        <div key={index} className="row">
                          <div className="col-md-3">
                            <h4>{field}</h4>
                          </div>
                          <div className="col-md-3">
                            <InputFieldNumber
                              required={
                                Object.values(answer[0])[0] ||
                                Object.values(answer[1])[0] ||
                                Object.values(answer[2])[0]
                              }
                              editAnswer={editAnswerFF}
                              answer={Object.keys(answer[0])[0]}
                              className={"form-control form-control-lg"}
                              suffix={""}
                              separator={false}
                              placeholder={Q11.Placeholder.P1}
                              value={Object.values(answer[0])[0]}
                            />
                          </div>
                          <div className="col-md-3">
                            <InputFieldNumber
                              required={
                                Object.values(answer[0])[0] ||
                                Object.values(answer[1])[0] ||
                                Object.values(answer[2])[0]
                              }
                              editAnswer={editAnswerFF}
                              suffix={" EGP"}
                              separator={true}
                              answer={Object.keys(answer[1])[0]}
                              className={"form-control form-control-lg"}
                              placeholder={Q11.Placeholder.P2}
                              value={Object.values(answer[1])[0]}
                            />
                          </div>
                          <div className="col-md-3">
                            <InputFieldDate
                              required={
                                Object.values(answer[0])[0] ||
                                Object.values(answer[1])[0] ||
                                Object.values(answer[2])[0]
                              }
                              editAnswer={editAnswerFF}
                              answer={Object.keys(answer[2])[0]}
                              min={year_start}
                              max={year_end}
                              value={Object.values(answer[2])[0]}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </Question>
                <Question question={Q12}>
                  {Object.entries(office_utitlies_expenses_answers).map(
                    ([utility, answer], index) => {
                      return (
                        <div key={index} className="row">
                          <div className="col-md-6">
                            <h4>{utility}</h4>
                          </div>
                          <div className="col-md-6">
                            <InputFieldNumber
                              editAnswer={editAnswerFF}
                              answer={Object.keys(answer)[0]}
                              required={false}
                              suffix={" EGP"}
                              separator={true}
                              className={"form-control form-control-lg"}
                              placeholder={Q12.Placeholder.P1}
                              value={Object.values(answer)[0]}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </Question>
                <Question question={Q13}>
                  {Object.entries(investment_bugdet_answers).map(
                    ([budget_name, answer], index) => {
                      return (
                        <div key={index} className="row">
                          <div className="col-md-6">
                            <h4>{budget_name}</h4>
                          </div>
                          <div className="col-md-6">
                            <InputFieldNumber
                              editAnswer={editAnswerFF}
                              answer={Object.keys(answer)[0]}
                              required={false}
                              suffix={" EGP"}
                              separator={true}
                              className={"form-control form-control-lg"}
                              placeholder={Q13.Placeholder.P1}
                              value={Object.values(answer)[0]}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </Question>
              </div>
            </div>
          </section>
          <NavigationButtons
            prev_button={true}
            submit_name={"Save And Continue"}
          />
        </form>
      </QuestionnaireContainer>
    </Loader>
  );
};

export default Section3;
