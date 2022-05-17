import { HashLink as Link } from "react-router-hash-link";

function CheckoutNavbar(props) {
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
            <form className="ms-auto mb-2 mb-lg-0 d-flex"></form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default CheckoutNavbar;
