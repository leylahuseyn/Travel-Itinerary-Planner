import React, { useEffect, useRef } from 'react'
import '../Client/client.css'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, {
      threshold: 0.1
    });

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) observer.unobserve(sectionElement);
    };
  }, []);

  return (
    <div ref={sectionRef} className="reveal">
      <div className='swipper-container'>
        <h1 className='feedback'>Our Clients Feedback</h1>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          speed={1000}
          pagination
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          className='swipper'
        >
          <SwiperSlide >
            <div className="testimonial-card  center-slide">
              <div className="testimonial-header">
                <img
                  src="https://html.themeholy.com/tourm/demo/assets/img/testimonial/testi_1_1.jpg"
                  alt="User Avatar"
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Andrew Simon</h4>
                  <h3 className="testimonial-role">Traveller</h3>
                </div>

              </div>
              <p className="testimonial-text">
                “The home boasts sleek, contemporary architecture with clean lines and expansive windows, allowing natural light to flood the interiors. It incorporates passive design principles.”
              </p>

            </div></SwiperSlide>
          <SwiperSlide><div className="testimonial-card center-slide">
            <div className="testimonial-header">
              <img
                src="https://html.themeholy.com/tourm/demo/assets/img/testimonial/testi_1_2.jpg"
                alt="User Avatar"
                className="testimonial-avatar"
              />
              <div className="testimonial-info">
                <h4 className="testimonial-name">Michael Smith</h4>
                <h3 className="testimonial-role">Traveller</h3>
              </div>

            </div>
            <p className="testimonial-text">
              "The residence exudes a modern minimalist aesthetic, with spacious open-plan living areas and seamless indoor-outdoor integration. The design prioritizes energy efficiency and sustainability."  </p>

          </div></SwiperSlide>
          <SwiperSlide><div className="testimonial-card center-slide">
            <div className="testimonial-header">
              <img
                src="https://html.themeholy.com/tourm/demo/assets/img/testimonial/testi_3_6.png"
                alt="User Avatar"
                className="testimonial-avatar"
              />
              <div className="testimonial-info">
                <h4 className="testimonial-name">Sarah Davis</h4>
                <h3 className="testimonial-role">Traveller</h3>
              </div>

            </div>
            <p className="testimonial-text">
              "With floor-to-ceiling glass walls, the house captures breathtaking panoramic views, while also allowing ample daylight to penetrate every corner. The layout is designed to maximize both comfort and functionality."</p>

          </div></SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-card center-slide">
              <div className="testimonial-header">
                <img
                  src="https://html.themeholy.com/tourm/demo/assets/img/testimonial/testi_3_3.png"
                  alt="User Avatar"
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Emily Johnson</h4>
                  <h3 className="testimonial-role">Traveller</h3>
                </div>

              </div>
              <p className="testimonial-text">
                "This architectural gem features clean, angular lines and a neutral color palette, creating a calm and serene atmosphere. The space is optimized for natural ventilation and solar gain."</p>

            </div></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );

};