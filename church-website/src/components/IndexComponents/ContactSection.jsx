import React from "react";

const ContactSection = () => {
  return (
    <div className="contact-section py-5" id="contact-section">
      <br></br>
      <div className="container">
        <div className="row g-5">
          {/* Left Column - Contact Info */}
          <div className="col-lg-6">
            <h3 className="fw-bold">SEND US A MESSAGE</h3>
            <p className="text-muted">
              Questions, comments, or suggestions? Simply fill in the form and we’ll be in
              touch shortly.
            </p>
            <div>
              <p>
                <i className="fas fa-location-dot me-2"></i>
                Plot 4 HouseHold of God Street, Off Kudirat Abiola Way, Clay Bus–Stop, Ikeja, Lagos – Nigeria
              </p>
              <p>
                <i className="fas fa-envelope me-2"></i>
                info@householdofgodchurch.org
              </p>
              <p>
                <i className="fas fa-phone me-2"></i>
                +234 813 6633 494, +234 702 6828 318
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="col-lg-6">
            <div className="bg-secondary-subtle p-4 rounded shadow-sm">
              <form>
                <h4 className="fw-semibold">CONTACT FORM</h4>
                <p>Kindly fill the form below to reach out to us</p>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Full Name" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email Address" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subject" />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="4" placeholder="Write your message here..."></textarea>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-dark text-warning">
                    <i className="fas fa-paper-plane me-2"></i> Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
