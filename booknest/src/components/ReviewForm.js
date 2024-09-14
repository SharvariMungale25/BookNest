import React, { useState } from 'react';

const ReviewForm = ({ bookId, onReviewSubmit }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(1);
  const [showModal, setShowModal] = useState(false);
  
  // Toggle modal visibility
  const handleModalToggle = () => {
    setShowModal(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ text, rating }),
      });

      if (!response.ok){
        const errorResponse = await response.json(); // Get response body
        console.log('Response Error:', errorResponse); // Debugging
        throw new Error('Failed to add review');
      } 
      // Reset form fields
      setText('');
      setRating(1);
      // Close the modal
      handleModalToggle();
      await onReviewSubmit(); // Refresh book reviews
     // navigate('/book-list');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container my-3">
      {/* Button to trigger the modal */}
      <button className="btn btn-primary" onClick={handleModalToggle}>
        Add Review
      </button>

      {/* Modal for review form */}
      {showModal && (
        <>
          <div className="modal fade show d-block" id={`reviewModal-${bookId}`} tabIndex="-1" aria-labelledby={`reviewModalLabel-${bookId}`} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={`reviewModalLabel-${bookId}`}>Add Review</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleModalToggle}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor={`review-${bookId}`} className="form-label">Review</label>
                      <textarea
                        className="form-control"
                        id={`review-${bookId}`}
                        rows="3"
                        placeholder="Write your review"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`rating-${bookId}`} className="form-label">Rating</label>
                      <input
                        type="number"
                        className="form-control"
                        id={`rating-${bookId}`}
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default ReviewForm;
