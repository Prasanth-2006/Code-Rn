import React, { useState, useRef } from 'react'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

const sidebar = [
  { section: 'Getting Started', icon: '▶', items: [{ id: 'intro', label: 'Introduction' }, { id: 'quickstart', label: 'Quick Start' }, { id: 'interface', label: 'The Interface' }] },
  { section: 'Editor', icon: '✦', items: [{ id: 'languages', label: 'Supported Languages' }, { id: 'shortcuts', label: 'Keyboard Shortcuts' }, { id: 'themes', label: 'Editor Themes' }] },
  { section: 'Sharing', icon: '◈', items: [{ id: 'share', label: 'Share a Snippet' }, { id: 'embed', label: 'Embed Code' }, { id: 'export', label: 'Export Options' }] },
  { section: 'API', icon: '⬡', items: [{ id: 'api-intro', label: 'API Overview' }, { id: 'endpoints', label: 'Endpoints' }, { id: 'auth', label: 'Authentication' }] },
]

const content = {
  intro: { title: 'Introduction', badge: 'Getting Started', body: `CodeRn is a browser-based code editor and execution environment. Write code, run it instantly, and share it with a permanent URL — no account required to get started.\n\nBuilt for developers who want zero friction. No local setup, no dependencies, no waiting. Just open a tab and start coding.`, code: null, tip: 'CodeRn supports over 25 programming languages with real-time syntax highlighting and intelligent auto-complete.' },
  quickstart: { title: 'Quick Start', badge: 'Getting Started', body: `Getting started with CodeRn takes under 30 seconds. Navigate to the Editor, pick your language, write your code, and hit Run. That's it.\n\nTo save and share your snippet, click the Share button in the top-right of the editor. You'll get a permanent URL you can send to anyone.`, code: `// 1. Open the Editor from the navbar\n// 2. Select your language\n// 3. Write your code\nconsole.log("Hello from CodeRn!");\n\n// 4. Press Ctrl+Enter to run\n// 5. Click Share → copy your link`, tip: 'Use Ctrl+Enter (or Cmd+Enter on Mac) anywhere in the editor to run your code without reaching for the mouse.' },
  interface: { title: 'The Interface', badge: 'Getting Started', body: `The CodeRn editor is divided into three panels: the code editor on the left, the output terminal at the bottom, and the toolbar at the top.\n\nThe toolbar contains your language selector, run button, share controls, and settings. The terminal captures both stdout and stderr, color-coded for clarity.`, code: null, tip: 'Drag the divider between the editor and terminal to resize panels to your preference.' },
  languages: { title: 'Supported Languages', badge: 'Editor', body: `CodeRn supports 25+ languages out of the box. Each language runs in an isolated sandbox with the latest stable runtime version.`, code: `const languages = [\n  "Python 3.12",  "JavaScript (Node 20)",\n  "TypeScript",   "C++17",\n  "Java 21",      "Rust 1.78",\n  "Go 1.22",      "PHP 8.3",\n  "Ruby 3.3",     "Swift 5.10",\n  "Kotlin",       "R",\n  "Bash",         "SQL",\n  // ...and more\n];`, tip: 'Missing a language? Submit a request via the GitHub repo and it may be added in the next release.' },
  shortcuts: { title: 'Keyboard Shortcuts', badge: 'Editor', body: `CodeRn is designed to keep your hands on the keyboard. All critical actions have shortcuts.`, table: [['Ctrl + Enter', 'Run code'], ['Ctrl + S', 'Save snippet'], ['Ctrl + /', 'Toggle comment'], ['Ctrl + Shift+F', 'Format code'], ['Ctrl + Z', 'Undo'], ['Ctrl + K', 'Clear terminal'], ['F11', 'Toggle fullscreen']], tip: 'On macOS, replace Ctrl with Cmd for all shortcuts.' },
  themes: { title: 'Editor Themes', badge: 'Editor', body: `CodeRn ships with 8 built-in editor themes. The default is a custom dark theme designed for long coding sessions with reduced eye strain.\n\nThemes can be changed from the Settings panel (gear icon) in the top-right of the editor. Your preference is saved to localStorage.`, code: `// Available themes\nconst themes = [\n  "CodeRn Dark",   // default\n  "CodeRn Light",\n  "Monokai",\n  "Nord",\n  "Dracula",\n  "Solarized Dark",\n  "GitHub Dark",\n  "One Dark Pro",\n];`, tip: null },
  share: { title: 'Share a Snippet', badge: 'Sharing', body: `Every snippet gets a unique, permanent URL the moment you click Share. The URL encodes your language, code, and settings — no account needed.\n\nShared snippets are read-only for viewers. They can fork your snippet into their own session with one click.`, code: `// Example shared snippet URL\nhttps://CodeRn.dev/s/x7k2mP9q\n\n// Forking via API\nPOST /api/v1/snippets/x7k2mP9q/fork`, tip: 'Snippets are stored permanently. Optionally set an expiry (1h, 24h, 7d, never) before sharing.' },
  embed: { title: 'Embed Code', badge: 'Sharing', body: `You can embed any CodeRn snippet as a live, runnable widget on any webpage. The embed is a sandboxed iframe that lets viewers read and run the code without leaving your site.`, code: `<!-- Embed a snippet -->\n<iframe\n  src="https://CodeRn.dev/embed/x7k2mP9q"\n  width="100%"\n  height="400"\n  frameborder="0"\n  allow="clipboard-write"\n></iframe>`, tip: 'Add ?readOnly=true to the embed URL to disable editing for your audience.' },
  export: { title: 'Export Options', badge: 'Sharing', body: `CodeRn supports exporting your snippet in multiple formats directly from the editor toolbar.`, table: [['Raw file', 'Download as .py, .js, .cpp, etc.'], ['Gist', 'Push directly to GitHub Gist'], ['PNG image', 'Export code as a styled screenshot'], ['PDF', 'Export as formatted PDF document'], ['Markdown', 'Wrapped in a fenced code block']], tip: 'The PNG export uses your active editor theme, perfect for sharing on social media.' },
  'api-intro': { title: 'API Overview', badge: 'API', body: `The CodeRn REST API lets you create, run, and retrieve snippets programmatically. It's ideal for CI pipelines, bots, or integrating CodeRn into your own tools.\n\nBase URL: https://api.CodeRn.dev/v1`, code: `// Run a snippet via API\nconst res = await fetch("https://api.CodeRn.dev/v1/run", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer YOUR_API_KEY",\n  },\n  body: JSON.stringify({\n    language: "python",\n    code: "print('Hello from API!')",\n  }),\n});\n\nconst { output } = await res.json();\nconsole.log(output); // Hello from API!`, tip: 'Rate limit for free tier: 60 requests/minute. Pro tier: 600 requests/minute.' },
  endpoints: { title: 'Endpoints', badge: 'API', body: `All endpoints return JSON. Authentication is via Bearer token in the Authorization header.`, table: [['POST /run', 'Execute code and return output'], ['POST /snippets', 'Create and save a snippet'], ['GET  /snippets/:id', 'Retrieve a saved snippet'], ['POST /snippets/:id/fork', 'Fork an existing snippet'], ['DELETE /snippets/:id', 'Delete your snippet']], tip: null },
  auth: { title: 'Authentication', badge: 'API', body: `API keys are available to registered users. Generate yours from the Account → API Keys settings page.\n\nKeep your key secret — it grants full access to your account via the API.`, code: `// Include in every request\nheaders: {\n  "Authorization": "Bearer cb_live_xxxxxxxxxxxxxxxxxxxx"\n}\n\n// Key format\n// cb_live_ → production key\n// cb_test_ → sandbox key (no rate limits, no persistence)`, tip: 'Rotate your key immediately if you suspect it has been compromised. Old keys are invalidated instantly.' },
}

const Docs = () => {
  const [active, setActive] = useState('intro')
  const [openSections, setOpenSections] = useState({ 'Getting Started': true, Editor: true, Sharing: true, API: true })
  const [copied, setCopied] = useState(false)
  const contentRef = useRef(null)
  const doc = content[active]

  const toggleSection = (sec) => setOpenSections(v => ({ ...v, [sec]: !v[sec] }))

  const handleNav = (id) => {
    setActive(id)
    if (contentRef.current) contentRef.current.scrollTop = 0
  }

  const copyCode = () => {
    if (doc.code) { navigator.clipboard.writeText(doc.code); setCopied(true); setTimeout(() => setCopied(false), 2000) }
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
          --muted: rgba(255,255,255,0.5);
          --dim: rgba(255,255,255,0.2);
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
        
        .docs2-root {
          background: var(--bg);
          color: var(--text);
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          padding-top: 60px;
        }

        .docs2-layout {
          display: grid;
          grid-template-columns: 248px 1fr;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* SIDEBAR */
        .docs2-sidebar {
          border-right: 1px solid var(--border);
          padding: 28px 0;
          position: sticky;
          top: 60px;
          height: calc(100vh - 60px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.08) transparent;
          animation: sideIn 0.5s ease both;
        }

        @keyframes sideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }

        .docs2-sidebar::-webkit-scrollbar { width: 4px; }
        .docs2-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

        .docs2-sidebar-top {
          padding: 0 16px 20px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 12px;
        }

        .docs2-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--dim);
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .docs2-search:hover { border-color: var(--border2); }

        .docs2-kbd {
          margin-left: auto;
          font-size: 9px;
          background: rgba(255,255,255,0.06);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--dim);
          border: 1px solid var(--border);
        }

        .docs2-sec { margin-bottom: 2px; }

        .docs2-sec-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 16px;
          cursor: pointer;
          user-select: none;
        }

        .docs2-sec-label {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 600;
          color: var(--dim);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'IBM Plex Mono', monospace;
        }

        .docs2-sec-icon { color: var(--em); font-size: 9px; }
        .docs2-sec-arrow { font-size: 8px; color: var(--dim); transition: transform 0.2s; }
        .docs2-sec-arrow.open { transform: rotate(90deg); }

        .docs2-sec-items { overflow: hidden; max-height: 0; transition: max-height 0.3s ease; }
        .docs2-sec-items.open { max-height: 300px; }

        .docs2-nav-item {
          display: block;
          padding: 8px 16px 8px 32px;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          cursor: pointer;
          border-left: 2px solid transparent;
          transition: all 0.15s;
          position: relative;
          margin: 0 8px;
          border-radius: 0 6px 6px 0;
          border-left: 2px solid transparent;
        }

        .docs2-nav-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.04); }
        .docs2-nav-item.active { color: var(--em); border-left-color: var(--em); background: var(--em-dim); }

        /* CONTENT */
        .docs2-content {
          padding: 52px 72px;
          overflow-y: visible;
        }

        .docs2-article {
          max-width: 700px;
          animation: artIn 0.35s ease both;
        }

        @keyframes artIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .docs2-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--em-dim);
          border: 1px solid var(--em-border);
          border-radius: 100px;
          padding: 4px 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: var(--em);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .docs2-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .docs2-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(62,207,142,0.4) 0%, transparent 50%);
          margin-bottom: 28px;
        }

        .docs2-body {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.8;
          font-weight: 400;
          margin-bottom: 28px;
          white-space: pre-line;
        }

        /* Code block */
        .docs2-code-wrap {
          background: var(--s1);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 28px;
          overflow: hidden;
        }

        .docs2-code-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid var(--border);
        }

        .docs2-code-dots { display: flex; gap: 6px; }
        .docs2-code-dot { width: 10px; height: 10px; border-radius: 50%; }

        .docs2-code-copy {
          background: none;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px 10px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: var(--dim);
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.5px;
        }

        .docs2-code-copy:hover, .docs2-code-copy.copied { border-color: var(--em); color: var(--em); }

        .docs2-code-body {
          padding: 22px 24px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          line-height: 1.85;
          color: #9de0b8;
          overflow-x: auto;
          white-space: pre;
        }

        /* Table */
        .docs2-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }

        .docs2-table th {
          background: var(--s1);
          color: var(--em);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 18px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }

        .docs2-table td {
          padding: 12px 18px;
          border-bottom: 1px solid var(--border);
          color: var(--muted);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          transition: background 0.15s;
        }

        .docs2-table tr:hover td { background: rgba(255,255,255,0.02); color: var(--text); }
        .docs2-table td:first-child { color: var(--em); }

        /* Tip */
        .docs2-tip {
          display: flex;
          gap: 14px;
          background: var(--em-dim);
          border: 1px solid var(--em-border);
          border-radius: 10px;
          padding: 16px 20px;
          margin-bottom: 28px;
        }

        .docs2-tip-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
        .docs2-tip-text { font-size: 13px; color: var(--muted); line-height: 1.65; font-weight: 400; }

        /* Bottom nav */
        .docs2-bottom-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 52px;
          padding-top: 28px;
          border-top: 1px solid var(--border);
          gap: 16px;
        }

        .docs2-nav-btn {
          background: var(--s1);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 20px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
          min-width: 160px;
          color: var(--text);
        }

        .docs2-nav-btn:hover { border-color: var(--border2); background: rgba(255,255,255,0.04); transform: translateY(-2px); }

        .docs2-nav-btn-dir { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--dim); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 5px; }
        .docs2-nav-btn-label { font-size: 14px; font-weight: 700; letter-spacing: -0.3px; }
        .docs2-nav-btn.next { text-align: right; }

        @media (max-width: 768px) {
          .docs2-layout { grid-template-columns: 1fr; }
          .docs2-sidebar { display: none; }
          .docs2-content { padding: 32px 24px; }
        }
      `}</style>

      <div className="docs2-root">
        <Navbar />
        <div className="docs2-layout">
          {/* SIDEBAR */}
          <aside className="docs2-sidebar">
            <div className="docs2-sidebar-top">
              <div className="docs2-search">
                <span>⌕</span>
                Search docs...
                <span className="docs2-kbd">⌘K</span>
              </div>
            </div>

            {sidebar.map(({ section, icon, items }) => (
              <div className="docs2-sec" key={section}>
                <div className="docs2-sec-header" onClick={() => toggleSection(section)}>
                  <span className="docs2-sec-label">
                    <span className="docs2-sec-icon">{icon}</span>
                    {section}
                  </span>
                  <span className={`docs2-sec-arrow ${openSections[section] ? 'open' : ''}`}>▶</span>
                </div>
                <div className={`docs2-sec-items ${openSections[section] ? 'open' : ''}`}>
                  {items.map(({ id, label }) => (
                    <div key={id} className={`docs2-nav-item ${active === id ? 'active' : ''}`} onClick={() => handleNav(id)}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* CONTENT */}
          <main className="docs2-content" ref={contentRef}>
            {doc && (
              <article className="docs2-article" key={active}>
                <div className="docs2-badge">// {doc.badge}</div>
                <h1 className="docs2-title">{doc.title}</h1>
                <div className="docs2-divider" />
                <p className="docs2-body">{doc.body}</p>

                {doc.code && (
                  <div className="docs2-code-wrap">
                    <div className="docs2-code-bar">
                      <div className="docs2-code-dots">
                        <div className="docs2-code-dot" style={{ background: '#ff5f57' }} />
                        <div className="docs2-code-dot" style={{ background: '#febc2e' }} />
                        <div className="docs2-code-dot" style={{ background: '#3ECF8E' }} />
                      </div>
                      <button className={`docs2-code-copy ${copied ? 'copied' : ''}`} onClick={copyCode}>
                        {copied ? 'COPIED ✓' : 'COPY'}
                      </button>
                    </div>
                    <div className="docs2-code-body">{doc.code}</div>
                  </div>
                )}

                {doc.table && (
                  <table className="docs2-table">
                    <thead>
                      <tr>
                        <th>{active === 'shortcuts' ? 'Shortcut' : active === 'export' ? 'Format' : 'Method / Route'}</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc.table.map(([a, b], i) => (
                        <tr key={i}>
                          <td>{a}</td>
                          <td style={{ color: 'var(--muted)', fontFamily: 'Outfit, sans-serif', fontSize: 13 }}>{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {doc.tip && (
                  <div className="docs2-tip">
                    <span className="docs2-tip-icon">💡</span>
                    <p className="docs2-tip-text">{doc.tip}</p>
                  </div>
                )}

                <BottomNav active={active} sidebar={sidebar} onNav={handleNav} />
              </article>
            )}
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

const BottomNav = ({ active, sidebar, onNav }) => {
  const allItems = sidebar.flatMap(s => s.items)
  const idx = allItems.findIndex(i => i.id === active)
  const prev = allItems[idx - 1]
  const next = allItems[idx + 1]

  return (
    <div className="docs2-bottom-nav">
      {prev ? (
        <button className="docs2-nav-btn" onClick={() => onNav(prev.id)}>
          <div className="docs2-nav-btn-dir">← Previous</div>
          <div className="docs2-nav-btn-label">{prev.label}</div>
        </button>
      ) : <div />}
      {next ? (
        <button className="docs2-nav-btn next" onClick={() => onNav(next.id)}>
          <div className="docs2-nav-btn-dir">Next →</div>
          <div className="docs2-nav-btn-label">{next.label}</div>
        </button>
      ) : <div />}
    </div>
  )
}

export default Docs
