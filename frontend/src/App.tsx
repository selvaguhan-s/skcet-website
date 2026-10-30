import React, { useState } from 'react'
import NavBar1 from './NavBar1'
import Highlights from './Highlights'
import Welcome from './Welcome'
import NewsAndEvents from './NewsAndEvents'
import PageEnd from './PageEnd'
import EnquiryFrom from './EnquiryFrom'

function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)

  return (
    <div>
      <section className="hero-section">
        <NavBar1 />
      </section>

      <div className="first d-flex align-items-center vh-100"></div>

      <Highlights />
      <Welcome />
      <NewsAndEvents />

      <div className="years d-flex align-items-center vh-100"></div>

      <div className="Others">
        <div>Sri Krishna College of Technology</div>
        <span>|</span>
        <div>Sri Krishna Arts And Science College</div>
        <span>|</span>
        <div>Sri Krishna Adithya College of Arts and Science</div>
        <span>|</span>
        <div>Sri Krishna Polytechnic College</div>
      </div>

      <PageEnd />

      <div className="floating-buttons">
        <button
          type="button"
          className="enquire-now"
          onClick={() => setIsEnquiryOpen(true)}
        >
          ENQUIRE NOW
        </button>

        <button
          type="button"
          className="back-to-top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          aria-label="Back to top"
        >
          <span className="arrow-up"></span>
        </button>
      </div>

      <EnquiryFrom
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  )
}

export default App