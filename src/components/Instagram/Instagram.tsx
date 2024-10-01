import React, {useEffect, useRef} from 'react';
import '../Instagram/instagram.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram} from '@fortawesome/free-brands-svg-icons'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Instagram = () => {
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
    <div>

        <h1 className='instagram-name'>Instagram Post</h1>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={4.5}  
      centeredSlides={true} 
      loop={true}
      autoplay={{ 
        delay: 3000, 
        disableOnInteraction: false  
      }} 
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4.5,
        },
      }}
      onSlideChange={() => console.log('slide change')}
    >
      <div className='instagram-swipper'>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_1.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>

        </SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_2.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_3.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_4.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_5.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_1.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_2.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_3.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_4.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
        <SwiperSlide><img className='instagram-swipper' src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_4_5.jpg" alt="" />
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='insta-icon' icon={faInstagram} /></a>
</SwiperSlide>
      </div>
    </Swiper>
    </div>
    
    </div>
  );

}

export default Instagram;
