import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/header";
import Home from "./Pages/home";
import Docs from "./Pages/docs";
import Contact from "./Pages/contact";
import Editor from "./Pages/editor";
import Login from "./Pages/login";
import NotFound from "./Pages/404notfound";
import Loader from './Components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/home" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;