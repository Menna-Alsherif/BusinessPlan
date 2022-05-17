import { Link } from "react-router-dom";

function Footer() {
  const current_date = new Date();
  let current_year = current_date.getFullYear();
  return (
    <div id="contact">
      <footer className="bg-c-dark">
        <div className="container">
          <div className="row text-white">
            <div className="col-md-4">
              <h3 className="row pt-3 color-red">Help Center</h3>
              <Link to="/faq" className="row navbar-brand footer_link">
                FAQ
              </Link>
              <Link to="#" className="row navbar-brand footer_link">
                Terms and services
              </Link>
            </div>
            <div className="col-md-4">
              <h3 className="row pt-3 color-red">Contact Info</h3>
              <h5 className="row pt-2">info@xpovi.com</h5>
              <h5 className="row pt-2">Centro mall, New Cairo, Cairo, Egypt</h5>
            </div>
            <div className="col-md-4 text-center justify-center">
              <div className="pt-3">
                <img
                  src="https://xpovi-media.s3.eu-central-1.amazonaws.com/xpovi+logos/Xpovi_logo-06.png"
                  alt="..."
                  width="200"
                />
              </div>
              <span>
                <a
                  className="navbar-brand"
                  href="https://www.twitter.com/Xpovi_solutions/"
                >
                  <img
                    src="https://xpovi-media.s3.eu-central-1.amazonaws.com/social-media-icons/twitter.png"
                    alt="..."
                    width="30"
                  />
                </a>
              </span>
              <span>
                <a
                  className="navbar-brand"
                  href="https://www.facebook.com/Xpovi.solutions/"
                >
                  <img
                    src="https://xpovi-media.s3.eu-central-1.amazonaws.com/social-media-icons/facebook.png"
                    alt="..."
                    width="30"
                  />
                </a>
              </span>
              <span>
                <a
                  className="navbar-brand"
                  href="https://www.instagram.com/xpovi.solutions/"
                >
                  <img
                    src="https://xpovi-media.s3.eu-central-1.amazonaws.com/social-media-icons/instagram.png"
                    alt="..."
                    width="30"
                  />
                </a>
              </span>
              <span>
                <a
                  className="navbar-brand"
                  href="https://www.linkedin.com/company/xpovi/"
                >
                  <img
                    src="https://xpovi-media.s3.eu-central-1.amazonaws.com/social-media-icons/linkedin.png"
                    alt="..."
                    width="30"
                  />
                </a>
              </span>
            </div>
            <div className="row text-center footer-copyright">
              <h5>&copy; 2021-{current_year} Xpovi. All Rights Reserved</h5>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
