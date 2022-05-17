import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import useFetch from "use-http";
import useGaTracker from "../useGaTracker";
import FallbackUI from "../inc/FallbackUI";
import { useReroutingModal } from "../inc/ReroutingModal";

const EmailVerification = ({ serverError }) => {
  useGaTracker();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [redirect, setRedirect] = useState(false);
  const [error_not_handled, setErrorNotHandled] = useState(false);
  const { reRoutePopUpModal } = useReroutingModal();

  const { get: verifyEmail } = useFetch(`/auth/email-verify/?token=${token}`);

  //Api call to verify user through token sent by email

  const verifyEmailApi = async () => {
    const verify_email_response = await verifyEmail();
    if (verify_email_response) {
      if (verify_email_response.email === "Successfully activated") {
        setRedirect(true);
      } else if (verify_email_response.error === "Invalid token") {
        reRoutePopUpModal(
          "Sorry for the inconvenience, there was a problem verifing your email. Please try to register again!",
          "/register"
        );
      } else {
        setErrorNotHandled(true);
      }
    }
  };

  useEffect(() => {
    verifyEmailApi();
  }, []);

  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  if (redirect) return <Redirect to="/login" />;
  return "";
};

export default EmailVerification;
