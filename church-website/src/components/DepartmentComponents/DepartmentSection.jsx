// import bookImg from "/assets/Images/book.png";
// import pastorImg from "/assets/Images/pastor.jpg";
// i will make this a reusable component
const DepartmentSection = (props) => {
  return (
    <div className="container-fluid bg-secondary-subtle py-5 px-4 my-5">
      <div className="container">
        <div className="row">

        

          {/* Column */}
          <div className="col-md-12">
            <div className="row mb-4 align-items-center">
              <div className="col-md-4">
                <hr />
              </div>
              <div className="col-md-4 text-center fw-semibold text-uppercase">
                {/* Huperballó Megethos */}
                {props.content.pageTitle}
              </div>
              <div className="col-md-4">
                <hr />
              </div>
            </div>

            <div className="row align-items-start">
              <div className="col-sm-5 mb-3 mb-sm-0">
                <img
                  src={props.content.textImage}
                  alt="Rev. Chris Okotie"
                  className="img-fluid rounded shadow-sm"
                />
                <div className="fw-bold mt-2">
                  {/* Rev. Chris Okotie */}
                  {props.content.textTitle}

                </div>
                <small className="text-muted">
                  {/* Pastor, Household of God Church */}
                  {props.content.textSubtitle}
                </small>
              </div>
              <div className="col-sm-7">
                <p>
                  {/* And what is the exceeding greatness of his power to us-ward who
                  believe, according to the working of his mighty power, Which he
                  wrought in Christ, when he raised him from the dead, and set
                  him at his own right hand in the heavenly places, Far above all
                  principality, and power... */}
                  {props.content.textContent}
                </p>
                <button className="btn btn-dark text-warning">{ props.content.buttonText}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentSection;
