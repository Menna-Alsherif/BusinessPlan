import { useState, useContext, useEffect } from "react";
import CheckoutNavbar from "../inc/CheckoutNavbar";
import useFetch from "use-http";
import Loader from "../inc/Loader";
import { useReroutingModal } from "../inc/ReroutingModal";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import { useLocation, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import useGaTracker from "../useGaTracker";
import { Col, Card, Button, Image } from "react-bootstrap";
import FallbackUI from "../inc/FallbackUI";

function Checkout({ serverError }) {
  useGaTracker();
  const { editStep, user, setBusinessPlanIsPurchased } =
    useContext(GlobalContext);
  const { reRoutePopUpModal } = useReroutingModal();
  const [iframe_source, setIframeSource] = useState("");
  const [error_not_handled, setErrorNotHandled] = useState(false);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const history = useHistory();

  // Api to fetch iframe source
  const { get: getIframeSource, loading: iframe_source_loading } =
    useFetch(`/payment`);

  //Api to send email to backend
  const { post: sendEmail, loading: send_email_loading } =
    useFetch(`payment/stg`);

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT === "production") {
      getIframeSourceApi();
    }
  }, []);

  //function that sends desired payment method to the backend and gets back the iframe src to render it
  const getIframeSourceApi = async () => {
    const get_iframe_source_response = await getIframeSource();

    if (get_iframe_source_response && get_iframe_source_response.data) {
      setIframeSource(get_iframe_source_response.data.iframe);
    } else if (
      get_iframe_source_response &&
      get_iframe_source_response.paymob === "Paymob error."
    ) {
      editStep(4); // to go back to review section where user can try again checking out
      reRoutePopUpModal(
        "Sorry for the inconvenience, there was a problem with checkout. Please Try Again Later!",
        "/business-plan"
      );
    } else {
      setErrorNotHandled(true);
    }
  };

  // function that sends business plan id and user id to back end to send business plan through email in Staging Envirnoment
  const sendEmailStagingApi = async () => {
    const send_email_response = await sendEmail({
      user: parseInt(user.user_id),
      business_plan: parseInt(user.business_plan_id),
    });
    if (send_email_response) {
      if (send_email_response && send_email_response.success === true) {
        setSuccess(true);
        if (process.env.REACT_APP_ENVIRONMENT === "production") {
          setBusinessPlanIsPurchased(true);
        }
      } else {
        setErrorNotHandled(true);
      }
    }
  };

  // if business Plan is already purchased, send the user back to business plan name to avoid double registering
  if (user.business_plan_is_purchased)
    return <Redirect to="/business-plan-name" />;
  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  if (location.state === undefined)
    return <Redirect to="/business-plan-name" />;
  if (
    (location.state.fromReview && location.state.fromReview === true) ||
    (location.state.fromPaymentCallBack &&
      location.state.fromPaymentCallBack === true)
  ) {
    return (
      <Loader loading={iframe_source_loading || send_email_loading}>
        <div>
          <div>
            <CheckoutNavbar />
          </div>
          {success ? (
            <div className="container mt-5 mb-5">
              <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                  <h3 className="fw-bold pb-3 pt-2">
                    You will recieve your business plan by email within the next
                    24 hours
                  </h3>
                  <br />
                  <h3 className="fw-bold pb-5 pt-2">
                    <span className="color-red">
                      Thank You, we hope your experience was enjoyable
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-9 text-center m-2">
                    <h3 className="fw-bold p-2">
                      You will recieve your business plan by email within
                      <br />
                      the next 24 hours after completing your check-out
                      <br />
                      only for<span className="color-red"> $249</span> for a{" "}
                      <span className="color-red">limited time!</span>
                    </h3>
                  </div>
                </div>
              </div>

              {process.env.REACT_APP_ENVIRONMENT === "staging" ? (
                <div className="row justify-content-center">
                  <div className="col-md-9 text-center">
                    <div className="row">
                      <div className="row justify-content-center">
                        <Button
                          size="sm"
                          onClick={sendEmailStagingApi}
                          className="btn bg-red border-red col-md-4 rounded-pill m-4 mb-5 mt-5"
                        >
                          <h5>Confirm Payment</h5>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : iframe_source ? (
                <div className="row justify-content-center">
                  <div className="col-md-9 text-center">
                    <div className="row">
                      {
                        <iframe
                          height="1000"
                          src={iframe_source}
                          title="paymob"
                        ></iframe>
                      }
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </Loader>
    );
  }
  return null;
}

export default Checkout;
