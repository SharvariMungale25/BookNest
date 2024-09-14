import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import ReviewForm from './components/ReviewForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';  // Custom styles (if any)
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import About from './components/About';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">BookNest</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About Us</a>
              </li>
            </ul>
          </div>
        </nav>
        
        <main role="main" className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/book/:id/review" element={<ReviewForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/add-book" element={<BookForm />} />
            <Route path="/book-list" element={<BookList />} />
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
