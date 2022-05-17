import { useState, useContext } from "react";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import AuthenticationNavbar from "../inc/AuthenticationNavbar";
import { Link, useHistory } from "react-router-dom";
import { WarningPopUpModal } from "../inc/WarningPopUpModal";
import useFetch from "use-http";
import Loader from "../inc/Loader";
import jwt_decode from "jwt-decode";
import ResendVerification from "../inc/ResendVerification";
import { useReroutingModal } from "../inc/ReroutingModal";
import useGaTracker from "../useGaTracker";
import FallbackUI from "../inc/FallbackUI";

function Login({ serverError }) {
  useGaTracker();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailVerification, setEmailVerification] = useState(false);
  const [error_not_handled, setErrorNotHandled] = useState(false);
  const history = useHistory();

  const { userLogin } = useContext(GlobalContext);
  const { reRoutePopUpModal } = useReroutingModal();

  const { post: login, loading: login_loading } = useFetch(`/auth/login`);

  // Fetch access token from backend
  const loginAPI = async () => {
    return await login({
      email: email.toLowerCase(),
      password: pass,
    });
  };

  const routeChange = async (e) => {
    e.preventDefault();
    let login_response = await loginAPI();

    // Save acces token, refresh token, and their expiration date and username in local storage
    if (login_response && login_response.access) {
      localStorage.setItem("access token", login_response.access);
      localStorage.setItem("refresh token", login_response.refresh);
      userLogin(
        login_response.username,
        login_response.user_id,
        email,
        jwt_decode(login_response.access).exp,
        jwt_decode(login_response.refresh).exp
      );
      let path = "business-plan-name";
      history.push(path);
    } else if (
      login_response.email &&
      login_response.email[0] === "No user founded with the given email"
    ) {
      WarningPopUpModal("Wrong Email! ");
    } else if (
      login_response.password &&
      login_response.password[0] === "Wrong password"
    ) {
      WarningPopUpModal("Wrong Password!");
    } else if (
      login_response.detail &&
      login_response.detail[0] === "User not verified"
    ) {
      setEmailVerification(true);
    } else if (login_response && login_response.status === "Exceed") {
      reRoutePopUpModal(
        "Email used is invalid! Please register with another valid email address",
        "/register"
      );
    } else {
      setErrorNotHandled(true);
    }
  };

  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;

  return (
    <div>
      <Loader loading={login_loading}>
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
                className=""
              />
              </div>
              {emailVerification ? (
                <div className="col-md-7">
                  {" "}
                  {
                    <ResendVerification
                      mail={email}
                      resendEmailTrigger={emailVerification}
                    />
                  }
                </div>
              ) : (
                <div className="col-md-7 bg-c-light rounded">
                  <h4 className="fw-bold pt-5 justify-content-center text-center">
                    {" "}
                    Sign In To Your Account
                  </h4>
                  <form onSubmit={routeChange}>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-7">
                        <label for="inputPassword5" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="inputPassword5"
                          className="form-control"
                          placeholder="*******"
                          aria-describedby="passwordHelpBlock"
                          name="password"
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
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
                          Login
                        </button>
                        <Link className="pt-2" to="/forgot_password">
                          Forgot Password ?
                        </Link>
                        {process.env.REACT_APP_ENVIRONMENT === "production" ? (
                          <p>
                            Dont Have An Account?{" "}
                            <Link to="/register">Register Here</Link>
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </Loader>
    </div>
  );
}

export default Login;
