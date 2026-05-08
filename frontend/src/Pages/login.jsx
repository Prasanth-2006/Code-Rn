import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Components/navbar'

import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase";

const Login = () => {

  const [tab, setTab] = useState('login')

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    confirm: ''
  })

  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 50)
  }, [])

  useEffect(() => {

    setForm({
      email: "",
      password: "",
      name: "",
      confirm: "",
    })

  }, [])

  const handleChange = (f, v) => {

    setForm(prev => ({
      ...prev,
      [f]: v
    }))

    if (errors[f]) {
      setErrors(prev => ({
        ...prev,
        [f]: null
      }))
    }
  }

  const validate = () => {

    const e = {}

    if (tab === 'signup' && !form.name.trim()) {
      e.name = 'Required'
    }

    if (!form.email.includes('@')) {
      e.email = 'Invalid email'
    }

    if (form.password.length < 6) {
      e.password = 'Min 6 characters'
    }

    if (
      tab === 'signup' &&
      form.confirm !== form.password
    ) {
      e.confirm = 'Passwords do not match'
    }

    return e
  }

  const switchTab = (t) => {

    setTab(t)

    setForm({
      email: '',
      password: '',
      name: '',
      confirm: ''
    })

    setErrors({})
    setSuccess(false)
    setShowPass(false)
    setShowConfirm(false)
  }

  // ================= GOOGLE LOGIN =================

  const handleGoogleLogin = async () => {

    try {

      const result = await signInWithPopup(
        auth,
        googleProvider
      )

      const user = result.user

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            googleId: user.uid,
          }),
        }
      )

      const data = await res.json()

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user?.username || user.displayName,
          email: data.user?.email || user.email,
          photo: data.user?.photo || user.photoURL,
        })
      )

      setSuccess(true)

      setTimeout(() => {
        window.location.href = "/"
      }, 1500)

    } catch (err) {

      console.log(err)

      alert("Google Login Failed")
    }
  }

  // ================= GITHUB LOGIN =================

  const handleGithubLogin = async () => {

    try {

      const result = await signInWithPopup(
        auth,
        githubProvider
      )

      const user = result.user

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/github-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            githubId: user.uid,
          }),
        }
      )

      const data = await res.json()

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user?.username || user.displayName,
          email: data.user?.email || user.email,
          photo: data.user?.photo || user.photoURL,
        })
      )

      setSuccess(true)

      setTimeout(() => {
        window.location.href = "/"
      }, 1500)

    } catch (err) {

      console.log(err)

      alert("GitHub Login Failed")
    }
  }

  // ================= EMAIL LOGIN + SIGNUP =================

  const handleSubmit = async () => {

    const e = validate()

    if (Object.keys(e).length) {

      setErrors(e)

      return
    }

    setErrors({})
    setLoading(true)

    try {

      // ================= LOGIN =================

      if (tab === 'login') {

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password
            })
          }
        )

        const data = await res.json()

        if (!res.ok) {

          setErrors({
            email: data.message || 'Login failed'
          })

          return
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.user?.username || "User",
            email: data.user?.email || form.email,
            photo: data.user?.photo || "",
          })
        )

        setSuccess(true)

        setTimeout(() => {
          window.location.href = "/"
        }, 1500)

      }

      // ================= SIGNUP =================

      else {

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/signup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: form.name,
              email: form.email,
              password: form.password
            })
          }
        )

        const data = await res.json()

        if (!res.ok) {

          setErrors({
            email: data.message || 'Signup failed'
          })

          return
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.user?.username || form.name,
            email: data.user?.email || form.email,
            photo: data.user?.photo || "",
          })
        )

        setSuccess(true)

        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
      }

    } catch (err) {

      console.log(err)

      setErrors({
        email: 'Server unreachable. Is backend running?'
      })

    } finally {

      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        html,
body,
#root {
  background: #060608;
  margin: 0;
  padding: 0;
  min-height: 100%;
  overflow-x: hidden;
}

body {
  overscroll-behavior: none;
}

        :root {
          --em: #3ECF8E;
          --em-dim: rgba(62,207,142,0.1);
          --em-border: rgba(62,207,142,0.25);
          --bg: #060608;
          --s1: #0d0d11;
          --s2: #13131a;
          --border: rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.12);
          --text: #fff;
          --muted: rgba(255,255,255,0.45);
          --dim: rgba(255,255,255,0.2);
          --red: rgba(255,80,80,0.85);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg2-root {
  background: var(--bg);
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
}

        .lg2-layout {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 60px);
        }

        /* LEFT PANEL */
        .lg2-left {
          position: relative;
          background: var(--s1);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 72px;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .lg2-left.in { opacity: 1; transform: translateX(0); }

        .lg2-left-orb {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(62,207,142,0.07) 0%, transparent 65%);
          bottom: -150px; right: -150px;
          z-index: 0;
          animation: orbPulse 8s ease-in-out infinite;
        }

        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .lg2-left-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(62,207,142,0.08) 1px, transparent 1px);
          background-size: 32px 32px;
          z-index: 0;
          mask-image: radial-gradient(ellipse at 30% 40%, black 30%, transparent 80%);
        }

        .lg2-left-inner {
          position: relative;
          z-index: 1;
        }

        .lg2-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: #3ECF8E;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lg2-eyebrow-line { width: 24px; height: 1px; background: #3ECF8E; opacity: 0.5; }

        .lg2-left-title {
          font-size: clamp(32px, 3.5vw, 50px);
          font-weight: 800;
          letter-spacing: -2.5px;
          line-height: 1.05;
          margin-bottom: 20px;
        }

        .lg2-left-title span {
          background: linear-gradient(135deg, #3ECF8E, #2aa87e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lg2-left-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.75;
          max-width: 340px;
          font-weight: 400;
          margin-bottom: 40px;
        }

        .lg2-feats { display: flex; flex-direction: column; gap: 13px; }

        .lg2-feat {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
          opacity: 0;
          transform: translateX(-10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .lg2-feat.in { opacity: 1; transform: translateX(0); }

        .lg2-feat-check {
          width: 20px; height: 20px;
          background: var(--em-dim);
          border: 1px solid var(--em-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: #3ECF8E;
          flex-shrink: 0;
        }

        .lg2-code-deco {
          margin-top: 44px;
          background: var(--s2);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          max-width: 360px;
        }

        .lg2-code-bar {
          background: rgba(255,255,255,0.03);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid var(--border);
        }

        .lg2-code-dot { width: 9px; height: 9px; border-radius: 50%; }

        .lg2-code-body {
          padding: 18px 20px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #8ed4a8;
          line-height: 1.8;
        }

        .lg2-cc { color: rgba(255,255,255,0.2); }
        .lg2-ck { color: #3ECF8E; }
        .lg2-cs { color: #b8e8c8; }

        /* RIGHT PANEL */
        .lg2-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 32px;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s;
        }

        .lg2-right.in { opacity: 1; transform: translateX(0); }

        .lg2-card { width: 100%; max-width: 400px; }

        /* Tabs */
        .lg2-tabs {
          display: flex;
          background: var(--s1);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 28px;
        }

        .lg2-tab {
          flex: 1;
          padding: 10px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          border-radius: 7px;
          cursor: pointer;
          color: var(--muted);
          transition: all 0.2s;
          user-select: none;
          letter-spacing: -0.2px;
        }

        .lg2-tab.active { background: #3ECF8E; color: #000; }
        .lg2-tab:not(.active):hover { color: var(--text); }

        .lg2-card-title { font-size: 24px; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 5px; }
        .lg2-card-sub { font-size: 13px; color: var(--muted); margin-bottom: 24px; font-weight: 400; }

        /* OAuth */
        .lg2-oauth { display: flex; gap: 10px; margin-bottom: 20px; }

        .lg2-oauth-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .lg2-oauth-btn:hover { border-color: var(--border2); color: var(--text); background: rgba(255,255,255,0.07); }

        .lg2-or {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .lg2-or-line { flex: 1; height: 1px; background: var(--border); }
        .lg2-or-text { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--dim); letter-spacing: 1px; white-space: nowrap; }

        .lg2-form { display: flex; flex-direction: column; gap: 14px; }

        .lg2-field { display: flex; flex-direction: column; gap: 6px; }

        .lg2-field-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.8px;
          text-transform: uppercase;
          font-family: 'IBM Plex Mono', monospace;
        }

        .lg2-field-label span { color: #3ECF8E; }

        .lg2-input-wrap { position: relative; }

        .lg2-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .lg2-input::placeholder { color: rgba(255,255,255,0.2); font-weight: 400; }
        .lg2-input:focus { border-color: rgba(62,207,142,0.4); box-shadow: 0 0 0 3px rgba(62,207,142,0.08); background: rgba(255,255,255,0.06); }
        .lg2-input.error { border-color: var(--red); }
        .lg2-input.has-toggle { padding-right: 46px; }

        .lg2-toggle {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          cursor: pointer; color: var(--dim);
          font-size: 14px; transition: color 0.2s; padding: 0;
        }

        .lg2-toggle:hover { color: #3ECF8E; }

        .lg2-error-msg { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--red); letter-spacing: 0.3px; }

        .lg2-forgot { text-align: right; margin-top: -6px; }
        .lg2-forgot a { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--dim); text-decoration: none; transition: color 0.2s; }
        .lg2-forgot a:hover { color: #3ECF8E; }

        .lg2-submit {
          background: #3ECF8E;
          color: #000;
          border: none;
          padding: 13px;
          width: 100%;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          margin-top: 4px;
          letter-spacing: -0.2px;
          box-shadow: 0 0 0 1px rgba(62,207,142,0.3), 0 4px 20px rgba(62,207,142,0.2);
        }

        .lg2-submit:hover:not(:disabled) {
          background: #4fe09e;
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px rgba(62,207,142,0.4), 0 8px 28px rgba(62,207,142,0.3);
        }

        .lg2-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

        .lg2-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .lg2-success {
          text-align: center;
          padding: 28px 0;
          animation: successIn 0.5s ease;
        }

        @keyframes successIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

        .lg2-success-icon {
          width: 60px; height: 60px;
          background: var(--em-dim);
          border: 1px solid var(--em-border);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 26px;
          margin: 0 auto 18px;
        }

        .lg2-success h3 { font-size: 20px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }
        .lg2-success p { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .lg2-success p span { color: #3ECF8E; font-weight: 700; }

        .lg2-switch { margin-top: 18px; text-align: center; font-size: 13px; color: var(--muted); font-weight: 400; }

        .lg2-switch button {
          background: none; border: none;
          color: #3ECF8E; font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; padding: 0;
        }

        .lg2-switch button:hover { opacity: 0.7; }

        .lg2-terms { margin-top: 14px; text-align: center; font-size: 11px; color: var(--dim); line-height: 1.6; }
        .lg2-terms a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .lg2-terms a:hover { color: #3ECF8E; }

        @media (max-width: 900px) {
          .lg2-layout { grid-template-columns: 1fr; }
          .lg2-left { display: none; }
          .lg2-right { padding: 32px 20px; }
        }
      `}</style>

      <div className="lg2-root">
        <Navbar />
        <div className="lg2-layout">

          {/* LEFT PANEL */}
          <div className={`lg2-left ${mounted ? 'in' : ''}`}>
            <div className="lg2-left-dots" />
            <div className="lg2-left-orb" />
            <div className="lg2-left-inner">
              <div className="lg2-eyebrow">
                <span className="lg2-eyebrow-line" />
                Welcome back
              </div>
              <h2 className="lg2-left-title">
                Code without<br />
                <span>limits.</span>
              </h2>
              <p className="lg2-left-desc">
                Sign in to access your snippets, run code in 25+ languages, and share your work with a single link.
              </p>

              <div className="lg2-feats">
                {[
                  'Instant code execution in the browser',
                  'Permanent snippet URLs, no expiry',
                  'Fork and collaborate on any snippet',
                  'API access for automation & CI',
                ].map((f, i) => (
                  <div key={i} className={`lg2-feat ${mounted ? 'in' : ''}`} style={{ transitionDelay: `${0.3 + i * 0.1}s` }}>
                    <span className="lg2-feat-check">✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <div className="lg2-code-deco">
                <div className="lg2-code-bar">
                  <div className="lg2-code-dot" style={{ background: '#ff5f57' }} />
                  <div className="lg2-code-dot" style={{ background: '#febc2e' }} />
                  <div className="lg2-code-dot" style={{ background: '#3ECF8E' }} />
                </div>
                <div className="lg2-code-body">
                  <span className="lg2-cc">{'# Already have an account?'}</span>{'\n'}
                  <span className="lg2-ck">user</span>{' = auth.login(\n'}
                  {'  '}<span className="lg2-ck">email</span>{'='}<span className="lg2-cs">"you@example.com"</span>{',\n'}
                  {'  '}<span className="lg2-ck">password</span>{'='}<span className="lg2-cs">"••••••••"</span>{'\n'}
                  {')\n'}
                  <span className="lg2-cc">{'# → Welcome back 🚀'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className={`lg2-right ${mounted ? 'in' : ''}`}>
            <div className="lg2-card">
              <div className="lg2-tabs">
                <div className={`lg2-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>Sign In</div>
                <div className={`lg2-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => switchTab('signup')}>Create Account</div>
              </div>

              {success ? (
                <div className="lg2-success">
                  <div className="lg2-success-icon">✓</div>
                  <h3>{tab === 'login' ? 'Welcome back.' : 'Account created.'}</h3>
                  <p>
                    {tab === 'login'
                      ? <><span>{form.email || 'you@example.com'}</span> — redirecting to editor...</>
                      : <>Your account is ready. <span>Start coding now.</span></>
                    }
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="lg2-card-title">{tab === 'login' ? 'Sign in' : 'Create account'}</h2>
                  <p className="lg2-card-sub">
                    {tab === 'login' ? 'Enter your credentials to access your workspace.' : 'Join thousands of developers on CodeRn.'}
                  </p>

                  <div className="lg2-oauth">
                    <button
  className="lg2-oauth-btn"
  onClick={handleGoogleLogin}
>
  <span>✦</span> Google
</button>
                    <button
  className="lg2-oauth-btn"
  onClick={handleGithubLogin}
>
  <span>⬡</span> GitHub
</button>
                  </div>

                  <div className="lg2-or">
                    <div className="lg2-or-line" />
                    <span className="lg2-or-text">or continue with email</span>
                    <div className="lg2-or-line" />
                  </div>

                  <div className="lg2-form">
                    {tab === 'signup' && (
                      <div className="lg2-field">
                        <label className="lg2-field-label">Full Name <span>*</span></label>
                        <input className={`lg2-input ${errors.name ? 'error' : ''}`} placeholder="Enter Your Name"
                          value={form.name} onChange={e => handleChange('name', e.target.value)} />
                        {errors.name && <span className="lg2-error-msg">↑ {errors.name}</span>}
                      </div>
                    )}

                    <div className="lg2-field">
                      <label className="lg2-field-label">Email <span>*</span></label>
                      <input
  className={`lg2-input ${errors.email ? 'error' : ''}`}
  type="email"
  placeholder="you@example.com"
  autoComplete="off"
  value={form.email}
  onChange={e => handleChange('email', e.target.value)}
/>
                      {errors.email && <span className="lg2-error-msg">↑ {errors.email}</span>}
                    </div>

                    <div className="lg2-field">
                      <label className="lg2-field-label">Password <span>*</span></label>
                      <div className="lg2-input-wrap">
                        <input
  className={`lg2-input has-toggle ${errors.password ? 'error' : ''}`}
  type={showPass ? 'text' : 'password'}
  placeholder="••••••••"
  autoComplete="new-password"
  value={form.password}
  onChange={e => handleChange('password', e.target.value)}
/>
                        <button type="button" className="lg2-toggle" onClick={() => setShowPass(v => !v)}>{showPass ? '🙈' : '👁'}</button>
                      </div>
                      {errors.password && <span className="lg2-error-msg">↑ {errors.password}</span>}
                    </div>

                    {tab === 'signup' && (
                      <div className="lg2-field">
                        <label className="lg2-field-label">Confirm Password <span>*</span></label>
                        <div className="lg2-input-wrap">
                          <input
  className={`lg2-input has-toggle ${errors.confirm ? 'error' : ''}`}
  type={showConfirm ? 'text' : 'password'}
  placeholder="••••••••"
  autoComplete="new-password"
  value={form.confirm}
  onChange={e => handleChange('confirm', e.target.value)}
/>
                          <button type="button" className="lg2-toggle" onClick={() => setShowConfirm(v => !v)}>{showConfirm ? '🙈' : '👁'}</button>
                        </div>
                        {errors.confirm && <span className="lg2-error-msg">↑ {errors.confirm}</span>}
                      </div>
                    )}

                    {tab === 'login' && (
                      <div className="lg2-forgot"><a href="#">Forgot password?</a></div>
                    )}

                    <button className="lg2-submit" onClick={handleSubmit} disabled={loading}>
                      {loading ? <span className="lg2-spinner" /> : tab === 'login' ? 'Sign In →' : 'Create Account →'}
                    </button>
                  </div>

                  <div className="lg2-switch">
                    {tab === 'login'
                      ? <>No account? <button onClick={() => switchTab('signup')}>Sign up free</button></>
                      : <>Already have one? <button onClick={() => switchTab('login')}>Sign in</button></>
                    }
                  </div>

                  {tab === 'signup' && (
                    <p className="lg2-terms">
                      By creating an account, you agree to our{' '}
                      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login
