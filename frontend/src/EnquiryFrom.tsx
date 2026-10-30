import { useState } from 'react'

interface EnquiryFromProps {
  isOpen: boolean
  onClose: () => void
}

const API_BASE_URL = 'https://skcet-website-gold.vercel.app'

function EnquiryFrom({ isOpen, onClose }: EnquiryFromProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const wordCount = query.trim()
    ? query.trim().split(/\s+/).length
    : 0

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setMessage('')
    setIsSuccess(false)

    if (wordCount > 500) {
      setMessage('Your query must not exceed 500 words.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/enquiries`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            query: query.trim(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Unable to submit your enquiry.'
        )
      }

      setMessage(
        data.message || 'Your enquiry has been submitted successfully!'
      )
      setIsSuccess(true)

      setName('')
      setPhone('')
      setEmail('')
      setQuery('')
    } catch (error) {
      console.error('Enquiry submission error:', error)

      setMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your enquiry. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="enquiry-overlay" onClick={onClose}>
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="enquiry-header">
          <h2 id="enquiry-title">ENQUIRE NOW</h2>

          <button
            type="button"
            className="enquiry-close"
            onClick={onClose}
            aria-label="Close enquiry form"
          >
            &times;
          </button>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name *"
            aria-label="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setMessage('')
            }}
            maxLength={100}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number *"
            aria-label="Phone Number"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value)
              setMessage('')
            }}
            pattern="[0-9+\s()-]{7,20}"
            title="Enter a valid phone number"
            required
          />

          <input
            type="email"
            placeholder="Email *"
            aria-label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setMessage('')
            }}
            maxLength={254}
            required
          />

          <div className="enquiry-query-wrapper">
            <textarea
              placeholder="Enter your query (maximum 500 words) *"
              aria-label="Your query"
              value={query}
              onChange={(event) => {
                const value = event.target.value
                const count = value.trim()
                  ? value.trim().split(/\s+/).length
                  : 0

                if (count <= 500 || value.length < query.length) {
                  setQuery(value)
                  setMessage('')
                }
              }}
              rows={6}
              required
            />

            <div className="enquiry-word-count">
              {wordCount}/500 words
            </div>
          </div>

          {message && (
            <p
              className="enquiry-message"
              role="status"
              style={{
                color: isSuccess ? 'green' : 'red',
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="enquiry-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EnquiryFrom
