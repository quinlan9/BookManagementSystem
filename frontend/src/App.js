import './App.css';
import React from 'react';
import InstructorApp from './component/InstructorApp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateBook from './component/UpdateBook';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<InstructorApp />} />
          <Route path="/update/:id" element={<UpdateBook />} />
        </Routes>
      </div>
    </Router>  
  );
}

export default App;
