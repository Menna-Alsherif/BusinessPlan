import React, { useEffect } from "react";
import { useState } from "react";
import AuthenticationNavbar from "../inc/AuthenticationNavbar";
import { useLocation, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { WarningPopUpModal } from "../inc/WarningPopUpModal";
import useFetch from "use-http";
import Loader from "../inc/Loader";
import { useReroutingModal } from "../inc/ReroutingModal";
import useGaTracker from "../useGaTracker";
import FallbackUI from "../inc/FallbackUI";

const PasswordReset = ({ serverError }) => {
  useGaTracker();
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [passwordSet, setPasswordSet] = useState(false);
  const [error_not_handled, setErrorNotHandled] = useState(false);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const { reRoutePopUpModal } = useReroutingModal();

  const { post: resetPasswordApi, loading: reset_password_loading } = useFetch(
    `/auth/password_reset/confirm/`
  );

  const { post: validateTokenApi, loading: validate_token_loading } = useFetch(
    `/auth/password_reset/validate_token/`
  );

  useEffect(async () => {
    const token_validate_response = await validateTokenApi({ token: token });
    if (token_validate_response.status !== "OK") {
      if (
        token_validate_response.token &&
        token_validate_response.token[0] === "Entered URL is invalid"
      ) {
        reRoutePopUpModal(token_validate_response.token[0], "/");
      } else if (
        token_validate_response.token &&
        token_validate_response.token[0] ===
          "The OTP used has expired. Please reset your password again"
      ) {
        reRoutePopUpModal(token_validate_response.token[0], "/forgot_password");
      } else {
        setErrorNotHandled(true);
      }
    }
  }, [token]);

  // Api call to confirm password reset using token sent by email

  async function resetPassword() {
    const info = {
      token: token,
      password: password,
      confirm_password: confirmpass,
    };

    const reset_password_response = await resetPasswordApi(info);

    if (reset_password_response && reset_password_response.status === "OK") {
      Swal.fire({
        icon: "success",
        text: "Password is Set!",
        confirmButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          setPasswordSet(true);
        }
      });
    } else if (
      reset_password_response.confirm_password &&
      reset_password_response.confirm_password[0] === "Passwords don't match"
    ) {
      WarningPopUpModal(reset_password_response.confirm_password[0]);
    } else if (
      reset_password_response.password &&
      reset_password_response.password[0] ===
        "Your password must be 8-20 characters long and contain at least one number, one uppercase, one lowercase letter and one special character"
    ) {
      WarningPopUpModal(reset_password_response.password[0]);
    } else if (
      reset_password_response.token &&
      reset_password_response.token[0] === "Entered URL is invalid"
    ) {
      reRoutePopUpModal(reset_password_response.token[0], "/");
    } else if (
      reset_password_response.token &&
      reset_password_response.token[0] ===
        "The OTP used has expired. Please reset your password again"
    ) {
      reRoutePopUpModal(reset_password_response.token[0], "/forgot_password");
    } else {
      setErrorNotHandled(true);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpass) {
      WarningPopUpModal(`Passwords don't match`);
    } else {
      await resetPassword();
    }
  };
  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  if (passwordSet) return <Redirect to="/login" />;

  return (
    <Loader loading={reset_password_loading || validate_token_loading}>
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
              <div className="col-md-7 bg-c-light">
                <div className="row">
                  <div className="text-center">
                    <h4 className="fw-bold pb-4 pt-3">
                      Please Enter Your New Password
                    </h4>
                  </div>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="row justify-content-center">
                    <div className="col-md-7">
                      <label for="inputPassword5" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="pass"
                        className="form-control"
                        placeholder="*******"
                        aria-describedby="passwordHelpBlock"
                        minlength="8"
                        maxlength="20"
                        pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W]).{8,}$"
                        title="Your password must be 8-20 characters long and contain at least one number, one uppercase, one lowercase letter and one special character"
                        name="password"
                        value={password.password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="col-md-7">
                      <label for="inputPassword5" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmpass"
                        className="form-control"
                        placeholder="*******"
                        aria-describedby="passwordHelpBlock"
                        name="confirm password"
                        value={confirmpass}
                        onChange={(e) => setConfirmpass(e.target.value)}
                        required
                      />
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
            </div>
          </div>
        </section>
      </div>
    </Loader>
  );
};

export default PasswordReset;
