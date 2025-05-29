// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// // updated import name
// import { fetchUserReviews, deleteReview } from '../../store/reviews';

// export default function ManageReviews() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // now pulled from state.reviews.currentUser
//   const reviewsObj = useSelector(state => state.reviews.currentUser);
//   const reviews = reviewsObj ? Object.values(reviewsObj) : [];

//   useEffect(() => {
//     dispatch(fetchUserReviews());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       dispatch(deleteReview(id));
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/reviews/${id}/edit`);
//   };

//   return (
//     <div className="manage-reviews">
//       <h1>Manage Reviews</h1>
//       {reviews.length === 0
//         ? <p>You have no reviews.</p>
//         : (
//           <ul className="reviews-list">
//             {reviews.map(review => {
//               const date = new Date(review.createdAt);
//               const formattedDate = date.toLocaleString('default', {
//                 month: 'long',
//                 year: 'numeric'
//               });

//               return (
//                 <li key={review.id} className="review-item">
//                   <h2>{review.Spot?.name || 'Spot name unavailable'}</h2>
//                   <p className="review-date">{formattedDate}</p>
//                   <p className="review-text">{review.review}</p>
//                   <div className="review-actions">
//                     <button onClick={() => handleUpdate(review.id)}>
//                       Update
//                     </button>
//                     <button onClick={() => handleDelete(review.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         )
//       }
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchUserReviews, deleteReview } from '../../store/reviews';
// import './ManageReviews.css'; // You'll need to create this CSS file

// export default function ManageReviews() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);

//   // Get user reviews from Redux store
//   const userReviews = useSelector(state => state.reviews.currentUser);
//   // Convert the object to an array for mapping
//   const reviewsArray = Object.values(userReviews || {});

//   useEffect(() => {
//     // Fetch user reviews and handle loading state
//     const loadReviews = async () => {
//       setIsLoading(true);
//       try {
//         await dispatch(fetchUserReviews());
//       } catch (error) {
//         console.error("Failed to load reviews:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     loadReviews();
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await dispatch(deleteReview(id));
//       } catch (error) {
//         console.error("Failed to delete review:", error);
//         alert("There was a problem deleting your review. Please try again.");
//       }
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/reviews/${id}/edit`);
//   };

//   if (isLoading) {
//     return <div className="loading">Loading your reviews...</div>;
//   }

//   return (
//     <div className="manage-reviews-container">
//       <h1>Manage Reviews</h1>
      
//       {reviewsArray.length === 0 ? (
//         <p className="no-reviews-message">You haven't posted any reviews yet.</p>
//       ) : (
//         <div className="reviews-list">
//           {reviewsArray.map(review => {
//             const date = new Date(review.createdAt);
//             const formattedDate = date.toLocaleString('default', {
//               month: 'long',
//               year: 'numeric'
//             });
            
//             return (
//               <div key={review.id} className="review-card">
//                 <div className="review-header">
//                   <h2 className="spot-name">{review.Spot?.name || 'Unnamed Location'}</h2>
//                   <div className="review-stars">
//                     {Array(review.stars).fill().map((_, i) => (
//                       <span key={i} className="star">★</span>
//                     ))}
//                   </div>
//                 </div>
                
//                 <p className="review-date">{formattedDate}</p>
//                 <p className="review-text">{review.review}</p>
                
//                 {review.Spot?.previewImage && (
//                   <div className="spot-image-container">
//                     <img 
//                       src={review.Spot.previewImage} 
//                       alt={review.Spot?.name || 'Spot'} 
//                       className="spot-preview-image"
//                     />
//                   </div>
//                 )}
                
//                 <div className="review-actions">
//                   <button 
//                     onClick={() => handleUpdate(review.id)}
//                     className="update-button"
//                   >
//                     Update
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(review.id)}
//                     className="delete-button"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserReviews, deleteReview } from '../../store/reviews';
// import './ManageReviews.css';

// export default function ManageReviews() {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true);

//   // Pull in the currentUser reviews slice
//   const userReviews = useSelector(state => state.reviews.currentUser);
//   const reviewsArray = Object.values(userReviews || {});


//     const currentUser = useSelector(state => state.session.user);
//   console.log('🔍 Current front-end user:', currentUser);

//   useEffect(() => {
//     setIsLoading(true);
//     dispatch(fetchUserReviews())
//       .catch(console.error)
//       .finally(() => setIsLoading(false));
//   }, [dispatch]);

//   const handleDelete = (reviewId) => {
//     if (!window.confirm('Are you sure you want to delete this review?')) return;
//     dispatch(deleteReview(reviewId))
//       .catch(err => {
//         console.error(err);
//         alert('Could not delete review. Please try again.');
//       });
//   };

//   if (isLoading) return <div className="loading">Loading your reviews…</div>;

//   return (
//     <div className="manage-reviews-container">
//       <h1>Manage Reviews</h1>

//       {reviewsArray.length === 0
//         ? <p className="no-reviews-message">You haven’t posted any reviews yet.</p>
//         : (
//           <div className="reviews-list">
//             {reviewsArray.map(review => {
//               const date = new Date(review.createdAt).toLocaleString('default', {
//                 month: 'long', year: 'numeric'
//               });

//               return (
//                 <div key={review.id} className="review-card">
//                   <div className="review-header">
//                     <h2 className="spot-name">{review.Spot?.name || 'Unnamed Spot'}</h2>
//                     <div className="review-stars">
//                       {Array(review.stars).fill().map((_, i) => <span key={i}>★</span>)}
//                     </div>
//                   </div>

//                   <p className="review-date">{date}</p>
//                   <p className="review-text">{review.review}</p>

//                   {review.Spot?.previewImage && (
//                     <img
//                       src={review.Spot.previewImage}
//                       alt={`${review.Spot.name} preview`}
//                       className="spot-preview-image"
//                     />
//                   )}

//                   <div className="review-actions">
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDelete(review.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )
//       }
//     </div>
//   );
// }







import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReviews, deleteReview } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../Reviews/ReviewFormModal';
import './ManageReviews.css';

export default function ManageReviews() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Pull in the currentUser reviews slice
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