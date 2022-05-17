import { Link } from "react-router-dom";
import {GlobalContext} from "../../QuestionsContext/QuestionsGlobalState";
import {useContext} from 'react';

function Services() {
  const {user} = useContext(GlobalContext);
  return (
    <div id="services">
      <section className="section bg-light">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="main-heading">Our Services</h3>
            <div className="underline mx-auto"></div>
          </div>
        </div>
        <div className="container">
          <div
            id="carouselExampleCaptions"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active ">
                <img
                  src="https://xpovi-media.s3.eu-central-1.amazonaws.com/home+page/business_plan_banner.png"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-md-block">
                  {user.is_authenticated? (
                    <Link to="/business-plan-name" className="d-grid link">
                      <button
                        type="button"
                        className="btn btn-danger bg-red btn-lg rounded-pill"
                      >
                        Business Plan
                      </button>
                    </Link>
                  ) : (
                    <Link to={process.env.REACT_APP_ENVIRONMENT === 'production' ? "/register": "/login"} className="d-grid link">
                      <button
                        type="button"
                        className="btn btn-danger bg-red btn-lg rounded-pill"
                      >
                        Business Plan
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://xpovi-media.s3.eu-central-1.amazonaws.com/home+page/coming_soon.png" className="d-block w-100" alt="..." />
                <div className="carousel-caption d-md-block">
                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-danger bg-red btn-lg rounded-pill"
                      disabled
                    >
                      coming soon...
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
