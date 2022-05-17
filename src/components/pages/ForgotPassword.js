import React from "react";
import { useState } from "react";
import AuthenticationNavbar from "../inc/AuthenticationNavbar";
import useFetch from "use-http";
import Loader from "../inc/Loader";
import { WarningPopUpModal } from "../inc/WarningPopUpModal";
import useGaTracker from "../useGaTracker";
import FallbackUI from "../inc/FallbackUI";

const ForgotPassword = ({ serverError }) => {
  useGaTracker();
  const [email, setEmail] = useState({});
  const [emailSent, setEmailSent] = useState(false);
  const [error_not_handled, setErrorNotHandled] = useState(false);

  const { post: sendEmail, loading: send_email_loading } = useFetch(
    `/auth/password_reset/`
  );

  //Api call to send token through email when user forgets password

  const verifyEmail = async () => {
    const send_email_api_response = await sendEmail(email);

    if (send_email_api_response) {
      if (
        send_email_api_response.status &&
        send_email_api_response.status === "OK"
      ) {
        setEmailSent(true);
      } else {
        if (
          send_email_api_response.email &&
          send_email_api_response.email[0] === "Enter a valid email address."
        ) {
          WarningPopUpModal(send_email_api_response.email[0]);
        } else if (
          send_email_api_response.email &&
          send_email_api_response.email[0] ===
            "We couldn't find an account associated with that email. Please try a different e-mail address."
        ) {
          WarningPopUpModal(send_email_api_response.email[0]);
        } else {
          setErrorNotHandled(true);
        }
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await verifyEmail();
  };
  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <Loader loading={send_email_loading}>
      <div>
        <div>
          <AuthenticationNavbar />
        </div>
        <section className="form my-4 mx-5">
          <div className="container">
            <div className="row">
              <img
                src="https://xpovi-media.s3.eu-central-1.amazonaws.com/xpovi+logos/Xpovi_logo-04.png"
                alt="..."
                className="img-fluid col-md-5"
              />
              {emailSent ? (
                <div className="col-md-6 pt-5">
                  <h4 className="fw-bold pb-4 pt-2 text-center">
                    Please Check Your Email! A Reset Password Email is Sent.
                  </h4>
                </div>
              ) : (
                <div className="col-md-6 bg-c-light">
                  <div className="row">
                    <div className="text-center">
                      <h4 className="fw-bold pb-4 pt-3">
                        Please Enter registered email below to reset your
                        password
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={onSubmit}>
                    <div className="row justify-content-center">
                      <div className="col-md-7">
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Email"
                            aria-describedby="emailHelp"
                            name="email"
                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                            title="Please Enter a Valid Email"
                            required
                            value={email.email}
                            onChange={(e) =>
                              setEmail({ email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row py-4 justify-content-center">
                      <div className="col-md-7 d-grid">
                        <button
                          type="submit"
                          className="btn btn-danger bg-red btn-lg rounded-pill"
                        >
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Loader>
  );
};

export default ForgotPassword;
