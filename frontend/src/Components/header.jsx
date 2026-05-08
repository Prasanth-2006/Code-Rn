import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@400;600;700;800&display=swap');

        .hdr-root {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 48px;
          background: #0d0d11;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }

        .hdr-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .hdr-brand-mark {
          width: 22px; height: 22px;
          background: linear-gradient(135deg, #3ECF8E, #2ca870);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 600;
          color: #000;
        }

        .hdr-brand-name {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }

        .hdr-brand-name span { color: #3ECF8E; }

        .hdr-overview {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          padding: 5px 10px;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
        }

        .hdr-overview:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.06); }
        .hdr-overview.active { color: #fff; }
      `}</style>

      <div className="hdr-root">
        <NavLink to="/" className="hdr-brand">
          <div className="hdr-brand-mark">CR</div>
          <span className="hdr-brand-name">Code<span>Rn</span></span>
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) => `hdr-overview${isActive ? ' active' : ''}`}
        >
          Overview
        </NavLink>
      </div>
    </>
  )
}

export default Header
