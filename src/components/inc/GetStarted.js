import { Link } from "react-router-dom";
import useFetch from "use-http";
import Loader from "./Loader";
import Swal from "sweetalert2";
import { useContext } from "react";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import FallbackUI from "./FallbackUI";
import { WarningPopUpModal } from "./WarningPopUpModal";

function GetStarted({ serverError }) {
  const { user } = useContext(GlobalContext);

  const options = {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  };

  const {
    get: getDemo,
    loading: demo_loading,
    error: demo_error,
    response: demo_response,
  } = useFetch(`/get_demo`, options);

  // Download BP demo API
  const downloadDemo = async (e) => {
    e.preventDefault();
    await getDemo();
    if (demo_response.ok) {
      const bp = await demo_response.blob();
      let url = window.URL.createObjectURL(bp);
      let demo = document.createElement("a");
      demo.href = url;
      demo.download = "Xpovi_Business_Plan_Demo";
      demo.click();
    }
  };
  if (demo_error) {
    WarningPopUpModal(
      "Sorry for the inconvenience! <br/>" +
        "There was a problem fetching your demo. Please try again later!"
    );
  }
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <Loader loading={demo_loading}>
      <div>
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <img
                  src="https://xpovi-media.s3.eu-central-1.amazonaws.com/home+page/home_page_banner.png"
                  className="img-fluid"
                  alt="..."
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mx-auto section">
                {user.is_authenticated ? (
                  <Link to="/business-plan-name" className="d-grid link">
                    <button
                      type="button"
                      className="btn btn-danger bg-red btn-lg rounded-pill"
                    >
                      Create or Continue Business Plan
                    </button>
                  </Link>
                ) : (
                  <Link to={process.env.REACT_APP_ENVIRONMENT === 'production' ?"/register" : "login"} className="d-grid link">
                    <button
                      type="button"
                      className="btn btn-danger bg-red btn-lg rounded-pill"
                    >
                      Create Business Plan
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 d-grid mx-auto">
                <button
                  type="button"
                  className="btn btn-danger bg-red btn-lg rounded-pill"
                  onClick={downloadDemo}
                >
                  Download Business Plan Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Loader>
  );
}

export default GetStarted;
