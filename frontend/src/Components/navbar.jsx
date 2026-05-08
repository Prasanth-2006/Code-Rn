import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/home", label: "Home" },
  { to: "/docs", label: "Docs" },
  { to: "/contact", label: "Contact" },
  { to: "/editor", label: "Editor" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
const [user, setUser] = useState(null);

  useEffect(() => {

  const onScroll = () =>
    setScrolled(window.scrollY > 20);

  window.addEventListener("scroll", onScroll);

  const storedUser = localStorage.getItem("user");

  if (storedUser) {
  try {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(JSON.parse(storedUser));
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    console.log("Invalid user data");
    localStorage.removeItem("user");
  }
}

  return () =>
    window.removeEventListener("scroll", onScroll);

}, []);

const handleLogout = () => {

  localStorage.removeItem("user");

  window.location.href = "/";

};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 28px;
          justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-root.nav-scrolled {
          background: rgba(6, 6, 8, 0.92);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
        }

        .nav-root.nav-top { background: transparent; }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nav-brand-mark {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #3ECF8E 0%, #2ca870 100%);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          color: #000;
          flex-shrink: 0;
          box-shadow: 0 0 16px rgba(62,207,142,0.3);
          transition: box-shadow 0.3s, transform 0.2s;
        }

        .nav-brand:hover .nav-brand-mark {
          box-shadow: 0 0 24px rgba(62,207,142,0.5);
          transform: scale(1.05);
        }

        .nav-brand-name {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .nav-brand-name span { color: #3ECF8E; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .nav-link {
          padding: 6px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
        }

        .nav-link:hover { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.06); }
        .nav-link.active { color: #fff; background: rgba(255,255,255,0.08); }

        .nav-right { display: flex; align-items: center; gap: 10px; }

        .nav-signin {
          padding: 7px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.2s;
        }

        .nav-signin:hover { color: #fff; }

        .nav-cta {
          padding: 7px 16px;
          background: #3ECF8E;
          color: #000;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 0 0 1px rgba(62,207,142,0.4);
        }

        .nav-cta:hover {
          background: #4fe09e;
          box-shadow: 0 0 16px rgba(62,207,142,0.4);
          transform: translateY(-1px);
        }

        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
          outline: none;
        }

        .nav-hamburger span {
          display: block;
          width: 20px;
          height: 1.5px;
          background: rgba(255,255,255,0.7);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .nav-mobile {
          position: fixed;
          top: 60px; left: 0; right: 0;
          background: rgba(6, 6, 8, 0.98);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          z-index: 199;
          padding: 12px 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s, opacity 0.25s;
        }

        .nav-mobile.open { transform: translateY(0); opacity: 1; pointer-events: all; }

        .nav-mobile-link {
          padding: 11px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.15s;
        }

        .nav-mobile-link:hover, .nav-mobile-link.active {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }

        .nav-mobile-cta {
          margin-top: 8px;
          padding: 12px;
          background: #3ECF8E;
          color: #000;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          text-align: center;
        }
          
        .nav-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-user-img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3ECF8E;
}

.nav-user-name {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.nav-logout {
  padding: 7px 14px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: rgba(255,255,255,0.75);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.nav-logout:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
}

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta, .nav-signin { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "nav-scrolled" : "nav-top"}`}>
        <NavLink to="/" className="nav-brand">
          <div className="nav-brand-mark">CR</div>
          <span className="nav-brand-name">Code<span>Rn</span></span>
        </NavLink>

        <div className="nav-links">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="nav-right">

  {user ? (
    <>

      <div className="nav-user">
        <img
  src={
    user.photo
      ? user.photo
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3ECF8E&color=000`
  }
  alt={user.name}
  className="nav-user-img"
/>

        <span className="nav-user-name">
          {user.name}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="nav-logout"
      >
        Logout
      </button>

    </>
  ) : (
    <NavLink to="/login" className="nav-signin">
      Sign in
    </NavLink>
  )}

  <NavLink to="/editor" className="nav-cta">
    Open Editor
  </NavLink>

</div>

        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-mobile-link${isActive ? " active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <NavLink to="/editor" className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>
          Open Editor
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
