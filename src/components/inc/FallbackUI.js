import React from "react";
import AuthenticationNavbar from "./AuthenticationNavbar";

const FallbackUI = (props) => {
  return (
    <div>
      <div>
        <AuthenticationNavbar />
      </div>
      <div class="container py-4 ">
        <div class="p-4 mb-4 fallback-ui rounded-3">
          <div class="container-fluid p-4 glass py-5">
            <h1 style={{ color: "#ee2830" }} class="display-5 fw-bold">
              Sorry for the inconvenience
            </h1>

            {props.error === "Server Error" && (
              <p class="col-md-8 fs-4">
                Due to a technical problem, Xpovi is temporarily unavailable. We
                are fixing the problem right now. <br /> Please check back in a
                few minutes - We'll be up and running in no time!
              </p>
            )}

            {props.error === "Unhandled Error" && (
              <p class="col-md-8 fs-4">
                A problem has occured. We have been notified of the issue and we
                are currently working on it. Thank you for your patience.
                <br /> Please check back in a few minutes!
              </p>
            )}

            <button
              style={{ color: "white" }}
              class="btn bg-red btn-lg"
              type="button"
              onClick={() => {
                window.location.reload();
              }}
            >
              Click to Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackUI;
