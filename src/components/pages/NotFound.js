import AuthenticationNavbar from "../inc/AuthenticationNavbar";
import useGaTracker from "../useGaTracker";

function PageNotFound(props) {
  useGaTracker();
  return (
    <div>
      <div>
        <AuthenticationNavbar />
      </div>
      <section className="section">
        <div className="container">
          <div className="shadow rounded text-center">
            <h1>{props.error ? props.error : "404 PAGE NOT FOUND"}</h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageNotFound;
