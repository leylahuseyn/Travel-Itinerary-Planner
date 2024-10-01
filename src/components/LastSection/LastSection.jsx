import React, {useEffect, useRef}from 'react'
import '../LastSection/lastSection.css'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className='lastSection'>
    <Swiper
    
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={7}
      speed={1000} 
      autoplay={{ 
        delay: 5000,  
        disableOnInteraction: false 
      }}
    >
        <div className="row">
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_1.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_2.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_6.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_5.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_8.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_2.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_3.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_4.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_5.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_1.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_2.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_3.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_4.svg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slider-imgs'>
            <img src="https://html.themeholy.com/tourm/demo/assets/img/brand/brand_1_5.svg" alt="" />
        </div>
      </SwiperSlide>
        </div>
    </Swiper>

    </div>
      
      
    </div>
  );
};
1