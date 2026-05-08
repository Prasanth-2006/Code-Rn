import React, { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Play } from "lucide-react";
import Header from "../Components/header";

const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGES = [
  {
    label: "JavaScript",
    value: "javascript",
    language_id: 63,
    ext: "main.js",
    default: `// JavaScript
console.log("Hello, World!");`,
  },

  {
    label: "Python",
    value: "python",
    language_id: 71,
    ext: "main.py",
    default: `# Python
print("Hello, World!")`,
  },

  {
    label: "Java",
    value: "java",
    language_id: 62,
    ext: "Main.java",
    default: `// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },

  {
    label: "Rust",
    value: "rust",
    language_id: 73,
    ext: "main.rs",
    default: `// Rust
fn main() {
    println!("Hello, World!");
}`,
  },

  {
    label: "C++",
    value: "cpp",
    language_id: 54,
    ext: "main.cpp",
    default: `// C++
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  },

  {
    label: "Go",
    value: "go",
    language_id: 60,
    ext: "main.go",
    default: `// Go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  },

  {
    label: "Ruby",
    value: "ruby",
    language_id: 72,
    ext: "main.rb",
    default: `# Ruby
puts "Hello, World!"`,
  },

  {
    label: "PHP",
    value: "php",
    language_id: 68,
    ext: "main.php",
    default: `<?php

echo "Hello, World!";

?>`,
  },

  {
    label: "C#",
    value: "csharp",
    language_id: 51,
    ext: "main.cs",
    default: `// C#
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  },
];



function Editor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) { editorRef.current = editor; }

  useEffect(() => {
    if (editorRef.current) {
      const lang = LANGUAGES.find((l) => l.value === language);
      editorRef.current.setValue(lang?.default || "");
    }
  }, [language]);

async function runCode() {
  const code = editorRef.current?.getValue();

  if (!code) return;

  setRunning(true);
  setOutput("");
  setActiveTab("output");

  const selected = LANGUAGES.find(
    (l) => l.value === language
  );

  try {
    const res = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          source_code: code,
          language_id: selected.language_id,
          stdin: input,
        }),
      }
    );

    const data = await res.json();

    setOutput(
      data.stdout ||
      data.stderr ||
      data.compile_output ||
      "No Output"
    );
  } catch (err) {
    setOutput("Error: " + err.message);
  } finally {
    setRunning(false);
  }
}

  const selectedLang = LANGUAGES.find((l) => l.value === language);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

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
        
        .ed2-shell {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #060608;
          font-family: 'Outfit', sans-serif;
          color: #fff;
          overflow: hidden;
        }

        .ed2-workspace {
          flex: 1;
          display: flex;
          overflow: hidden;
          padding: 12px;
          gap: 12px;
        }

        .ed2-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #0d0d11;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden;
        }

        /* Tab bar */
        .ed2-tabbar {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 4px;
          height: 40px;
          gap: 2px;
          flex-shrink: 0;
        }

        .ed2-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 14px;
          height: 100%;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          letter-spacing: 0.3px;
          white-space: nowrap;
          user-select: none;
        }

        .ed2-tab:hover { color: rgba(255,255,255,0.65); }
        .ed2-tab.active { color: #3ECF8E; border-bottom-color: #3ECF8E; }

        .ed2-tab-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        .ed2-tab.active .ed2-tab-dot { background: #3ECF8E; }

        /* Tab content */
        .ed2-tab-content { flex: 1; position: relative; overflow: hidden; }

        .ed2-pane {
          position: absolute;
          inset: 0;
          display: none;
        }

        .ed2-pane.visible { display: flex; flex-direction: column; }

        .ed2-input-area {
          flex: 1;
          padding: 20px 24px;
          resize: none;
          background: transparent;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          border: none;
          outline: none;
          line-height: 1.8;
        }

        .ed2-input-area::placeholder { color: rgba(255,255,255,0.2); }

        .ed2-output-area {
          flex: 1;
          padding: 20px 24px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #3ECF8E;
          line-height: 1.85;
          overflow: auto;
          white-space: pre-wrap;
          word-break: break-words;
        }

        .ed2-output-placeholder { color: rgba(255,255,255,0.2); font-style: italic; }

        /* Bottom toolbar */
        .ed2-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 44px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          flex-shrink: 0;
          gap: 12px;
        }

        .ed2-toolbar-left { display: flex; align-items: center; gap: 8px; }
        .ed2-toolbar-right { display: flex; align-items: center; gap: 8px; }

        .ed2-lang-select {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 7px;
          color: rgba(255,255,255,0.7);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          padding: 5px 10px;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
          appearance: none;
          -webkit-appearance: none;
          padding-right: 24px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
        }

        .ed2-lang-select:hover { border-color: rgba(255,255,255,0.2); }
        .ed2-lang-select option { background: #0d0d11; color: #fff; }

        .ed2-status {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.5px;
        }

        .ed2-run-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 18px;
          background: #3ECF8E;
          color: #000;
          border: none;
          border-radius: 7px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: -0.2px;
          box-shadow: 0 0 16px rgba(62,207,142,0.2);
        }

        .ed2-run-btn:hover:not(:disabled) {
          background: #4fe09e;
          box-shadow: 0 0 20px rgba(62,207,142,0.3);
          transform: translateY(-1px);
        }

        .ed2-run-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        .ed2-run-spinner {
          width: 12px; height: 12px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: edSpin 0.7s linear infinite;
        }

        @keyframes edSpin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="ed2-shell">
        <Header />

        <div className="ed2-workspace">
          <div className="ed2-panel">
            {/* Tab bar */}
            <div className="ed2-tabbar">
              {["code", "input", "output"].map((tab) => (
                <div
                  key={tab}
                  className={`ed2-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="ed2-tab-dot" />
                  {tab === "code" ? selectedLang?.ext || "code.js" : tab}
                </div>
              ))}
            </div>

            {/* Tab content */}
            <div className="ed2-tab-content">
              {/* Code pane */}
              <div className={`ed2-pane ${activeTab === "code" ? "visible" : ""}`}>
                <MonacoEditor
                  height="100%"
                  language={language}
                  defaultValue={LANGUAGES[0].default}
                  theme="vs-dark"
                  onMount={handleEditorDidMount}
                  options={{
                    fontSize: 13,
                    minimap: { enabled: false },
                    padding: { top: 20, bottom: 20 },
                    scrollBeyondLastLine: false,
                    fontFamily: "IBM Plex Mono, Fira Code, monospace",
                    fontLigatures: true,
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    lineHeight: 1.8,
                    renderLineHighlight: "gutter",
                    lineNumbersMinChars: 3,
                  }}
                />
              </div>

              {/* Input pane */}
              <div className={`ed2-pane ${activeTab === "input" ? "visible" : ""}`}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter stdin input here..."
                  className="ed2-input-area"
                />
              </div>

              {/* Output pane */}
              <div className={`ed2-pane ${activeTab === "output" ? "visible" : ""}`}>
                <div className="ed2-output-area">
                  {running ? (
                    <span className="ed2-output-placeholder">Running...</span>
                  ) : output ? (
                    output
                  ) : (
                    <span className="ed2-output-placeholder">Output will appear here after running...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="ed2-toolbar">
              <div className="ed2-toolbar-left">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="ed2-lang-select"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
                <span className="ed2-status">UTF-8 · LF</span>
              </div>
              <div className="ed2-toolbar-right">
                <button onClick={runCode} disabled={running} className="ed2-run-btn">
                  {running ? (
                    <span className="ed2-run-spinner" />
                  ) : (
                    <Play size={12} strokeWidth={2.5} />
                  )}
                  {running ? "Running..." : "Run"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editor;
