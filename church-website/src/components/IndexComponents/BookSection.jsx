import bookImg from "/assets/Images/book.png";
import pastorImg from "/assets/Images/pastor.jpg";

const BookSection = () => {
  return (
    <div className="container-fluid bg-secondary-subtle py-5 px-4 my-5">
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h3 className="fw-bold">THE LAST OUTCAST</h3>
            <p>
              Who is the Last Outcast? | What is the mystery of iniquity?<br />
              Who is the antichrist? | What is the religion of the antichrist?<br />
              How will the antichrist enter our world?<br />
              Find out in <span className="fw-bold">THE LAST OUTCAST</span>
            </p>
            <img
              src={bookImg}
              alt="The Last Outcast Book"
              className="img-fluid rounded shadow-sm"
            />
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="row mb-4 align-items-center">
              <div className="col-md-4">
                <hr />
              </div>
              <div className="col-md-4 text-center fw-semibold text-uppercase">
                Huperballó Megethos
              </div>
              <div className="col-md-4">
                <hr />
              </div>
            </div>

            <div className="row align-items-start">
              <div className="col-sm-5 mb-3 mb-sm-0">
                <img
                  src={pastorImg}
                  alt="Rev. Chris Okotie"
                  className="img-fluid rounded shadow-sm"
                />
                <div className="fw-bold mt-2">Rev. Chris Okotie</div>
                <small className="text-muted">Pastor, Household of God Church</small>
              </div>
              <div className="col-sm-7">
                <p>
                  And what is the exceeding greatness of his power to us-ward who
                  believe, according to the working of his mighty power, Which he
                  wrought in Christ, when he raised him from the dead, and set
                  him at his own right hand in the heavenly places, Far above all
                  principality, and power...
                </p>
                <button className="btn btn-dark text-warning">See More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSection;
