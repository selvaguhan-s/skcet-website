
import { useEffect, useState } from 'react'
import skcetLogo from './assets/skcet main.png'

function NavBar1() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`NavBar ${isScrolled ? 'NavBar-scrolled' : ''}`}>
      <div className="NavBar-inner">

        {/* SKCET Logo */}
        <img
          className="skcet"
          src={skcetLogo}
          alt="SKCET Logo"
        />

        {/* Navigation Links */}
        <div className="Navitems">

          {/* First Row */}
          <div className="Navbar1">
            <div>About Us</div>
            <div>Accreditations</div>
            <div>Rankings</div>
            <div>IQAC</div>
            <div>Quick Links</div>
            <div>Alumni</div>
            <div>Online Payment</div>
          </div>

          {/* Second Row */}
          <div className="Navbar2">
            <div>Academics</div>
            <div>Admissions</div>
            <div>Student Life</div>
            <div>Innovations</div>
            <div>Research</div>
            <div>Exams</div>
            <div>Placement</div>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default NavBar1
