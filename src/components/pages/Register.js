import { useState } from "react";
import AuthenticationNavbar from "../inc/AuthenticationNavbar";
import { Link } from "react-router-dom";
import { WarningPopUpModal } from "../inc/WarningPopUpModal";
import useFetch from "use-http";
import Loader from "../inc/Loader";
import { useReroutingModal } from "../inc/ReroutingModal";
import ResendVerification from "../inc/ResendVerification";
import useGaTracker from "../useGaTracker";
import FallbackUI from "../inc/FallbackUI";

function Register({ serverError }) {
  useGaTracker();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [emailVerification, setEmailVerification] = useState(false);
  const [error_not_handled, setErrorNotHandled] = useState(false);
  const { post: registerApi, loading: register_loading } =
    useFetch(`/auth/register`);

  const { reRoutePopUpModal } = useReroutingModal();
  //Api call to register new Users with username, email, password and confirm password

  const registerUser = async () => {
    const register_response = await registerApi({
      username: name,
      password: pass,
      confirm_password: confirmpass,
      email: mail.toLowerCase(),
    });

    if (register_response) {
      if (register_response.id) {
        setEmailVerification(true);
      } else if (
        register_response.username &&
        register_response.username[0] ===
          "A user with that username already exists."
      ) {
        WarningPopUpModal(register_response.username[0]);
      } else if (
        register_response.username &&
        register_response.username[0] ===
          "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."
      ) {
        WarningPopUpModal(register_response.username[0]);
      } else if (
        register_response.email &&
        register_response.email[0] === "A user with that email already exists."
      ) {
        WarningPopUpModal(register_response.email[0]);
      } else if (
        register_response.confirm_password &&
        register_response.confirm_password[0] === "Passwords don't match"
      ) {
        WarningPopUpModal(register_response.confirm_password[0]);
      } else if (
        register_response.password &&
        register_response.password[0] ===
          "Your password must be 8-20 characters long and contain at least one number, one uppercase, one lowercase letter and one special character"
      ) {
        WarningPopUpModal(register_response.password[0]);
      } else if (register_response.email === "Send email failed") {
        reRoutePopUpModal(
          "Sorry for the inconvenience, there was a problem with registeration. Please try again!",
          "/register"
        );
      } else {
        setErrorNotHandled(true);
      }
    }
  };

  const routeChange = async (e) => {
    e.preventDefault();
    if (pass !== confirmpass) {
      WarningPopUpModal(`Passwords don't match`);
    } else {
      await registerUser();
    }
  };
  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <>
      <Loader loading={register_loading}>
        <div>
          <AuthenticationNavbar />
        </div>
        <section className="form my-4 mx-5">
          <div className="container">
            <div className="row">
            <div className="col-md-5 d-flex justify-content-center align-items-center">
              <img
                src="https://xpovi-media.s3.eu-central-1.amazonaws.com/xpovi+logos/Xpovi_logo-04.png"
                alt="..."
              />
              </div>

              {emailVerification ? (
                <div className="col-md-7 d-flex justify-content-center align-items-center">
                  <ResendVerification mail={mail} />
                </div>
              ) : (
                <div className="col-md-7 bg-c-light rounded">
                  <div className="row">
                    <div className="text-center">
                      <h4 className="fw-bold pb-4 pt-4">
                        {" "}
                        Fill The Fields Below To Create An Account
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={routeChange}>
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-md-7">
                        <div className="mb-3">
                          <label for="usr" className="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="usr"
                            placeholder="Name"
                            aria-describedby="nameHelp"
                            //Regex Pattern accepts alphanumeric, @ , . , _ , -
                            pattern="^(?=\S)[\w.@+-_]*[^.\s.\W]$"
                            title="Username can be a mix of alphanumeric characters and symbols (-,_,@,+)"
                            name="username"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
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
                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                            title="Please Enter a Valid Email"
                            name="email"
                            value={mail}
                            required
                            onChange={(e) => setMail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-7">
                        <label for="inputPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="inputPassword5"
                          className="form-control"
                          placeholder="*******"
                          aria-describedby="passwordHelpBlock"
                          minlength="8"
                          maxlength="20"
                          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W]).{8,}$"
                          title="Your password must be 8-20 characters long and contain at least one number, one uppercase, one lowercase letter and one special character"
                          name="password"
                          value={pass}
                          required
                          onChange={(e) => setPass(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-7">
                        <label for="inputPassword5" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirminputPassword5"
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
                          Register
                        </button>
                        <p className="pt-2">
                          Already have an acccount?{" "}
                          <Link to="/login">Log in Here</Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </Loader>
    </>
  );
}

export default Register;
