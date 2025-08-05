import React, { useState, useEffect } from 'react';
import { Carousel as BootstrapCarousel } from 'bootstrap';
import '../DepartmentComponents/DepartmentCarousel.css';

const DepartmentCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  let slides = props.slides;//for the slides data
  useEffect(() => {
    const carouselElement = document.getElementById('churchCarousel');
    if (!carouselElement) return;

    const carousel = new BootstrapCarousel(carouselElement, {
      interval: 5000,
      ride: 'carousel',
    });

    const handleSlide = (event) => {
      setActiveIndex(event.to);
    };

    carouselElement.addEventListener('slid.bs.carousel', handleSlide);

    return () => {
      carouselElement.removeEventListener('slid.bs.carousel', handleSlide);
      carousel.dispose();
    };
  }, []);

  const handleIndicatorClick = (index) => {
    const carouselElement = document.getElementById('departmentCarousel');
    const carousel = BootstrapCarousel.getInstance(carouselElement);
    if (carousel) {
      carousel.to(index);
    }
  };

 

  return (
    <div className="hero-section  pt-3">
      <div id="churchCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-overlay">
                <p>{slide.pretitle}</p>
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
                <p className="service-time">
                  <i className="fa-regular fa-calendar-days"></i> {slide.service}
                </p>
                <a href="#" className="watch-btn">
                  <i className="fa fa-video"></i> Watch Live
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#churchCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#churchCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Custom indicators */}
        <div className="custom-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#churchCarousel"
              data-bs-slide-to={index}
              className={`custom-indicator ${index === activeIndex ? 'active' : ''}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleIndicatorClick(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentCarousel;