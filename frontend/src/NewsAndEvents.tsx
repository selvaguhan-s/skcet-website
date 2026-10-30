const events = [
  {
    date: '15 Jun',
    title: 'ANRF Sponsored FDP on',
    description:
      'Quantum-Enhance AI BCI for advanced Medical Rehabilitation and Multimodal Neural Data Fusion',
    link: 'BROCHURE',
    color: 'navy',
  },
  {
    date: '5 Oct',
    title: 'World Space Week Celebrations 2026',
    description: 'ISRO Space Expo @SKCET 5-7, October',
    link: 'INVITATION',
    color: 'blue',
  },
  {
    date: '24 Aug',
    title: 'First Year Orientation – 2026 Batch',
    description: 'Chief Guest Mr. Udaya Sankar',
    link: 'INVITATION',
    color: 'navy',
  },
]

function NewsAndEvents() {
  return (
    <section className="news-events-section">
      <h1 className="news-events-heading">News and Events</h1>

      <div className="news-events-grid">
        {events.map((event) => (
          <article
            className={`news-events-card news-events-${event.color}`}
            key={event.date}
          >
            <span className="news-events-tag">
              EVENT
              <span className="news-events-tag-arrow" />
            </span>

            <h2 className="news-events-date">{event.date}</h2>

            <h3 className="news-events-title">{event.title}</h3>

            <p className="news-events-description">
              {event.description}
            </p>

            <a
              className="news-events-link"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              {event.link}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default NewsAndEvents
