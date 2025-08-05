function Programmes() {
  const events = [
    { date: '01', month: 'February', title: 'Household is 32!', color: '#f15c5c' },
    { date: '12', month: 'September', title: 'Wednesday Service', color: '#1a0033' },
    { date: '01', month: 'October', title: 'Nigeria’s Independence', color: '#ffaa00' },
    { date: '09', month: 'September', title: 'Sunday Service', color: '#4d1c1c' }
  ];

  return (
    <div className="container my-5 text-center">
      <h2 className="fw-bold mb-4">PROGRAMMES</h2>
      <div className="row g-4 justify-content-center">
        {events.map((event, idx) => (
          <div className="col-md-3 col-sm-6" key={idx}>
            <div className="p-4 text-white rounded" style={{ backgroundColor: event.color }}>
              <i className="fas fa-calendar-alt fs-3"></i>
              <div className="fs-1 fw-bold">{event.date}</div>
              <div className="mb-2">{event.month}</div>
              <div className="fw-semibold">{event.title}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-dark text-warning mt-4">See More</button>
    </div>
  );
}

export default Programmes;
