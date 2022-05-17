import { Link } from "react-router-dom";

function AuthenticationNavbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-c-dark fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="https://xpovi-media.s3.eu-central-1.amazonaws.com/xpovi+logos/Xpovi_logo-06.png" alt="..." width="100" />
          </Link>
          <form className="ms-auto mb-2 mb-lg-0 d-flex rounded"></form>
        </div>
      </nav>
    </div>
  );
}

export default AuthenticationNavbar;
