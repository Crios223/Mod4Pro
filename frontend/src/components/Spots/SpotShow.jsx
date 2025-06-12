import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spots';
import { fetchReviews, deleteReview } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
import ReviewFormModal from '../Reviews/ReviewFormModal.jsx';
import './SpotShow.css';

export default function SpotShow() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const spot = useSelector((state) => state.spots.singleSpot) || {};
  const currentUser = useSelector((state) => state.session.user);
  const reviewsObj = useSelector(
    (state) => (state.reviews.bySpot && state.reviews.bySpot[spotId]) || {}
  );
  const reviews = Object.values(reviewsObj);

  const hasReviewed = currentUser
    ? reviews.some((r) => r.userId === currentUser.id)
    : false;

  const showPostBtn =
    currentUser && spot.ownerId !== currentUser.id && !hasReviewed;

  useEffect(() => {
    if (!spotId) return;
    dispatch(fetchSpot(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await dispatch(deleteReview(deleteId, spotId));
    dispatch(fetchReviews(spotId));
    dispatch(fetchSpot(spotId));
    setDeleteId(null);
  };

  const handleUpdate = (review) => {
    navigate(`/reviews/${review.id}/edit`);
  };

  if (!spot.id) return <div className="loading">Loading…</div>;

  const mainImageUrl =
    spot.previewImage ||
    spot.SpotImages?.find((img) => img.preview)?.url ||
    spot.SpotImages?.[0]?.url ||
    '';

  return (
    <div className="spot-show">
      <h2 className="spot-title">{spot.name}</h2>
      <p className="spot-location">
        {spot.city}, {spot.state}, {spot.country}
      </p>

      <div className="spot-gallery">
        <div className="gallery-thumbs">
          {spot.SpotImages?.filter((img) => !img.preview).map((img) => (
            <div key={img.id} className="thumb-wrapper">
              <img src={img.url} alt={`${spot.name} thumbnail`} />
            </div>
          ))}
        </div>

        <div className="gallery-main">
          {mainImageUrl ? (
            <div className="spot-image-wrapper">
              <img src={mainImageUrl} alt={spot.name} />
            </div>
          ) : (
            <div className="no-image">No image available</div>
          )}
        </div>
      </div>

      <div className="spot-owner-desc">
        <div className="owner-desc-text">
          <p className="spot-hosted">
            Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
          </p>
          <p className="spot-desc">{spot.description}</p>
        </div>
        <div className="reserve-box">
          <p>
            <strong>${spot.price}</strong> / night
          </p>
          <button onClick={() => alert('Feature coming soon!')}>Reserve</button>
        </div>
      </div>

      <div className="spot-reviews">
        <h3>
          ★ {spot.avgStarRating || 'New'} · {reviews.length}{' '}
          review{reviews.length !== 1 && 's'}
        </h3>

        {showPostBtn && (
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={
              <ReviewFormModal
                spotId={spotId}
                onSuccess={() => {
                  dispatch(fetchReviews(spotId));
                  dispatch(fetchSpot(spotId));
                }}
              />
            }
          />
        )}

        {reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.map((r) => (
              <li key={r.id} className="review-item">
                <p>
                  <strong>{r.User?.firstName}</strong> · {r.stars} ★
                </p>
                <p>{r.review}</p>
                {currentUser?.id === r.userId && (
                  <div className="review-actions">
                    <OpenModalButton
                      buttonText="Update"
                      modalComponent={
                        <ReviewFormModal
                          spotId={spotId}
                          review={r}
                          onSuccess={() => {
                            dispatch(fetchReviews(spotId));
                            dispatch(fetchSpot(spotId));
                          }}
                        />
                      }
                    />
                    <button onClick={() => setDeleteId(r.id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-reviews">No reviews yet for this spot.</p>
        )}
      </div>

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button className="danger" onClick={handleDelete}>
              Yes (Delete Review)
            </button>
            <button onClick={() => setDeleteId(null)}>No (Keep Review)</button>
          </div>
        </div>
      )}
    </div>
  );
}