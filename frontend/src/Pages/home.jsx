import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

const features = [
  { icon: '⚡', title: 'Instant Execution', desc: 'Run code in milliseconds. No setup, no installs. Just write and go.' },
  { icon: '🌐', title: 'Multi-Language', desc: 'Python, JavaScript, C++, Java, Go and 20+ languages supported out of the box.' },
  { icon: '🔗', title: 'Share Snippets', desc: 'One link. Anyone can view, fork, and run your code instantly.' },
  { icon: '🛡️', title: 'Sandboxed & Safe', desc: 'Every execution runs in an isolated environment. Safe by design.' },
  { icon: '🎨', title: 'Syntax Highlighting', desc: 'Beautiful, readable code with full syntax coloring for every language.' },
  { icon: '📦', title: 'Save & Organize', desc: 'Keep your snippets organized. Access them anywhere, anytime.' },
]

const languages = ['Python', 'JavaScript', 'C++', 'Java', 'Rust', 'Go', 'TypeScript', 'PHP', 'Ruby', 'Swift']

const codeSnippet = `# CodeRn — write, run, share
def greet(name: str) -> str:
    return f"Hello, {name}! 🚀"

languages = ["Python", "JS", "C++", "Go"]
for lang in languages:
    print(greet(lang))`

const Home = () => {
  const [typed, setTyped] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [counters, setCounters] = useState({ snippets: 0, users: 0, langs: 0 })
  const statsRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= codeSnippet.length) { setTyped(codeSnippet.slice(0, i)); i++ }
      else clearInterval(interval)
    }, 22)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 500)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true
        const targets = { snippets: 120000, users: 45000, langs: 25 }
        const duration = 1800
        const steps = 60
        let step = 0
        const timer = setInterval(() => {
          step++
          const ease = 1 - Math.pow(1 - step / steps, 3)
          setCounters({
            snippets: Math.floor(targets.snippets * ease),
            users: Math.floor(targets.users * ease),
            langs: Math.floor(targets.langs * ease),
          })
          if (step >= steps) clearInterval(timer)
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --emerald: #3ECF8E;
          --emerald-dim: rgba(62,207,142,0.1);
          --emerald-glow: rgba(62,207,142,0.25);
          --bg: #060608;
          --surface: #0d0d11;
          --surface2: #13131a;
          --border: rgba(255,255,255,0.07);
          --border-strong: rgba(255,255,255,0.12);
          --text: #ffffff;
          --text-muted: rgba(255,255,255,0.45);
          --text-dim: rgba(255,255,255,0.25);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Outfit', sans-serif;
          overflow-x: hidden;
        }

        .home-root { background: var(--bg); min-height: 100vh; }

        /* ─── HERO ─── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 80px;
          overflow: hidden;
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          z-index: 0;
        }

        .hero-orb1 {
          position: absolute;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(62,207,142,0.08) 0%, transparent 60%);
          top: -200px; right: -200px;
          z-index: 0;
          animation: orbFloat 12s ease-in-out infinite;
        }

        .hero-orb2 {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(62,207,142,0.05) 0%, transparent 60%);
          bottom: -100px; left: -100px;
          z-index: 0;
          animation: orbFloat 16s ease-in-out infinite reverse;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(30px, -30px); }
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          max-width: 1200px;
          width: 100%;
          align-items: center;
        }

        .hero-left { animation: fadeSlideLeft 0.8s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(62,207,142,0.08);
          border: 1px solid rgba(62,207,142,0.2);
          border-radius: 100px;
          padding: 5px 12px 5px 8px;
          margin-bottom: 28px;
          animation: fadeUp 0.8s ease both 0.1s;
        }

        .hero-badge-pill {
          background: #3ECF8E;
          color: #000;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 100px;
          letter-spacing: 0.5px;
        }

        .hero-badge-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.3px;
        }

        .hero-title {
          font-size: clamp(48px, 5.5vw, 76px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -3px;
          margin-bottom: 24px;
          animation: fadeUp 0.8s ease both 0.2s;
        }

        .hero-title .line2 {
          display: block;
          background: linear-gradient(135deg, #3ECF8E 0%, #2aa87e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 17px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 40px;
          max-width: 460px;
          font-weight: 400;
          animation: fadeUp 0.8s ease both 0.3s;
        }

        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          animation: fadeUp 0.8s ease both 0.4s;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #3ECF8E;
          color: #000;
          border: none;
          padding: 13px 24px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          letter-spacing: -0.3px;
          transition: all 0.2s ease;
          box-shadow: 0 0 0 1px rgba(62,207,142,0.3), 0 4px 20px rgba(62,207,142,0.2);
        }

        .btn-primary:hover {
          background: #4fe09e;
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px rgba(62,207,142,0.4), 0 8px 30px rgba(62,207,142,0.3);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8);
          border: 1px solid var(--border-strong);
          padding: 13px 24px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        /* Code window */
        .hero-right {
          animation: fadeSlideRight 0.8s cubic-bezier(0.16,1,0.3,1) both 0.3s;
        }

        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .code-window {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: 14px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 24px 80px rgba(0,0,0,0.6),
            0 0 60px rgba(62,207,142,0.06);
          position: relative;
        }

        .code-window::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(62,207,142,0.03) 0%, transparent 60%);
          pointer-events: none;
        }

        .code-titlebar {
          background: var(--surface2);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border);
        }

        .code-dot { width: 12px; height: 12px; border-radius: 50%; }
        .code-dot-r { background: #ff5f57; }
        .code-dot-y { background: #febc2e; }
        .code-dot-g { background: #3ECF8E; }

        .code-filename {
          margin-left: 10px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--text-dim);
          letter-spacing: 0.3px;
        }

        .code-run-btn {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(62,207,142,0.1);
          border: 1px solid rgba(62,207,142,0.2);
          border-radius: 6px;
          padding: 5px 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #3ECF8E;
          cursor: pointer;
          transition: all 0.2s;
        }

        .code-run-btn:hover { background: rgba(62,207,142,0.15); }

        .code-body {
          padding: 24px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          line-height: 1.85;
          color: #a8e6c8;
          min-height: 220px;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .code-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #3ECF8E;
          vertical-align: text-bottom;
          margin-left: 1px;
          border-radius: 1px;
        }

        /* ─── LANG TICKER ─── */
        .langs-strip {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 14px 0;
          overflow: hidden;
          position: relative;
        }

        .langs-strip::before, .langs-strip::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 100px;
          z-index: 2;
        }

        .langs-strip::before { left: 0; background: linear-gradient(90deg, var(--surface), transparent); }
        .langs-strip::after  { right: 0; background: linear-gradient(-90deg, var(--surface), transparent); }

        .langs-track {
          display: flex;
          gap: 0;
          animation: ticker 20s linear infinite;
          width: max-content;
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .lang-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--text-dim);
          letter-spacing: 2px;
          padding: 0 28px;
          border-right: 1px solid var(--border);
          white-space: nowrap;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .lang-tag:hover { color: #3ECF8E; }

        /* ─── STATS ─── */
        .stats-section {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 40px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(62,207,142,0.4), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .stat-card:hover { border-color: rgba(62,207,142,0.2); transform: translateY(-4px); }
        .stat-card:hover::before { opacity: 1; }

        .stat-num {
          font-size: 52px;
          font-weight: 800;
          color: #3ECF8E;
          line-height: 1;
          letter-spacing: -3px;
          margin-bottom: 10px;
          font-variant-numeric: tabular-nums;
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'IBM Plex Mono', monospace;
        }

        /* ─── FEATURES ─── */
        .features-section {
          padding: 0 24px 100px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #3ECF8E;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .section-eyebrow::before, .section-eyebrow::after {
          content: '';
          width: 32px;
          height: 1px;
          background: rgba(62,207,142,0.4);
        }

        .section-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.1;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .feature-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 32px 28px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(62,207,142,0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .feature-card:hover { border-color: rgba(62,207,142,0.2); transform: translateY(-6px); }
        .feature-card:hover::before { opacity: 1; }

        .feature-card:hover .feature-icon-wrap { background: rgba(62,207,142,0.15); border-color: rgba(62,207,142,0.3); }

        .feature-icon-wrap {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 20px;
          transition: all 0.3s;
        }

        .feature-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }

        .feature-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.65;
          font-weight: 400;
        }

        /* ─── CTA BANNER ─── */
        .cta-banner {
          max-width: 1200px;
          margin: 0 auto 100px;
          padding: 0 24px;
        }

        .cta-inner {
          background: linear-gradient(135deg, rgba(62,207,142,0.08) 0%, rgba(62,207,142,0.04) 100%);
          border: 1px solid rgba(62,207,142,0.2);
          border-radius: 20px;
          padding: 64px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }

        .cta-inner::before {
          content: '';
          position: absolute;
          top: -1px; left: 60px; right: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(62,207,142,0.5), transparent);
        }

        .cta-deco {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 110px;
          font-weight: 600;
          color: rgba(62,207,142,0.04);
          pointer-events: none;
          line-height: 1;
          letter-spacing: -4px;
        }

        .cta-text h2 {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          letter-spacing: -1.5px;
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .cta-text p { color: var(--text-muted); font-size: 15px; font-weight: 400; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1000px) {
          .hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .features-grid { grid-template-columns: 1fr 1fr; }
          .stats-grid { grid-template-columns: 1fr; gap: 12px; }
          .cta-inner { flex-direction: column; text-align: center; }
        }

        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="home-root">
        <Navbar />

        {/* HERO */}
        <section className="hero">
          <div className="hero-noise" />
          <div className="hero-orb1" />
          <div className="hero-orb2" />

          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="hero-badge-pill">NEW</span>
                <span className="hero-badge-text">Now live — v2.0</span>
              </div>

              <h1 className="hero-title">
                Code. Run.<br />
                <span className="line2">Share.</span>
              </h1>

              <p className="hero-sub">
                CodeRn is your browser-based code editor and compiler. Write in any language, execute instantly, and share your work with a single link — no setup required.
              </p>

              <div className="hero-ctas">
                <button className="btn-primary" onClick={() => window.location.href = '/editor'}>
                  Start Coding →
                </button>
                <button className="btn-secondary" onClick={() => window.location.href = '/docs'}>
                  Explore Docs
                </button>
              </div>
            </div>

            <div className="hero-right">
              <div className="code-window">
                <div className="code-titlebar">
                  <span className="code-dot code-dot-r" />
                  <span className="code-dot code-dot-y" />
                  <span className="code-dot code-dot-g" />
                  <span className="code-filename">main.py</span>
                  <div className="code-run-btn">▶ Run</div>
                </div>
                <div className="code-body">
                  {typed}
                  <span className="code-cursor" style={{ opacity: cursorVisible ? 1 : 0 }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LANGS TICKER */}
        <div className="langs-strip">
          <div className="langs-track">
            {[...languages, ...languages].map((lang, i) => (
              <span key={i} className="lang-tag">{lang}</span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="stats-section" ref={statsRef}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">{counters.snippets.toLocaleString()}+</div>
              <div className="stat-label">Snippets Shared</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{counters.users.toLocaleString()}+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{counters.langs}+</div>
              <div className="stat-label">Languages</div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <section className="features-section">
          <div className="section-header">
            <p className="section-eyebrow">Why CodeRn</p>
            <h2 className="section-title">Everything you need.<br />Nothing you don't.</h2>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="cta-banner">
          <div className="cta-inner">
            <div className="cta-deco">{`</>`}</div>
            <div className="cta-text">
              <h2>Your next great snippet<br />is one click away.</h2>
              <p>Join thousands of developers already using CodeRn daily.</p>
            </div>
            <button className="btn-primary" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
              onClick={() => window.location.href = '/editor'}>
              Open Editor →
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home
