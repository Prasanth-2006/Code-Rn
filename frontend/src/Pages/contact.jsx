import React, { useState } from 'react'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

const contactMethods = [
  { icon: '◈', title: 'Discord Community', desc: 'Chat with the team and other developers in real time.', link: 'Join Server →', href: '#' },
  { icon: '⬡', title: 'GitHub Issues', desc: 'Found a bug or want a feature? Open an issue on GitHub.', link: 'Open Issue →', href: '#' },
  { icon: '✦', title: 'Email Support', desc: 'For private or account-related matters. We reply within 24h.', link: 'support@CodeRn.dev', href: 'mailto:support@CodeRn.dev' },
]

const faqs = [
  { q: 'Is CodeRn free to use?', a: 'Yes. The core editor, execution, and sharing features are completely free with no account required. A Pro tier is available for higher rate limits and private snippets.' },
  { q: 'How long are snippets stored?', a: 'Snippets are stored permanently by default. You can optionally set an expiry of 1h, 24h, or 7 days before sharing.' },
  { q: 'Which languages are supported?', a: 'CodeRn supports 25+ languages including Python, JavaScript, TypeScript, C++, Java, Rust, Go, PHP, Ruby, Swift, and more. Check the Docs for the full list.' },
  { q: 'Can I use CodeRn offline?', a: 'Code editing works offline, but execution and sharing require an internet connection as code runs on our sandboxed servers.' },
  { q: 'Is my code private?', a: 'Unshared snippets are only accessible via direct URL. Pro users get true private snippets with access control.' },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.includes('@')) e.email = 'Invalid email'
    if (!form.subject.trim()) e.subject = 'Required'
    if (form.message.trim().length < 10) e.message = 'Too short'
    return e
  }

  const handleSubmit = async () => {

  const e = validate();

  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  try {

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.success) {
      setSubmitted(true);
    }

  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --em: #3ECF8E;
          --em-dim: rgba(62,207,142,0.08);
          --em-border: rgba(62,207,142,0.2);
          --bg: #060608;
          --s1: #0d0d11;
          --s2: #13131a;
          --border: rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.12);
          --text: #fff;
          --muted: rgba(255,255,255,0.45);
          --dim: rgba(255,255,255,0.2);
          --red: rgba(255,80,80,0.8);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html,
body,
#root {
  margin: 0;
  padding: 0;
  background: #060608;
  min-height: 100%;
  overflow-x: hidden;
}

body {
  overscroll-behavior: none;
}
        
        .ct2-root {
          background: var(--bg);
          color: var(--text);
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          padding-top: 60px;
          overflow-x: hidden;
        }

        /* HERO */
        .ct2-hero {
          position: relative;
          padding: 80px 24px 72px;
          text-align: center;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .ct2-hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(62,207,142,0.07) 0%, transparent 70%);
          z-index: 0;
        }

        .ct2-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
          animation: fadeUp2 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes fadeUp2 {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ct2-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--em-dim);
          border: 1px solid var(--em-border);
          border-radius: 100px;
          padding: 5px 14px 5px 8px;
          margin-bottom: 24px;
        }

        .ct2-badge-dot {
          width: 6px; height: 6px;
          background: var(--em);
          border-radius: 50%;
          animation: dotPulse 1.4s ease-in-out infinite;
        }

        @keyframes dotPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

        .ct2-badge-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.5px;
        }

        .ct2-hero-title {
          font-size: clamp(40px, 5.5vw, 64px);
          font-weight: 800;
          letter-spacing: -3px;
          line-height: 1.0;
          margin-bottom: 18px;
        }

        .ct2-hero-title span {
          background: linear-gradient(135deg, #3ECF8E, #2aa87e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ct2-hero-sub { font-size: 15px; color: var(--muted); line-height: 1.7; font-weight: 400; }

        /* BODY */
        .ct2-body {
          max-width: 1160px;
          margin: 0 auto;
          padding: 72px 24px 80px;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 64px;
          align-items: start;
        }

        /* FORM SIDE */
        .ct2-form-side { animation: fadeUp2 0.6s ease both 0.1s; }

        .ct2-form-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: var(--em);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .ct2-form-title { font-size: clamp(26px, 3vw, 34px); font-weight: 800; letter-spacing: -1.5px; margin-bottom: 6px; }
        .ct2-form-subtitle { font-size: 14px; color: var(--muted); margin-bottom: 32px; font-weight: 400; }

        /* Success */
        .ct2-success {
          background: var(--em-dim);
          border: 1px solid var(--em-border);
          border-radius: 14px;
          padding: 48px 36px;
          text-align: center;
          animation: fadeUp2 0.5s ease both;
        }

        .ct2-success-icon { font-size: 36px; margin-bottom: 18px; display: block; }
        .ct2-success h3 { font-size: 22px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }
        .ct2-success p { font-size: 14px; color: var(--muted); }

        /* Form */
        .ct2-form { display: flex; flex-direction: column; gap: 18px; }

        .ct2-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .ct2-field { display: flex; flex-direction: column; gap: 7px; }

        .ct2-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.8px;
          text-transform: uppercase;
          font-family: 'IBM Plex Mono', monospace;
        }

        .ct2-label span { color: var(--em); }

        .ct2-input, .ct2-textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
          outline: none;
          width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .ct2-input::placeholder, .ct2-textarea::placeholder { color: rgba(255,255,255,0.2); font-weight: 400; }
        .ct2-input:focus, .ct2-textarea:focus { border-color: rgba(62,207,142,0.4); box-shadow: 0 0 0 3px rgba(62,207,142,0.07); background: rgba(255,255,255,0.06); }
        .ct2-input.err, .ct2-textarea.err { border-color: var(--red); }

        .ct2-error { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--red); letter-spacing: 0.3px; }

        .ct2-textarea { resize: vertical; min-height: 130px; }
        .ct2-charcount { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--dim); text-align: right; margin-top: -4px; }

        .ct2-submit {
          background: #3ECF8E;
          color: #000;
          border: none;
          padding: 14px 28px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          letter-spacing: -0.3px;
          box-shadow: 0 0 0 1px rgba(62,207,142,0.3), 0 4px 20px rgba(62,207,142,0.15);
        }

        .ct2-submit:hover { background: #4fe09e; transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(62,207,142,0.4), 0 8px 28px rgba(62,207,142,0.25); }

        /* RIGHT SIDE */
        .ct2-right { display: flex; flex-direction: column; gap: 28px; animation: fadeUp2 0.6s ease both 0.2s; }

        .ct2-response {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--s1);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 18px;
        }

        .ct2-response-dot {
          width: 8px; height: 8px;
          background: var(--em);
          border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        .ct2-response-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--muted); }
        .ct2-response-text strong { color: var(--em); font-weight: 600; }

        /* Contact cards */
        .ct2-cards-title { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--dim); letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 12px; }

        .ct2-cards { display: flex; flex-direction: column; gap: 8px; }

        .ct2-card {
          background: var(--s1);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 18px 20px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          transition: border-color 0.2s, transform 0.2s;
          cursor: default;
        }

        .ct2-card:hover { border-color: var(--border2); transform: translateX(4px); }

        .ct2-card-icon {
          width: 34px; height: 34px;
          background: var(--em-dim);
          border: 1px solid var(--em-border);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: var(--em); flex-shrink: 0;
          transition: transform 0.2s;
        }

        .ct2-card:hover .ct2-card-icon { transform: scale(1.1) rotate(-5deg); }

        .ct2-card-title { font-size: 14px; font-weight: 700; margin-bottom: 3px; letter-spacing: -0.2px; }
        .ct2-card-desc { font-size: 12px; color: var(--muted); line-height: 1.5; margin-bottom: 7px; font-weight: 400; }
        .ct2-card-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--em); text-decoration: none; transition: opacity 0.2s; }
        .ct2-card-link:hover { opacity: 0.7; }

        /* FAQ */
        .ct2-faq-title { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--dim); letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 12px; }

        .ct2-faqs { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; background: var(--s1); }

        .ct2-faq-item { border-bottom: 1px solid var(--border); }
        .ct2-faq-item:last-child { border-bottom: none; }

        .ct2-faq-q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          background: transparent;
          transition: background 0.2s;
          gap: 12px;
          user-select: none;
          letter-spacing: -0.2px;
        }

        .ct2-faq-q:hover { background: rgba(255,255,255,0.03); }

        .ct2-faq-arrow { color: var(--em); font-size: 9px; flex-shrink: 0; transition: transform 0.25s; }
        .ct2-faq-arrow.open { transform: rotate(90deg); }

        .ct2-faq-a {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease, padding 0.3s ease;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.65;
          font-weight: 400;
          padding: 0 18px;
        }

        .ct2-faq-a.open { max-height: 130px; padding: 14px 18px; border-top: 1px solid var(--border); }

        @media (max-width: 900px) {
          .ct2-body { grid-template-columns: 1fr; gap: 48px; }
          .ct2-form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ct2-root">
        <Navbar />

        <section className="ct2-hero">
          <div className="ct2-hero-bg" />
          <div className="ct2-hero-inner">
            <div className="ct2-badge">
              <span className="ct2-badge-dot" />
              <span className="ct2-badge-text">Get in Touch</span>
            </div>
            <h1 className="ct2-hero-title">
              We're here.<br />
              <span>Talk to us.</span>
            </h1>
            <p className="ct2-hero-sub">
              Questions, bug reports, feature requests, or just want to say hi — drop us a message and we'll get back to you fast.
            </p>
          </div>
        </section>

        <div className="ct2-body">
          {/* FORM */}
          <div className="ct2-form-side">
            <p className="ct2-form-eyebrow">// send a message</p>
            <h2 className="ct2-form-title">What's on your mind?</h2>
            <p className="ct2-form-subtitle">Fill out the form and we'll respond within 24 hours.</p>

            {submitted ? (
              <div className="ct2-success">
                <span className="ct2-success-icon">✓</span>
                <h3>Message sent.</h3>
                <p>We'll get back to you at <strong style={{ color: 'var(--em)' }}>{form.email}</strong> within 24 hours.</p>
              </div>
            ) : (
              <div className="ct2-form">
                <div className="ct2-form-row">
                  <div className="ct2-field">
                    <label className="ct2-label">Name <span>*</span></label>
                    <input className={`ct2-input ${errors.name ? 'err' : ''}`} placeholder="Your Name"
                      value={form.name} onChange={e => handleChange('name', e.target.value)} />
                    {errors.name && <span className="ct2-error">↑ {errors.name}</span>}
                  </div>
                  <div className="ct2-field">
                    <label className="ct2-label">Email <span>*</span></label>
                    <input className={`ct2-input ${errors.email ? 'err' : ''}`} type="email" placeholder="you@example.com"
                      value={form.email} onChange={e => handleChange('email', e.target.value)} />
                    {errors.email && <span className="ct2-error">↑ {errors.email}</span>}
                  </div>
                </div>

                <div className="ct2-field">
                  <label className="ct2-label">Subject <span>*</span></label>
                  <input className={`ct2-input ${errors.subject ? 'err' : ''}`} placeholder="Bug report / Feature request / General inquiry"
                    value={form.subject} onChange={e => handleChange('subject', e.target.value)} />
                  {errors.subject && <span className="ct2-error">↑ {errors.subject}</span>}
                </div>

                <div className="ct2-field">
                  <label className="ct2-label">Message <span>*</span></label>
                  <textarea className={`ct2-textarea ${errors.message ? 'err' : ''}`} placeholder="Describe your issue or question in detail..."
                    value={form.message} onChange={e => handleChange('message', e.target.value)} />
                  <div className="ct2-charcount">{form.message.length} / 1000</div>
                  {errors.message && <span className="ct2-error">↑ {errors.message}</span>}
                </div>

                <button className="ct2-submit" onClick={handleSubmit}>Send Message →</button>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="ct2-right">
            <div className="ct2-response">
              <span className="ct2-response-dot" />
              <span className="ct2-response-text">Average response time: <strong>under 4 hours</strong></span>
            </div>

            <div>
              <p className="ct2-cards-title">// other channels</p>
              <div className="ct2-cards">
                {contactMethods.map((m, i) => (
                  <div className="ct2-card" key={i}>
                    <div className="ct2-card-icon">{m.icon}</div>
                    <div>
                      <div className="ct2-card-title">{m.title}</div>
                      <div className="ct2-card-desc">{m.desc}</div>
                      <a className="ct2-card-link" href={m.href}>{m.link}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="ct2-faq-title">// faq</p>
              <div className="ct2-faqs">
                {faqs.map((f, i) => (
                  <div className="ct2-faq-item" key={i}>
                    <div className="ct2-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      {f.q}
                      <span className={`ct2-faq-arrow ${openFaq === i ? 'open' : ''}`}>▶</span>
                    </div>
                    <div className={`ct2-faq-a ${openFaq === i ? 'open' : ''}`}>{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Contact
