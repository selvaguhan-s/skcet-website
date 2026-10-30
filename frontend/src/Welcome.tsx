
import React, { useEffect, useRef, useState } from 'react'
import badgeImage from './assets/1998.png'

const quickLinks = [
  { icon: '♙', title: 'Entrepreneurship Development Cell' },
  { icon: '✣', title: 'Departments' },
  { icon: '♧', title: 'Cut-Off Marks' },
  { icon: '▣', title: 'Stadium' },
  { icon: '♙', title: 'Sports' },
  { icon: '✚', title: 'Health Centre' },
  { icon: '✿', title: 'Achievements' },
]

const statistics = [
  { value: 15, suffix: 'K+', label: 'Students Placed' },
  { value: 300, suffix: '+', label: 'Professors' },
  { value: 25, suffix: '+', label: 'Programmes' },
  { value: 20, suffix: 'K+', label: 'Graduates' },
  { value: 350, suffix: '+', label: 'Patents' },
  { value: 2, suffix: 'K+', label: 'Publications' },
]

function Welcome() {
  const [counts, setCounts] = useState<number[]>(
    statistics.map(() => 0)
  )

  const [hasStarted, setHasStarted] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Start the animation when statistics first enter the viewport
  useEffect(() => {
    const section = statsRef.current

    if (!section || hasStarted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [hasStarted])

  // Animate numbers slowly over 5 seconds
  useEffect(() => {
    if (!hasStarted) return

    const duration = 5000
    const startTime = performance.now()
    let animationFrame = 0

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      )

      const easedProgress = 1 - Math.pow(1 - progress, 2)

      setCounts(
        statistics.map((item) =>
          Math.floor(item.value * easedProgress)
        )
      )

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted])

  return (
    <section className="welcome-section">
      <div className="welcome-top">
        <div className="welcome-badge">
          <img src={badgeImage} alt="SKCET accreditation" />
        </div>

        <div className="welcome-content">
          <h1>Welcome to SKCET</h1>

          <p>
            Sri Krishna College of Engineering and Technology is the most
            sought after Institution among the premier technical Institutions
            in South India. Since its establishment in the year 1998, the
            Institution has marched towards the pinnacle of glory through its
            remarkable achievements in the field of Engineering Education.
            It is an Autonomous Institution, Affiliated to Anna University
            with 7 programmes being accredited by NBA and it offers 11 UG
            programmes, 4 PG programmes, 1 integrated programme and 8 research
            programmes. The Institution offers an exciting academic
            environment with well qualified dedicated faculty members to
            inspire and nurture the student fraternity. With industry drafted
            Choice Based Credit System (CBCS) curriculum and syllabi, the
            Institution takes every effort to bring its students to the
            forefront of the society as skillful and responsible engineers.
          </p>
        </div>
      </div>

      <div className="welcome-links">
        {quickLinks.map((item, index) => (
          <div
            className={`welcome-link-card ${
              index % 2 === 0 ? 'orange-border' : 'blue-border'
            }`}
            key={item.title}
          >
            <span className="welcome-link-icon">{item.icon}</span>
            <span className="welcome-link-title">{item.title}</span>
          </div>
        ))}
      </div>

      {/* Animated statistics section */}
      <div className="welcome-stats" ref={statsRef}>
        {statistics.map((item, index) => (
          <div className="welcome-stat" key={item.label}>
            <div className="welcome-stat-number">
              {counts[index]}
              {item.suffix}
            </div>

            <div className="welcome-stat-label">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Welcome
