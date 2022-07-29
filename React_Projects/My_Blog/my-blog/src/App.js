import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import About from "./Pages/About.js";
import Article from "./Pages/Article.js";
import ArticlesListPage from "./Pages/ArticlesListPage.js";
import './App.css';
import Navbar from "./Navbar.js";
import NotFoundPage from "./Pages/NotFoundPage.js";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="page-body">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles-list" element={<ArticlesListPage />} />
          <Route path="/article/:name" element={<Article />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

