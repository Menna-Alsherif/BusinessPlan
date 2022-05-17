import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "use-http";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import Loader from "./Loader";
import CheckoutNavbar from "./CheckoutNavbar";
import { useHistory } from "react-router-dom";
import { useReroutingModal } from "../inc/ReroutingModal";
import FallbackUI from "./FallbackUI";

const PaymentCallback = ({ serverError }) => {
  const [success, setSuccess] = useState(false);
  const { user, setBusinessPlanIsPurchased } = useContext(GlobalContext);
  const history = useHistory();
  const { reRoutePopUpModal } = useReroutingModal();
  const [error_not_handled, setErrorNotHandled] = useState(false);

  // search has the url query params in string format
  const search_string = useLocation().search.substring(1);
  // uri_search_object has the url query params in object format
  // DecodeUriComponent : Replaces each escape sequence in the encoded URI component with the character that it represents.
  const uri_search_object = JSON.parse(
    '{"' + search_string.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );

  const {
    post: sendPaymobCallbackResponse,
    loading: send_paymob_callback_loading,
  } = useFetch(`payment`);

  //Api call to backend with paymob callback response, transaction_id, user id and business plan id

  const sendPaymobCallbackResponseApi = async () => {
    const send_paymob_callback_response = await sendPaymobCallbackResponse({
      transaction_id: parseInt(uri_search_object.id),
      user: user.user_id,
      business_plan: parseInt(user.business_plan_id),
    });
    if (send_paymob_callback_response) {
      if (
        send_paymob_callback_response &&
        send_paymob_callback_response.success === true
      ) {
        setSuccess(true);
        setBusinessPlanIsPurchased(true);
      } else if (
        send_paymob_callback_response &&
        send_paymob_callback_response.id &&
        send_paymob_callback_response.id[0] ===
          "business plan payment with this id already exists."
      ) {
        history.push("/");
      } else if (
        send_paymob_callback_response &&
        send_paymob_callback_response.id &&
        send_paymob_callback_response.success === false
      ) {
        const location = {
          pathname: "/checkout",
          state: { fromPaymentCallBack: true },
        };
        reRoutePopUpModal(
          "Card Details entered are incorrect. Please enter a valid card!",
          location
        );
      } else {
        setErrorNotHandled(true);
      }
    }
  };

  useEffect(() => {
    if (uri_search_object.success && uri_search_object.success == "true") {
      sendPaymobCallbackResponseApi();
    } else {
      const location = {
        pathname: "/checkout",
        state: { fromPaymentCallBack: true },
      };
      reRoutePopUpModal(
        "Card Details entered are incorrect. Please enter a valid card!",
        location
      );
    }
  }, []);

  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <Loader loading={send_paymob_callback_loading}>
      <CheckoutNavbar />
      {success ? (
        <div className="container mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <h3 className="fw-bold pb-3 pt-2">
                You will recieve your business plan by email within the next 24
                hours
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
        ""
      )}
    </Loader>
  );
};

export default PaymentCallback;
