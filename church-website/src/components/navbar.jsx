import React, { useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const navbarCollapse = document.getElementById('navbarNav');

    // Define the event handler function once to ensure correct removal
    const collapseNavbar = () => {
      // Check if the navbar is currently open (has the 'show' class)
      if (navbarCollapse.classList.contains('show')) {
        // Create a new Bootstrap Collapse instance and hide it
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    };

    // Attach the event listener to each nav link
    navLinks.forEach(link => {
      link.addEventListener('click', collapseNavbar);
    });

    // Cleanup function: This runs when the component unmounts
    // or before the effect re-runs (though with an empty dependency array, it runs once)
    return () => {
      // Remove the event listener to prevent memory leaks
      navLinks.forEach(link => {
        link.removeEventListener('click', collapseNavbar);
      });
    };
  }, []); // Empty dependency array means this effect runs only once on mount and cleanup on unmount

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const queenEstherYears = ["2013", "2014", "2015", "2016", "2017"];
  const graceYears = ["2014", "2015", "2016", "2017", "2018", "2019"];

  // Helper function to generate dropdowns for events with months
  const eventWithMonths = (title) => (
    <li className="dropend">
      <span className="dropdown-item dropdown-toggle text-warning" data-bs-toggle="dropdown">
        {title}
      </span>
      <ul className="dropdown-menu bg-dark">
        {months.map((month, i) => (
          <li key={i}>
            <Link className="dropdown-item text-light" to={`/events/${title.toLowerCase().replace(/\s/g, '-')}/${month.toLowerCase()}`}>
              {/* This link will navigate to a page where data will be fetched based on eventName and month */}
              {month}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );

  // Helper function to generate dropdowns for events with years
  const eventWithYears = (title, years) => (
    <li className="dropend">
      <span className="dropdown-item dropdown-toggle text-warning" data-bs-toggle="dropdown">
        {title}
      </span>
      <ul className="dropdown-menu bg-dark">
        {years.map((year, i) => (
          <li key={i}>
            <Link className="dropdown-item text-light" to={`/events/${title.toLowerCase().replace(/\s/g, '-')}/${year}`}>
              {/* This link will navigate to a page where data will be fetched based on eventName and year */}
              {`${title} ${year}`}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/assets/Images/hog-logo.png" alt="Logo" height="40" />
        </Link>
        <button
          className="navbar-toggler" 
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">HOME</Link>
            </li>

            {/* ABOUT Section */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">ABOUT</span>
              <ul className="dropdown-menu bg-black">
                <li><Link className="dropdown-item text-warning" to="/about/church">OUR CHURCH</Link></li>
                <li><Link className="dropdown-item text-warning" to="/about/pastor">OUR PASTOR</Link></li>
              </ul>
            </li>

            {/* DEPARTMENTS Section */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">DEPARTMENTS</span>
              <ul className="dropdown-menu bg-black">
                {[
                  "Children's Department", "Singles Department", "Works Department", "Publication Department",
                  "Evangelism Department", "Holy Police", "Technical Crew", "Villa Sanitation", "Pastoral Care",
                  "Missions Department", "Protocol Department", "Benevolence Department"
                ].map((dept, index) => (
                  <li key={index}>
                    <Link className="dropdown-item text-warning" to={`/departments/${dept.toLowerCase().replace(/\s/g, '-').replace(/'/g, '')}`}>
                      {dept}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* EVENTS Section */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">EVENTS</span>
              <ul className="dropdown-menu bg-black">
                {eventWithMonths("Fellowship Sunday")}
                {eventWithMonths("Christmas Carol Competition")}
                {eventWithMonths("Halleluyah Party")}
                {eventWithMonths("Baby Dedication")}
                {eventWithMonths("Weddings")}
                {eventWithMonths("Christmas Lights")}

                
                {eventWithYears("Queen Esther", queenEstherYears)}
                {eventWithYears("Grace", graceYears)}
                
              </ul>
            </li>

            {/* MEDIA Section */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">MEDIA</span>
              <ul className="dropdown-menu bg-black">
                <li className="dropend">
                  <span className="dropdown-item dropdown-toggle text-warning" data-bs-toggle="dropdown">Gallery</span>
                  <ul className="dropdown-menu bg-dark">
                    <li><Link className="dropdown-item text-light" to="/media/churchs-gallery">Church's Gallery</Link></li>
                    <li><Link className="dropdown-item text-light" to="/media/pastors-gallery">Pastor's Gallery</Link></li>
                  </ul>
                </li>
                <li><Link className="dropdown-item text-warning" to="/media/musics-gallery">Music</Link></li>
              </ul>
            </li>

            {/* CONTACT US Section (scroll to view) */}
            <li className="nav-item">
              <Link className="nav-link" to="/#contact-section"
                onClick={() => {
                  if (location.hash === '#contact-section') {
                    const element = document.getElementById('contact-section');
                    if (element) {
                      element.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
              >CONTACT US</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
