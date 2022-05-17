import React, { useContext } from "react";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import Login from "../pages/Login";
import ScrollToTop from "../scrollToTop";
import { Route } from "react-router-dom";

const AuthenticatedRoute = (props) => {
  const { user } = useContext(GlobalContext);

  return (
    <Route path={props.path}>
      <ScrollToTop />
      {user.is_authenticated ? <props.component serverError={props.serverError} /> : <Login />}
    </Route>
  );
};

export default AuthenticatedRoute;
