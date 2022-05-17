import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useFetch from "use-http";
import { useReroutingModal } from "../inc/ReroutingModal";
import Loader from "../inc/Loader";
import FallbackUI from "./FallbackUI";

const ResendVerification = ({ mail, serverError, resendEmailTrigger }) => {
  const [remaining_trials, setRemainingTrials] = useState(2);
  const [repeat, setRepeat] = useState(0);
  const { post: reSendRegisterApi, loading: resend_verification_loading } =
    useFetch(`auth/resend-verification-email/`);
  const [error_not_handled, setErrorNotHandled] = useState(false);

  const { reRoutePopUpModal } = useReroutingModal();

  // function that resends verification email to user with input of email

  const resendVerificationEmail = async () => {
    const resend_register_response = await reSendRegisterApi({
      email: mail,
    });

    if (resend_register_response) {
      if (
        resend_register_response.status &&
        resend_register_response.status === "OK"
      ) {
        setRemainingTrials(resend_register_response.remain);
        setRepeat((prevKey) => prevKey + 1);
      } else if (
        resend_register_response &&
        resend_register_response.status === "Fail"
      ) {
        reRoutePopUpModal(
          "Sorry for the inconvenience, there was a problem with registeration. Please try again!",
          "/register"
        );
      } else if (
        resend_register_response &&
        resend_register_response.status === "Exceed"
      ) {
        reRoutePopUpModal(
          "Email used is invalid! Please register with another valid email address",
          "/register"
        );
      } else {
        setErrorNotHandled(true);
      }
    }
  };

  useEffect(async () => {
    if (resendEmailTrigger) {
      await resendVerificationEmail();
    }
  }, []);

  // function checking remainingTime and returns a button to resend verification email when time is up, else the countdown text and reamining with the styling of remaining time

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <button
            onClick={() => resendVerificationEmail()}
            className="btn btn-outline-danger btn-sm justify-content-center"
          >
            RESEND!
          </button>
        </div>
      );
    }
    return (
      <div className="timer d-flex align-items-center justify-content-center flex-column">
        <div className="countdown-value text-center">
          You can
          <br /> resend in <br />
        </div>
        <div className="countdown-value text-center color-red">
          {remainingTime}
        </div>
        <div className="countdown-value text-center">seconds</div>
      </div>
    );
  };
  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <Loader loading={resend_verification_loading}>
      {!resend_verification_loading && (
        <div className="col-md-12">
          <h4 className="countdown-value text-center">
            Please Check Your Email! <br />A Verification Email has been Sent.
          </h4>
          {/* Countdown Componenet only rendenred when there are more available trials to resend a verification email for registeration */}
          {remaining_trials > 0 ? (
            <div className="container ">
              <div className="row">
                <div className="row w-100 d-flex align-items-center justify-content-center pt-5 pb-5 mt-4">
                  <h4 className="countdown-text text-center">
                    If you didn't receive a verification email,
                  </h4>
                </div>
                <div className="row w-100 d-flex align-items-center justify-content-center g-1">
                  <CountdownCircleTimer
                    key={repeat}
                    isPlaying
                    duration={60}
                    colors={["#ee2830"]}
                    onComplete={() => ({
                      shouldRepeat: false,
                      delay: 1,
                    })}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </Loader>
  );
};

export default ResendVerification;
