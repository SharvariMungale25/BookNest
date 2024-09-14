import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ title, author, year }),
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Get response body
        console.log('Response Error:', errorResponse); // Debugging
        throw new Error('Failed to create book');
      }

      const result = await response.json();
      console.log('Book Added:', result);
      navigate('/book-list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Add Your Book</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter book title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    placeholder="Enter author's name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    placeholder="Enter publication year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Book</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
