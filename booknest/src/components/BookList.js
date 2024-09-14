import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', year: '' });
  const [reviews, setReviews] = useState({}); // Object to store reviews keyed by book ID
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books/', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
        });

        if (!response.ok) throw new Error('Failed to fetch books');

        const data = await response.json();
        setBooks(data);

        // Fetch reviews for each book
        const reviewsData = {};
        for (const book of data) {
          const reviewResponse = await fetch(`http://localhost:5000/api/books/${book._id}/reviews`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
          });

          if (!reviewResponse.ok) throw new Error('Failed to fetch reviews');

          reviewsData[book._id] = await reviewResponse.json();
        }
        setReviews(reviewsData);

      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchBooks();
  }, []); 

  const handleDelete = async (id) => {
    // Ask for user confirmation before proceeding
    const confirmed = window.confirm('Are you sure you want to delete this book?');
  
    if (!confirmed) {
      return; // Exit if the user cancels
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Get response body
        console.error('Response Error:', errorResponse); // Debugging
        throw new Error(errorResponse.message || 'Failed to delete book');
      }
  
      setBooks(books.filter((book) => book._id !== id));
      setReviews((prevReviews) => {
        const { [id]: _, ...rest } = prevReviews;
        return rest;
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  const handleEditClick = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/books/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update book');

      const updatedBook = await response.json();
      setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
      setEditingId(null);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAddBookClick = () => {
    navigate('/add-book'); // Navigate to the BookForm page
  };

  // Callback to handle review submission
  const handleReviewSubmit = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}/reviews`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
      });

      if (!response.ok) throw new Error('Failed to fetch reviews');

      const reviewsData = await response.json();
      setReviews(prevReviews => ({ ...prevReviews, [bookId]: reviewsData }));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container">
      <h2 className='my-3'>Reading Haven - Suggests a cozy and inviting space for books.</h2>
      <button onClick={handleAddBookClick} className="btn btn-primary mb-3 ny-3">Add New Book</button> 
      <div className="row">
        {books.length ? (
          books.map((book) => (
            <div key={book._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  {editingId === book._id ? (
                    <form onSubmit={handleUpdate}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="Enter book title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input
                          type="text"
                          className="form-control"
                          id="author"
                          name="author"
                          placeholder="Enter author's name"
                          value={formData.author}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="year" className="form-label">Year</label>
                        <input
                          type="number"
                          className="form-control"
                          id="year"
                          name="year"
                          placeholder="Enter publication year"
                          value={formData.year}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-success me-2">Update Book</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <h5 className="card-title">{book.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                      <p className="card-text">Published in {book.year}</p>
                      <button
                        onClick={() => handleEditClick(book)}
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>

                      <ReviewForm bookId={book._id} onReviewSubmit={() => handleReviewSubmit(book._id)} />

                      {/* Display reviews */}
                      {reviews[book._id] && reviews[book._id].length ? (
                        <div className="mt-3">
                          <h6>Reviews:</h6>
                          <ul className="list-group">
                            {reviews[book._id].map((review) => (
                              <li key={review._id} className="list-group-item my-2">
                                <p><strong>Rating:</strong> {review.rating}</p>
                                <p>{review.text}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p>No reviews available</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
