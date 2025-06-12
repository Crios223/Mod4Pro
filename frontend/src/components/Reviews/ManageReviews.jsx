import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReviews, deleteReview } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../Reviews/ReviewFormModal';
import './ManageReviews.css';

export default function ManageReviews() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  
  const userReviews = useSelector(state => state.reviews.currentUser);
  const reviewsArray = Object.values(userReviews || {});

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUserReviews())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const handleDelete = reviewId => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    dispatch(deleteReview(reviewId))
      .then(() => dispatch(fetchUserReviews()))
      .catch(err => {
        console.error(err);
        alert('Could not delete review. Please try again.');
      });
  };

  if (isLoading) return <div className="loading">Loading your reviews…</div>;

  return (
    <div className="manage-reviews-container">
      <h1>Manage Reviews</h1>

      {reviewsArray.length === 0 ? (
        <p className="no-reviews-message">
          You haven’t posted any reviews yet.
        </p>
      ) : (
        <div className="reviews-list">
          {reviewsArray.map(review => {
            const date = new Date(review.createdAt).toLocaleString('default', {
              month: 'long',
              year: 'numeric'
            });

            return (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <h2 className="spot-name">
                    {review.Spot?.name || 'Unnamed Spot'}
                  </h2>
                  <div className="review-stars">
                    {Array(review.stars).fill().map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                <p className="review-date">{date}</p>
                <p className="review-text">{review.review}</p>

                {review.Spot?.previewImage && (
                  <img
                    src={review.Spot.previewImage}
                    alt={`${review.Spot.name} preview`}
                    className="spot-preview-image"
                  />
                )}

                <div className="review-actions">
                  <OpenModalButton
                    buttonText="Update"
                    modalComponent={
                      <ReviewFormModal
                        spotId={review.spotId}
                        review={review}
                        onSuccess={() => dispatch(fetchUserReviews())}
                      />
                    }
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}