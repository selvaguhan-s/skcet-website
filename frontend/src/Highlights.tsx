
import React, { useEffect, useState } from 'react'

import highlight1 from './assets/highlights1.png'
import highlight2 from './assets/highlights2.png'
import highlight3 from './assets/highlights3.png'

const slides = [
  {
    image: highlight1,
    text: "SKCET received ‘UYIR Best Volunteering College Award’ for Exemplary Contributions to Road Safety Awareness"
  },
  {
    image: highlight2,
    text: "Strengthening Industry-Academia Partnership : MoU between Sri Krishna College of Engineering and Technology and L.G. Balakrishnan & Bros Ltd. (LGB), Coimbatore"
  },
  {
    image: highlight3,
    text: "World Space Week Celebrations 2026 | ISRO Space Expo @ SKCET"
  }
]

function Highlights() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  const activeSlide = slides[activeIndex]

  return (
    <section className="highlights-section container-fluid">
      <div className="highlights-layout">

        <div className="highlight-left">
          <div className="highlight-image-wrapper">
            <img
              src={activeSlide.image}
              className="highlight-image"
              alt="SKCET highlight"
            />

            <div className="highlight-card">
              {activeSlide.text}
            </div>
          </div>

          <div className="highlight-indicators">
            {slides.map((slide, index) => (
              <button
                key={index}
                type="button"
                className={`indicator ${
                  activeIndex === index ? 'active' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show highlight ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <div className="highlight-right">
          <h1 className="highlights-title">Highlights</h1>
        </div>

      </div>

      <button
        className="back-to-top"
        type="button"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        aria-label="Back to top"
      >
        <span className="arrow-up" />
      </button>
    </section>
  )
}

export default Highlights
