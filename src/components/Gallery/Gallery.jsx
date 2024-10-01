
import '../Gallery/gallery.css'
import React, { useEffect, useRef } from 'react';


const Gallery = () => {
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
      <h1 className='gallery'>Recent Gallery</h1>

      <div className="image-grid hover13">
        <div className="image-item tall">
          <img src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_3_1.jpg" alt="Scenery 1" />
        </div>
        <div className="image-item">
          <img src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_3_2.jpg" alt="Scenery 3" />
        </div>
        <div className="image-item wide">
          <img src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_3_3.jpg" alt="Scenery 2" />
        </div>
        <div className="image-item">
          <img src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_3_4.jpg" alt="Scenery 4" />
        </div>
        <div className="image-item">
          <img src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_3_5.jpg" alt="Scenery 5" />
        </div>
        <div className="image-item">
          <img src="https://html.themeholy.com/tourm/demo/assets/img/gallery/gallery_3_6.jpg" alt="Scenery 6" />
        </div>
      </div>
    </div>
  );

}

export default Gallery