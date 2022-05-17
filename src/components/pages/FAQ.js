import React, { useState, useEffect } from "react";
import { useFetch } from "use-http";
import Loader from "../inc/Loader";
import AuthenticationNavbar from "../inc/AuthenticationNavbar";
import AccordionComponent from "../inc/Accordion";
import useGaTracker from "../useGaTracker";
import FallbackUI from "../inc/FallbackUI";

const FAQ = ({ serverError }) => {
  useGaTracker();
  const {
    get: getFAQ,
    loading: faq_loading,
    error: faq_error,
  } = useFetch(`/faq`);
  const [faq_data, setFAQData] = useState(null);

  useEffect(async () => {
    // Api call to fetch faq on initial render

    const get_faq_response = await getFAQ();
    if (get_faq_response && get_faq_response.data) {
      setFAQData(get_faq_response.data);
    }
  }, []);

  if (faq_error) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <>
      <Loader loading={faq_loading}>
        <AuthenticationNavbar />
        <div className="text-center">
          <h1>FAQ</h1>
          <div className="underline mx-auto"></div>
        </div>
        {faq_data && (
          <div className="container mt-5">
            <div className="container">
              {faq_data.map((faq) => {
                return <AccordionComponent faq={faq} />;
              })}
            </div>
          </div>
        )}
      </Loader>
    </>
  );
};

export default FAQ;
