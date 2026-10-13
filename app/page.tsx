'use client'

import { useState, useCallback } from 'react'
import { ArrowUpRight, MessageCircle, Star, Send } from 'lucide-react'

// Configuration - Edit these values as needed
const CONFIG = {
  // Manager WhatsApp number (include country code without +)
  WHATSAPP_NUMBER: '910000000000',

  // Google Place ID for direct review link
  GOOGLE_PLACE_ID: 'ChIJAVB-JyXIbTkRdEMiQvm2AzE',

  // Cafe branding
  CAFE_NAME: 'House of Unique Cafe',
}

const logoSource =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_fj9oqdfj9oqdfj9o.png-mzsfKTLMEDYG3nn2Sakf6VAk5H14Cs.jpeg'

const googleReviewUrl = `https://search.google.com/local/writereview?placeid=${CONFIG.GOOGLE_PLACE_ID}`

// Dynamic rating labels based on star value
const getRatingLabel = (value: number): string => {
  switch (value) {
    case 1:
      return 'Disappointed'
    case 2:
      return 'Needs Improvement'
    case 3:
      return 'Average'
    case 4:
      return 'Great experience!'
    case 5:
      return 'Absolutely loved it!'
    default:
      return ''
  }
}

// Rating label colors for 1-3 stars (shown in label)
const getRatingLabelColor = (value: number): string => {
  if (value <= 3) return '#C52928'
  return '#1E8E3E'
}

// Star fill colors based on FINAL rating (not individual star)
function getStarColor(rating: number) {
  if (rating <= 2) return '#EF4444'
  if (rating === 3) return '#F97316'
  return '#EAB308'
}

export default function Page() {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const selectRating = useCallback((value: number) => {
    setRating(value)
    if (navigator.vibrate) navigator.vibrate([50])

    if (value >= 4) {
      // ─── 4 or 5 Stars: INSTANT REDIRECT TO GOOGLE REVIEW BOX ───
      // No delay, no intermediate clicks - direct navigation
      window.location.href = googleReviewUrl
    }
  }, [])

  const handleSendFeedback = useCallback(() => {
    const userFeedback = feedback.trim()
    const textParam = `Rating: ${rating} Stars. Feedback: ${userFeedback ? userFeedback : 'No details entered.'}`
    const encodedText = encodeURIComponent(textParam)

    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedText}`
    window.location.href = whatsappUrl
  }, [feedback, rating])

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f8f5ed] px-4 py-6 text-[#241815] sm:flex sm:items-center sm:justify-center">
      <div className="coffee-doodle-pattern pointer-events-none fixed inset-0 z-[-2]" aria-hidden="true" />
      <img
        src={logoSource}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-1/2 z-[-1] w-[min(92vw,680px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] mix-blend-multiply"
      />
      <section className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[400px] flex-col overflow-hidden rounded-[2rem] border border-[#e8dfd1] bg-[#fffdf8]/95 shadow-[0_24px_70px_rgba(73,42,24,0.12)] backdrop-blur-[2px]">
        <div className="h-1.5 w-full bg-[#c9252d]" />

        <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-8">
          <header className="flex flex-col items-center">
            <div className="relative aspect-[3/2] w-full max-w-[300px] overflow-hidden rounded-xl bg-[#faf6ed] mix-blend-multiply">
              <img
                src={logoSource}
                alt="House of Unique Cafe logo"
                className="block h-full w-full object-contain"
              />
            </div>
            <div className="mt-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9a8375]">
              <span className="h-px w-5 bg-[#d9c8b5]" />
              Your moment matters
              <span className="h-px w-5 bg-[#d9c8b5]" />
            </div>
          </header>

          <div className="mt-8 text-center sm:mt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9252d]">A quick check-in</p>
            <h1 className="mx-auto mt-3 max-w-[260px] font-serif text-[30px] font-bold leading-[1.08] tracking-[-0.04em] text-[#241815] sm:max-w-none sm:text-[32px]">
              How was your experience today?
            </h1>
            <p className="mt-4 text-sm text-[#8b7569]">Tap a star to share your thoughts</p>
          </div>

          <div className="mt-1 flex flex-col items-center">
            <div className="flex items-center gap-2" role="radiogroup" aria-label="Rate your experience">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-label={`${value} star${value === 1 ? '' : 's'}`}
                  aria-checked={rating === value}
                  onClick={() => selectRating(value)}
                  className="group rounded-full p-1.5 transition-transform hover:scale-110 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9252d]"
                >
                  <Star
                    className="size-9 stroke-[1.5] transition-all duration-200 sm:size-10"
                    style={{
                      color: value <= rating ? getStarColor(rating) : '#c9b9a7',
                      fill: value <= rating ? getStarColor(rating) : 'transparent',
                      filter: value <= rating && rating >= 4 ? 'drop-shadow(0 2px 8px rgba(255, 184, 0, 0.45))' : 'none',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Dynamic rating label with color */}
            <p
              className="mt-3 min-h-5 text-sm font-semibold capitalize text-[#6f5548] transition-colors duration-200"
              aria-live="polite"
              style={{ color: rating ? getRatingLabelColor(rating) : '#6f5548' }}
            >
              {rating ? getRatingLabel(rating) : ' '}
            </p>
          </div>

          {/* ─── 1-3 Stars: Feedback Panel with WhatsApp ─── */}
          {rating > 0 && rating <= 3 && (
            <div
              className="mt-6 rounded-2xl border border-[#eadfd2] bg-[#fcf8f1] p-4 animate-fade-in"
              role="region"
              aria-label="Feedback form"
            >
              <label htmlFor="feedback" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[#806a5c]">
                We're sorry! Tell us what went wrong so we can fix it.
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder="We're sorry! Tell us what went wrong so we can fix it."
                rows={4}
                className="w-full resize-none rounded-xl border border-[#e4d7c8] bg-[#fffdf8] px-3.5 py-3 text-sm text-[#241815] outline-none placeholder:text-[#b4a398] focus:border-[#c9252d] focus:ring-2 focus:ring-[#c9252d]/10"
                autoFocus
              />
              <button
                onClick={handleSendFeedback}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white shadow-[0_6px_18px_rgba(37,211,102,0.35)] transition-all hover:bg-[#1EBE5D] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92zm0 17.93c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.39 0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.88.86-.88 2.09s.9 2.42 1.03 2.59c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.12-.23-.19-.48-.31z" />
                </svg>
                <span>Send Feedback</span>
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* ─── 4-5 Stars: Google Review Redirect ─── */}
          {rating >= 4 && (
            <div className="mt-6 rounded-2xl border border-[#f0dfb8] bg-[#fff8e8] px-4 py-3 text-center text-xs text-[#1E8E3E] animate-pulse-subtle">
              Redirecting to Google Review<span className="inline-block animate-pulse">...</span>
            </div>
          )}

          <footer className="mt-auto pt-10 text-center">
            <div className="mx-auto mb-5 h-px w-12 bg-[#dbcbb9]" />
            <p className="text-[11px] leading-relaxed text-[#9b877a]">House of Unique Cafe<br />Your neighborhood, your happy place</p>
            <p className="mt-4 text-[11px] font-medium text-[#a18d80]">Thank you for visiting House of Unique Cafe! ❤️☕</p>
          </footer>
        </div>
      </section>

      {/* Inline styles for custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes pulseSubtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-subtle {
          animation: pulseSubtle 1.5s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
