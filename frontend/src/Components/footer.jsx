import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const links = {
  Product: [
    { label: "Editor", to: "/editor" },
    { label: "Snippets", to: "/snippets" },
    { label: "Languages", to: "/docs" },
    { label: "Themes", to: "/docs" },
    { label: "API", to: "/docs" },
  ],
  Resources: [
    { label: "Docs", to: "/docs" },
    { label: "Quick Start", to: "/docs" },
    { label: "Changelog", to: "#" },
    { label: "Status", to: "#" },
    { label: "Roadmap", to: "#" },
  ],
  Company: [
    { label: "About", to: "#" },
    { label: "Blog", to: "#" },
    { label: "Careers", to: "#" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy", to: "#" },
  ],
  Community: [
    { label: "Discord", to: "#" },
    { label: "GitHub", to: "#" },
    { label: "Twitter / X", to: "#" },
    { label: "Newsletter", to: "#" },
    { label: "Open Source", to: "#" },
  ],
};

const socials = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState("idle");
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSub = () => {
    if (!email.includes("@")) { setSubState("error"); return; }
    setSubState("success");
    setEmail("");
    setTimeout(() => setSubState("idle"), 3500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .ft2-root {
          background: #060608;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-family: 'Outfit', sans-serif;
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .ft2-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(62,207,142,0.4) 30%, rgba(62,207,142,0.2) 50%, rgba(62,207,142,0.4) 70%, transparent 100%);
          opacity: 0;
          transition: opacity 1s ease;
        }

        .ft2-root.ft2-visible::before { opacity: 1; }

        /* Newsletter band */
        .ft2-nl {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 48px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .ft2-root.ft2-visible .ft2-nl { opacity: 1; transform: translateY(0); }

        .ft2-nl-left h3 {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
        }

        .ft2-nl-left p { font-size: 13px; color: rgba(255,255,255,0.4); font-weight: 400; }

        .ft2-nl-right { display: flex; gap: 0; flex-shrink: 0; }

        .ft2-nl-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-right: none;
          border-radius: 10px 0 0 10px;
          padding: 11px 18px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          outline: none;
          width: 260px;
          transition: border-color 0.2s, background 0.2s;
        }

        .ft2-nl-input::placeholder { color: rgba(255,255,255,0.25); font-weight: 400; }
        .ft2-nl-input:focus { border-color: rgba(62,207,142,0.4); background: rgba(255,255,255,0.06); }
        .ft2-nl-input.error { border-color: rgba(255,80,80,0.5); }

        .ft2-nl-btn {
          background: #3ECF8E;
          color: #000;
          border: none;
          border-radius: 0 10px 10px 0;
          padding: 11px 20px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
        }

        .ft2-nl-btn:hover { background: #4fe09e; }

        .ft2-nl-success {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #3ECF8E;
        }

        /* Main grid */
        .ft2-main {
          padding: 56px 64px 48px;
          display: grid;
          grid-template-columns: 1.6fr repeat(4, 1fr);
          gap: 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }

        .ft2-root.ft2-visible .ft2-main { opacity: 1; transform: translateY(0); }

        .ft2-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 16px;
        }

        .ft2-logo-mark {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #3ECF8E, #2ca870);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          color: #000;
          flex-shrink: 0;
        }

        .ft2-logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }

        .ft2-logo-text span { color: #3ECF8E; }

        .ft2-brand-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          line-height: 1.7;
          max-width: 210px;
          font-weight: 400;
          margin-bottom: 24px;
        }

        .ft2-socials { display: flex; gap: 8px; margin-bottom: 20px; }

        .ft2-social {
          width: 32px; height: 32px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: all 0.2s;
        }

        .ft2-social:hover {
          background: rgba(62,207,142,0.1);
          border-color: rgba(62,207,142,0.3);
          color: #3ECF8E;
          transform: translateY(-2px);
        }

        .ft2-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 5px 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.3px;
        }

        .ft2-status-dot {
          width: 6px; height: 6px;
          background: #3ECF8E;
          border-radius: 50%;
          animation: statusBlink 2s ease-in-out infinite;
        }

        @keyframes statusBlink {
          0%, 100% { box-shadow: 0 0 0 0 rgba(62,207,142,0.4); }
          50% { box-shadow: 0 0 0 4px rgba(62,207,142,0); }
        }

        .ft2-col-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: block;
        }

        .ft2-col-links { display: flex; flex-direction: column; gap: 10px; }

        .ft2-col-link {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.15s, padding-left 0.15s;
          display: inline-block;
        }

        .ft2-col-link:hover { color: rgba(255,255,255,0.85); padding-left: 4px; }

        /* Divider */
        .ft2-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0 64px;
          opacity: 0;
          transition: opacity 0.6s ease 0.3s;
        }

        .ft2-root.ft2-visible .ft2-divider { opacity: 1; }

        /* Bottom */
        .ft2-bottom {
          padding: 20px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          opacity: 0;
          transition: opacity 0.6s ease 0.4s;
        }

        .ft2-root.ft2-visible .ft2-bottom { opacity: 1; }

        .ft2-copy {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
        }

        .ft2-copy span { color: #3ECF8E; }

        .ft2-bottom-links { display: flex; gap: 24px; }

        .ft2-bottom-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          transition: color 0.2s;
        }

        .ft2-bottom-link:hover { color: #3ECF8E; }

        .ft2-version {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.12);
          letter-spacing: 1px;
        }

        .ft2-wa {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          transition: color 0.2s;
          margin-top: 6px;
        }

        .ft2-wa:hover { color: #3ECF8E; }

        @media (max-width: 1024px) {
          .ft2-main { grid-template-columns: 1fr 1fr; padding: 48px 32px; }
          .ft2-brand-col { grid-column: 1 / -1; }
          .ft2-nl { padding: 36px 32px; flex-direction: column; align-items: flex-start; }
          .ft2-nl-right { width: 100%; }
          .ft2-nl-input { flex: 1; }
          .ft2-divider { margin: 0 32px; }
          .ft2-bottom { padding: 20px 32px; flex-direction: column; text-align: center; gap: 12px; }
        }

        @media (max-width: 600px) {
          .ft2-main { grid-template-columns: 1fr 1fr; padding: 32px 20px; gap: 28px; }
          .ft2-nl { padding: 28px 20px; }
          .ft2-nl-right { flex-direction: column; }
          .ft2-nl-input { width: 100%; border-right: 1px solid rgba(255,255,255,0.08); border-radius: 10px; }
          .ft2-nl-btn { border-radius: 10px; margin-top: 8px; }
          .ft2-divider { margin: 0 20px; }
          .ft2-bottom { padding: 20px; }
          .ft2-bottom-links { flex-wrap: wrap; justify-content: center; gap: 12px; }
        }
      `}</style>

      <footer className={`ft2-root ${visible ? "ft2-visible" : ""}`} ref={footerRef}>
        {/* Newsletter */}
        <div className="ft2-nl">
          <div className="ft2-nl-left">
            <h3>Stay in the loop.</h3>
            <p>Get notified about new languages, features, and releases. No spam, ever.</p>
          </div>
          <div className="ft2-nl-right">
            {subState === "success" ? (
              <div className="ft2-nl-success"><span>✓</span> You're subscribed. Welcome aboard.</div>
            ) : (
              <>
                <input
                  className={`ft2-nl-input ${subState === "error" ? "error" : ""}`}
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubState("idle"); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSub()}
                />
                <button className="ft2-nl-btn" onClick={handleSub}>Subscribe →</button>
              </>
            )}
          </div>
        </div>

        {/* Main grid */}
        <div className="ft2-main">
          <div className="ft2-brand-col">
            <NavLink to="/" className="ft2-logo">
              <div className="ft2-logo-mark">CR</div>
              <span className="ft2-logo-text">Code<span>Rn</span></span>
            </NavLink>
            <p className="ft2-brand-desc">
              A browser-based code editor and execution environment. Write, run, and share code with zero setup.
            </p>
            <div className="ft2-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="ft2-social" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
            <div className="ft2-status">
              <span className="ft2-status-dot" />
              All systems operational
            </div>
          </div>

          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <span className="ft2-col-title">{col}</span>
              <div className="ft2-col-links">
                {items.map(({ label, to }) => (
                  <NavLink key={label} to={to} className="ft2-col-link">{label}</NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ft2-divider" />

        <div className="ft2-bottom">
          <span className="ft2-copy">© 2026 <span>CodeRn</span>. Built for developers, by Developer.</span>
          <div className="ft2-bottom-links">
            <NavLink to="#" className="ft2-bottom-link">Terms</NavLink>
            <NavLink to="#" className="ft2-bottom-link">Privacy</NavLink>
            <NavLink to="#" className="ft2-bottom-link">Cookies</NavLink>
            <NavLink to="#" className="ft2-bottom-link">Security</NavLink>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", color:"green" }}>
            <span className="ft2-version">v2.0.1</span>
            <a href="https://wa.me/916303388249" target="_blank" rel="noopener noreferrer" className="ft2-wa" >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" color="green">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <p style={{color:"green"}}>WhatsApp</p>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
