import { HashLink as Link } from "react-router-hash-link";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import { useContext } from "react";

function HomeNavbar(props) {
  const { user, userLogout } = useContext(GlobalContext);

  // Clear localStorage and answers on logout
  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    userLogout();
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-c-dark fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="https://xpovi-media.s3.eu-central-1.amazonaws.com/xpovi+logos/Xpovi_logo-06.png" alt="..." width="100" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item nav-c-item dropdown">
                <Link
                  to="#services"
                  className="nav-link dropdown-toggle active"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  OUR SERVICES
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="#services" className="dropdown-item ">
                      Business Plan
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item nav-c-item">
                <Link to="#pricing" className="nav-link active">
                  PRICING
                </Link>
              </li>
              <li className="nav-item nav-c-item">
                <Link to="#about" className="nav-link active">
                  WHO WE ARE
                </Link>
              </li>
              <li className="nav-item nav-c-item">
                <Link to="#contact" className="nav-link active">
                  CONTACT US
                </Link>
              </li>
            </ul>
            {user.is_authenticated ? (
              <form className="ms-auto mb-2 mb-lg-0 d-flex">
                <h4 className="nav-link color-red">
                  Hello {user.username}
                </h4>
                <div className="nav-link active">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill"
                    onClick={logOut}
                  >
                    Log out
                  </button>
                </div>
                <Link to="/business-plan-name" className="nav-link active">
                  <button
                    type="button"
                    className="btn btn-danger bg-red rounded-pill"
                  >
                    Get Started
                  </button>
                </Link>
              </form>
            ) : (
              <form className="ms-auto mb-2 mb-lg-0 d-flex">
                <Link to="/login" className="nav-link active">
                  <button type="button" className="btn btn-light rounded-pill">
                    Log In
                  </button>
                </Link>
                <Link to={process.env.REACT_APP_ENVIRONMENT === "production" ? "/register" : "/login"} className="nav-link active">
                  <button
                    type="button"
                    className="btn btn-danger bg-red rounded-pill"
                  >
                    Get Started
                  </button>
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HomeNavbar;
