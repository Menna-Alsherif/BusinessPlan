import "./App.css";
import Home from "./components/pages/Home";
import BusinessPlanName from "./components/pages/BusinessPlanName";
import BusinessPlan from "./components/pages/BusinessPlan";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Checkout from "./components/pages/Checkout";
import PageNotFound from "./components/pages/NotFound";
import Footer from "./components/inc/Footer";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import EmailVerification from "./components/pages/EmailVerification";
import ForgotPassword from "./components/pages/ForgotPassword";
import PasswordReset from "./components/pages/PasswordReset";
import { Provider } from "use-http";
import BusinessPlanAnswers from "./components/pages/BusinessPlanAnswers";
import { useReroutingModal } from "./components/inc/ReroutingModal";
import { GlobalContext } from "./QuestionsContext/QuestionsGlobalState";
import { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import AuthenticatedRoute from "./components/inc/AuthenticatedRoute";
import PaymentCallback from "./components/inc/PaymentCallback";
import FAQ from "./components/pages/FAQ";

function App() {
  const { reRoutePopUpModal } = useReroutingModal();

  const { user, editUser, userLogout } = useContext(GlobalContext);

  const [server_error, setServerError] = useState(false);

  //Checking if first render and the refresh token has expired to clear the storage and logs out user
  useEffect(() => {
    if (
      localStorage.getItem("refresh token") === null ||
      isExpired(user.refresh_token_expiration_date)
    ) {
      localStorage.clear();
      //clear the whole state
      userLogout();
    }
  }, []);

  let env = process.env.REACT_APP_ENVIRONMENT;

  let url = "";
  switch (env) {
    case "local":
      url = process.env.REACT_APP_LOCAL_URL;
      break;
    case "staging":
      url = process.env.REACT_APP_STAGING_URL;
      break;
    case "production":
      url = process.env.REACT_APP_PRODUCTION_URL;
      break;
    default:
      return null;
  }

  // function to check if token expiration date has been reached yet

  const isExpired = (token_exp) => {
    return Date.now() >= token_exp * 1000;
  };

  //Global options for all useFetch calls

  const options = {
    //clearing cache before every fetch
    cachePolicy: "no-cache",
    interceptors: {
      request: async ({ options }) => {
        if (localStorage.getItem("access token") === null) {
          delete options.headers.Authorization;
        } else if (isExpired(user.refresh_token_expiration_date)) {
          localStorage.clear();
          //clear the whole state
          userLogout();
          reRoutePopUpModal("Session Expired. Please Login! Here", "/login");
        } else if (isExpired(user.access_token_expiration_date)) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          const refresh_token = localStorage.getItem("refresh token");
          const raw = {
            refresh: refresh_token,
          };

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(raw),
          };

          const res = await fetch(`${url}/auth/refresh`, requestOptions);
          const newToken = await res.json();
          localStorage.setItem("access token", await newToken.access);
          editUser(
            "access_token_expiration_date",
            jwt_decode(newToken.access).exp
          );
          //add access token exp
          options.headers.Authorization = `Bearer ${newToken.access}`;
        } else {
          options.headers.Authorization = `Bearer ${localStorage.getItem(
            "access token"
          )}`;
        }
        return options;
      },
      response: async ({ response }) => {
        if (response.status >= 500) {
          setServerError(true);
        }
        return response;
      },
    },
  };

  return (
    <Provider url={`${url}`} options={options}>
      <Fragment>
        <Switch>
          <Route exact path="/">
            <ScrollToTop />
            <Home serverError={server_error} />
          </Route>
          <AuthenticatedRoute
            path="/business-plan-name"
            component={BusinessPlanName}
            serverError={server_error}
          />
          <AuthenticatedRoute
            path="/business-plan"
            component={BusinessPlan}
            serverError={server_error}
          />
          <AuthenticatedRoute
            path="/business-plan-answers"
            component={BusinessPlanAnswers}
            serverError={server_error}
          />
          <AuthenticatedRoute
            path="/checkout"
            component={Checkout}
            serverError={server_error}
          />
          <AuthenticatedRoute
            path="/payment/callback"
            component={PaymentCallback}
            serverError={server_error}
          />
          {process.env.REACT_APP_ENVIRONMENT === "production" && (
            <Route path="/register">
              <ScrollToTop />
              <Register serverError={server_error} />
            </Route>
          )}
          <Route path="/email-verify">
            <ScrollToTop />
            <EmailVerification serverError={server_error} />
          </Route>
          <Route path="/faq">
            <ScrollToTop />
            <FAQ serverError={server_error} />
          </Route>
          <Route path="/login">
            <ScrollToTop />
            <Login serverError={server_error} />
          </Route>
          <Route path="/forgot_password">
            <ScrollToTop />
            <ForgotPassword serverError={server_error} />
          </Route>
          <Route path="/password_reset">
            <ScrollToTop />
            <PasswordReset serverError={server_error} />
          </Route>
          <Route path="*">
            <ScrollToTop />
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />
      </Fragment>
    </Provider>
  );
}

export default App;
