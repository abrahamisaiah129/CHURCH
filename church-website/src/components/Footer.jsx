import React from "react";
import logo from "/assets/Images/hog-logo.png";
import hhLogo from "/assets/Images/footer-hh-logo.png";
import ca1 from "/assets/Images/ca1.png";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <img src={logo} alt="Logo" height="60" />
          </div>
          <div className="col-md-6">
            <form className="input-group">
              <span className="input-group-text bg-white border-0 rounded-start">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control border-0"
                placeholder=" info@householdofgodchurch.org"
              />
              <button className="btn btn-dark text-warning btn-outline-warning rounded-end" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="text-white" />

        <div className="row text-start mt-4">
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">ADDRESS</h6>
            <p>
              Plot 4 HouseHold of God Street,<br />
              Off Kudirat Abiola Way, Clay Bus-Stop,<br />
              Ikeja, Lagos - Nigeria
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">#OKOTIESLETTER</h6>
            <p>Get Okotie’s Letter now for free</p>
            <a
              href="media/okoties-letter.pdf"
              download="okoties-letter.pdf"
              className="btn btn-dark text-warning btn-outline-warning w-100 d-flex align-items-center justify-content-center"
            >
              <i className="fas fa-download me-2"></i> Download
            </a>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">FOLLOW US</h6>
            <p>Follow us on our social Media</p>
            <div className="d-flex gap-3">
              <i className="fab fa-youtube"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">INFO</h6>
            <div className="d-flex align-items-center gap-2 mb-2">
              <img src={hhLogo} alt="Prayer" width={40} height={40} />
              <div>
                <div>Prayer Meeting</div>
                <small>6pm - 7pm Weekdays</small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <img src={hhLogo} alt="Proclaimers" width={40} height={40} />
              <div>
                <div>Proclaimers</div>
                <small>9pm Saturdays</small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={ca1} alt="Apokalupsis" width={40} height={40}  />
              <div>
                <div>Apokalupsis</div>
                <small>7am Sundays on Raypower 100.5fm</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;