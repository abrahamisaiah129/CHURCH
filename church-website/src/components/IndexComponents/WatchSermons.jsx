function WatchSermons() {
  const sermonData = [1, 2, 3, 4]; // Example data

  return (
    <div className="container-fluid bg-secondary-subtle py-5 px-4 my-5">
      <h2 className="text-center mb-5">WATCH SERMONS</h2>

      <div className="row g-4">
        {sermonData.map((_, idx) => (
          <div className="col-12 col-sm-6 col-md-3" key={idx}>
            <div className="card h-100 shadow-sm">
              <img
                src="assets/Images/ca1.png"
                className="card-img-top"
                alt="Sermon"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">What is your purpose?</h5>
                  <p className="text-muted">Pastor Chris Okotie</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="mb-0">
                    <i className="fas fa-calendar-alt me-1"></i> 31st Mar, 2025
                  </p>
                  <div>
                    <i className="fas text-primary fa-bookmark me-2"></i>
                    <i className="fas text-primary fa-share"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-5">
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link bg-dark text-warning border-dark" href="#">
                <i className="fas fa-chevron-left"></i>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link bg-dark text-warning border-dark" href="#">1</a>
            </li>
            <li className="page-item">
              <a className="page-link bg-dark text-warning border-dark" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link bg-dark text-warning border-dark" href="#">3</a>
            </li>
            <li className="page-item">
              <span className="page-link bg-dark text-warning border-dark">...</span>
            </li>
            <li className="page-item">
              <a className="page-link bg-dark text-warning border-dark" href="#">14</a>
            </li>
            <li className="page-item">
              <a className="page-link bg-dark text-warning border-dark" href="#">15</a>
            </li>
            <li className="page-item">
              <a className="page-link bg-dark text-warning border-dark" href="#">
                <i className="fas fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default WatchSermons;
