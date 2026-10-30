
import React from 'react'
import skcetLogo from './assets/skcet main.png'

const mainLinksLeft = [
  'About Us',
  'Admissions',
  'Student Life',
  'Research',
  'Careers',
]

const mainLinksRight = [
  'Academics',
  'Alumni',
  'Placement',
  'Exams',
  'Fees Structure',
]

const accreditationLinks = [
  'NAAC',
  'IQAC',
  'NBA',
  'NIRF',
  'SIRO',
  'NIRF Innovation',
]

const quickLinksLeft = [
  'SKCET at a Glance',
  'UGC feedback Portal',
  'Caste Discrimination Complaint Cell',
  'Grievance Registration Portal',
  'Curriculum Feedback',
  'UGC Undertaking',
  'SKCET-Alma Connect',
  'Skill Development',
  'RTI Declaration',
  'Prospectus/Brochure',
]

const quickLinksRight = [
  'Virtual Labs',
  'Eminent Personalities',
  'Best Practices',
  'Institutional Distinctiveness',
  'Internal Compliance Committee (ICC)',
  'AICTE feedback mechanism',
  'Organogram',
  'Audit Statements',
  'AICTE Mandatory Disclosure',
]

function PageEnd() {
  return (
    <footer className="pageend-footer">

      {/* Contact information */}
      <div className="pageend-contact">
        <div className="pageend-contact-inner">

          <div className="pageend-logo">
            <img src={skcetLogo} alt="Sri Krishna College of Engineering and Technology" />
          </div>

          <div className="pageend-contact-item pageend-address">
            <span className="pageend-icon">📍</span>
            <p>
              Kuniamuthur, Coimbatore,
              <br />
              Tamil Nadu - 641008
            </p>
          </div>

          <div className="pageend-contact-item pageend-phone">
            <span className="pageend-icon">📞</span>
            <div>
              <p>0422-267 8001(7 Lines)</p>
              <p>0422-267 8012</p>
            </div>
          </div>

          <div className="pageend-contact-item pageend-email">
            <span className="pageend-icon">📩</span>
            <div>
              <p>principal@skcet.ac.in</p>
              <p>placement@skcet.ac.in</p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer navigation */}
      <div className="pageend-links">
        <div className="pageend-links-inner">

          <div className="pageend-main-group">
            <h3>Main Links</h3>

            <div className="pageend-main-columns">
              <ul>
                {mainLinksLeft.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>

              <ul>
                {mainLinksRight.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pageend-accreditation-group">
            <h3>Accreditations</h3>

            <ul>
              {accreditationLinks.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pageend-quick-group">
            <h3>Quick Links</h3>

            <div className="pageend-quick-columns">
              <ul>
                {quickLinksLeft.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>

              <ul>
                {quickLinksRight.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default PageEnd
