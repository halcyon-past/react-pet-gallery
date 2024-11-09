import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Header from './components/Header';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </>
);

export default App;