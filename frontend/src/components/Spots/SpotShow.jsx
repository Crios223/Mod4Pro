// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpot } from '../../store/spots';


// export default function SpotShow() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
//   const spot = useSelector(state => state.spots.singleSpot);

//   useEffect(() => {
//     dispatch(fetchSpot(spotId));
//   }, [dispatch, spotId]);

//   if (!spot.id) return <div>Loading…</div>;

//   return (
//     <div className="spot-show">
//       <h2>{spot.name}</h2>
//       <img src={spot.previewImage} alt={spot.name} />
//       <p>{spot.city}, {spot.state}, {spot.country}</p>
//       <p>${spot.price} per night</p>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpot } from '../../store/spots';
// import { fetchReviews, deleteReview } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import ReviewFormModal from '../Reviews/ReviewFormModal.jsx';

// export default function SpotShow() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
//   const spot = useSelector(state => state.spots.singleSpot);
//   const currentUser = useSelector(state => state.session.user);
//   const reviewsObj = useSelector(state => state.reviews.bySpot[spotId] || {});
//   const reviews = Object.values(reviewsObj);

//   const [showPostBtn, setShowPostBtn] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchSpot(spotId));
//     dispatch(fetchReviews(spotId));
//   }, [dispatch, spotId]);

//   useEffect(() => {
//     if (!currentUser) {
//       setShowPostBtn(false);
//       return;
//     }
//     if (spot.ownerId === currentUser.id) {
//       setShowPostBtn(false);
//       return;
//     }
//     const hasReviewed = reviews.some(r => r.userId === currentUser.id);
//     setShowPostBtn(!hasReviewed);
//   }, [currentUser, spot.ownerId, reviews]);

//   const handleDelete = async () => {
//     await dispatch(deleteReview(deleteId));
//     await dispatch(fetchReviews(spotId));
//     await dispatch(fetchSpot(spotId));
//     setDeleteId(null);
//   };

//   if (!spot.id) return <div>Loading…</div>;

//   return (
//     <div className="spot-show">
//       <h2>{spot.name}</h2>
//       <img src={spot.previewImage} alt={spot.name} />
//       <p>{spot.city}, {spot.state}, {spot.country}</p>
//       <p>${spot.price} per night</p>

//       <h3>
//         ★ {spot.avgStarRating || 'New'} · {reviews.length} review{reviews.length !== 1 && 's'}
//       </h3>

//       {showPostBtn && (
//         <OpenModalButton
//           buttonText="Post Your Review"
//           modalComponent={
//             <ReviewFormModal
//               spotId={spotId}
//               onSuccess={() => {
//                 dispatch(fetchReviews(spotId));
//                 dispatch(fetchSpot(spotId));
//               }}
//             />
//           }
//         />
//       )}

//       <ul className="reviews-list">
//         {reviews.map(r => (
//           <li key={r.id} className="review-item">
//             <p><strong>{r.User?.firstName}</strong> · {r.stars} ★</p>
//             <p>{r.review}</p>
//             {currentUser?.id === r.userId && (
//               <button onClick={() => setDeleteId(r.id)}>Delete</button>
//             )}
//           </li>
//         ))}
//       </ul>

//       {deleteId && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to delete this review?</p>
//             <button className="danger" onClick={handleDelete}>
//               Yes (Delete Review)
//             </button>
//             <button onClick={() => setDeleteId(null)}>
//               No (Keep Review)
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpot } from '../../store/spots';
// import { fetchReviews, deleteReview } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import ReviewFormModal from '../Reviews/ReviewFormModal.jsx';
// import './SpotShow.css';

// export default function SpotShow() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
//   const spot = useSelector(state => state.spots.singleSpot);
//   const currentUser = useSelector(state => state.session.user);
//   const reviewsObj = useSelector(state => state.reviews.bySpot[spotId] || {});
//   const reviews = Object.values(reviewsObj);

//   const [showPostBtn, setShowPostBtn] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchSpot(spotId));
//     dispatch(fetchReviews(spotId));
//   }, [dispatch, spotId]);

//   useEffect(() => {
//     if (!currentUser) return setShowPostBtn(false);
//     if (spot.ownerId === currentUser.id) return setShowPostBtn(false);
//     const hasReviewed = reviews.some(r => r.userId === currentUser.id);
//     setShowPostBtn(!hasReviewed);
//   }, [currentUser, spot.ownerId, reviews]);

//   const handleDelete = async () => {
//     await dispatch(deleteReview(deleteId));
//     dispatch(fetchReviews(spotId));
//     dispatch(fetchSpot(spotId));
//     setDeleteId(null);
//   };

//   if (!spot.id) return <div>Loading…</div>;

//   return (
//     <div className="spot-show">
//       <h2 className="spot-title">{spot.name}</h2>
//       <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>

//       <div className="spot-gallery">
//         <div className="gallery-main">
//           <img src={spot.previewImage} alt={spot.name} />
//         </div>
//         <div className="gallery-thumbs">
//           {spot.SpotImages?.filter(img => !img.preview).map(img => (
//             <img key={img.id} src={img.url} alt={`${spot.name} thumbnail`} />
//           ))}
//         </div>
//       </div>

//       <div className="spot-owner-desc">
//         <div className="owner-desc-text">
//           <p className="spot-hosted">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
//           <p className="spot-desc">{spot.description}</p>
//         </div>
//         <div className="reserve-box">
//           <p><strong>${spot.price}</strong> / night</p>
//           <button onClick={() => alert('Feature coming soon!')}>Reserve</button>
//         </div>
//       </div>

//       <div className="spot-reviews">
//         <h3>★ {spot.avgStarRating || 'New'} · {reviews.length} review{reviews.length !== 1 && 's'}</h3>
//         {showPostBtn && (
//           <OpenModalButton
//             buttonText="Post Your Review"
//             modalComponent={
//               <ReviewFormModal
//                 spotId={spotId}
//                 onSuccess={() => {
//                   dispatch(fetchReviews(spotId));
//                   dispatch(fetchSpot(spotId));
//                 }}
//               />
//             }
//           />
//         )}
//         <ul className="reviews-list">
//           {reviews.map(r => (
//             <li key={r.id} className="review-item">
//               <p><strong>{r.User.firstName}</strong> · {r.stars} ★</p>
//               <p>{r.review}</p>
//               {currentUser?.id === r.userId && (
//                 <button onClick={() => setDeleteId(r.id)}>Delete</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {deleteId && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to delete this review?</p>
//             <button className="danger" onClick={handleDelete}>
//               Yes (Delete Review)
//             </button>
//             <button onClick={() => setDeleteId(null)}>
//               No (Keep Review)
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpot } from '../../store/spots';
// import { fetchReviews, deleteReview } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import ReviewFormModal from '../Reviews/ReviewFormModal.jsx';
// import './SpotShow.css';

// export default function SpotShow() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
//   const spot = useSelector(state => state.spots.singleSpot);
//   const currentUser = useSelector(state => state.session.user);
//   const reviewsObj = useSelector(state => state.reviews.bySpot[spotId] || {});
//   const reviews = Object.values(reviewsObj);

//   const [showPostBtn, setShowPostBtn] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchSpot(spotId));
//     dispatch(fetchReviews(spotId));
//   }, [dispatch, spotId]);

//   useEffect(() => {
//     if (!currentUser) return setShowPostBtn(false);
//     if (spot.ownerId === currentUser.id) return setShowPostBtn(false);
//     const hasReviewed = reviews.some(r => r.userId === currentUser.id);
//     setShowPostBtn(!hasReviewed);
//   }, [currentUser, spot.ownerId, reviews]);

//   const handleDelete = async () => {
//     await dispatch(deleteReview(deleteId));
//     dispatch(fetchReviews(spotId));
//     dispatch(fetchSpot(spotId));
//     setDeleteId(null);
//   };

//   if (!spot.id) return <div>Loading…</div>;

//   return (
//     <div className="spot-show">
//       <h2 className="spot-title">{spot.name}</h2>
//       <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>

//       <div className="spot-gallery">
//         <div className="gallery-main">
//           <img src={spot.previewImage} alt={spot.name} />
//         </div>
//         <div className="gallery-thumbs">
//           {spot.SpotImages?.filter(img => !img.preview).map(img => (
//             <img key={img.id} src={img.url} alt={`${spot.name} thumbnail`} />
//           ))}
//         </div>
//       </div>

//       <div className="spot-owner-desc">
//         <div className="owner-desc-text">
//           <p className="spot-hosted">Hosted by {spot.Owner?.firstName || ''} {spot.Owner?.lastName || ''}</p>
//           <p className="spot-desc">{spot.description}</p>
//         </div>
//         <div className="reserve-box">
//           <p><strong>${spot.price}</strong> / night</p>
//           <button onClick={() => alert('Feature coming soon!')}>Reserve</button>
//         </div>
//       </div>

//       <div className="spot-reviews">
//         <h3>★ {spot.avgStarRating || 'New'} · {reviews.length} review{reviews.length !== 1 && 's'}</h3>
//         {showPostBtn && (
//           <OpenModalButton
//             buttonText="Post Your Review"
//             modalComponent={
//               <ReviewFormModal
//                 spotId={spotId}
//                 onSuccess={() => {
//                   dispatch(fetchReviews(spotId));
//                   dispatch(fetchSpot(spotId));
//                 }}
//               />
//             }
//           />
//         )}
//         <ul className="reviews-list">
//           {reviews.map(r => (
//             <li key={r.id} className="review-item">
//               <p><strong>{r.User?.firstName || ''}</strong> · {r.stars} ★</p>
//               <p>{r.review}</p>
//               {currentUser?.id === r.userId && (
//                 <button onClick={() => setDeleteId(r.id)}>Delete</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {deleteId && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to delete this review?</p>
//             <button className="danger" onClick={handleDelete}>
//               Yes (Delete Review)
//             </button>
//             <button onClick={() => setDeleteId(null)}>
//               No (Keep Review)
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpot } from '../../store/spots';
// import { fetchReviews, deleteReview } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import ReviewFormModal from '../Reviews/ReviewFormModal.jsx';
// import './SpotShow.css';

// export default function SpotShow() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
//   const spot = useSelector(state => state.spots.singleSpot);
//   const currentUser = useSelector(state => state.session.user);
//   const reviewsObj = useSelector(state => state.reviews.bySpot[spotId] || {});
//   const reviews = Object.values(reviewsObj);

//   const hasReviewed = reviews.some(r => r.userId === currentUser?.id);
//   const showPostBtn = Boolean(currentUser) && spot.ownerId !== currentUser?.id && !hasReviewed;
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchSpot(spotId));
//     dispatch(fetchReviews(spotId));
//   }, [dispatch, spotId]);

//   const handleDelete = async () => {
//     await dispatch(deleteReview(deleteId));
//     dispatch(fetchReviews(spotId));
//     dispatch(fetchSpot(spotId));
//     setDeleteId(null);
//   };

//   if (!spot.id) return <div>Loading…</div>;

//   // Determine main image: use previewImage if provided, else first SpotImages with preview flag, else first image
//   const mainImageUrl = spot.previewImage
//     || spot.SpotImages?.find(img => img.preview)?.url
//     || spot.SpotImages?.[0]?.url
//     || '';

//   return (
//     <div className="spot-show">
//       <h2 className="spot-title">{spot.name}</h2>
//       <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>

//       <div className="spot-gallery">
//         <div className="gallery-main">
//           {mainImageUrl
//             ? <img src={mainImageUrl} alt={spot.name} />
//             : <div className="no-image">No image available</div>
//           }
//         </div>
//         <div className="gallery-thumbs">
//           {spot.SpotImages?.filter(img => !img.preview).map(img => (
//             <img key={img.id} src={img.url} alt={`${spot.name} thumbnail`} />
//           ))}
//         </div>
//       </div>

//       <div className="spot-owner-desc">
//         <div className="owner-desc-text">
//           <p className="spot-hosted">Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</p>
//           <p className="spot-desc">{spot.description}</p>
//         </div>
//         <div className="reserve-box">
//           <p><strong>${spot.price}</strong> / night</p>
//           <button onClick={() => alert('Feature coming soon!')}>Reserve</button>
//         </div>
//       </div>

//       <div className="spot-reviews">
//         <h3>★ {spot.avgStarRating || 'New'} · {reviews.length} review{reviews.length !== 1 && 's'}</h3>
//         {showPostBtn && (
//           <OpenModalButton
//             buttonText="Post Your Review"
//             modalComponent={
//               <ReviewFormModal spotId={spotId} onSuccess={() => {
//                 dispatch(fetchReviews(spotId));
//                 dispatch(fetchSpot(spotId));
//               }} />
//             }
//           />
//         )}
//         <ul className="reviews-list">
//           {reviews.map(r => (
//             <li key={r.id} className="review-item">
//               <p><strong>{r.User?.firstName}</strong> · {r.stars} ★</p>
//               <p>{r.review}</p>
//               {currentUser?.id === r.userId && (
//                 <button onClick={() => setDeleteId(r.id)}>Delete</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {deleteId && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to delete this review?</p>
//             <button className="danger" onClick={handleDelete}>Yes (Delete Review)</button>
//             <button onClick={() => setDeleteId(null)}>No (Keep Review)</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpot } from '../../store/spots';
// import { fetchReviews, deleteReview } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import ReviewFormModal from '../Reviews/ReviewFormModal.jsx';
// import './SpotShow.css';

// export default function SpotShow() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
  
//   // Safely get the spot with default empty object
//   const spot = useSelector(state => state.spots.singleSpot || {});
//   const currentUser = useSelector(state => state.session.user);
  
//   // Make sure reviews.bySpot exists before trying to access it
//   const reviewsObj = useSelector(state => 
//     state.reviews && state.reviews.bySpot ? 
//     (state.reviews.bySpot[spotId] || {}) : 
//     {}
//   );
  
//   // Convert reviews object to array safely
//   const reviews = Object.values(reviewsObj);

//   // Check if current user has already reviewed this spot
//   const hasReviewed = currentUser ? 
//     reviews.some(r => r.userId === currentUser.id) : 
//     false;
  
//   // Determine if we should show the post button
//   const showPostBtn = Boolean(currentUser) && 
//     spot && spot.ownerId !== (currentUser?.id) && 
//     !hasReviewed;
  
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     // Only dispatch if spotId is valid
//     if (spotId) {
//       dispatch(fetchSpot(spotId));
//       dispatch(fetchReviews(spotId));
//     }
//   }, [dispatch, spotId]);

//   const handleDelete = async () => {
//     if (!deleteId) return;
    
//     try {
//       await dispatch(deleteReview(deleteId));
//       dispatch(fetchReviews(spotId));
//       dispatch(fetchSpot(spotId));
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     } finally {
//       setDeleteId(null);
//     }
//   };

//   // Show loading state if spot data isn't loaded yet
//   if (!spot || !spot.id) return <div className="loading">Loading…</div>;

//   // Safely determine main image URL
//   const mainImageUrl = spot.previewImage
//     || (spot.SpotImages && spot.SpotImages.length > 0 && 
//         (spot.SpotImages.find(img => img && img.preview)?.url || 
//          spot.SpotImages[0]?.url))
//     || '';

//   return (
//     <div className="spot-show">
//       <h2 className="spot-title">{spot.name || 'Unnamed Spot'}</h2>
//       <p className="spot-location">
//         {spot.city || 'Unknown city'}, {spot.state || 'Unknown state'}, {spot.country || 'Unknown country'}
//       </p>

//       <div className="spot-gallery">
//         <div className="gallery-main">
//           {mainImageUrl
//             ? <img src={mainImageUrl} alt={spot.name || 'Spot image'} />
//             : <div className="no-image">No image available</div>
//           }
//         </div>
//         <div className="gallery-thumbs">
//           {spot.SpotImages && spot.SpotImages.length > 0 && 
//             spot.SpotImages
//               .filter(img => img && !img.preview)
//               .map(img => (
//                 <img 
//                   key={img.id} 
//                   src={img.url} 
//                   alt={`${spot.name || 'Spot'} thumbnail`} 
//                 />
//               ))
//           }
//         </div>
//       </div>

//       <div className="spot-owner-desc">
//         <div className="owner-desc-text">
//           <p className="spot-hosted">
//             Hosted by {spot.Owner?.firstName || 'Unknown'} {spot.Owner?.lastName || ''}
//           </p>
//           <p className="spot-desc">{spot.description || 'No description available.'}</p>
//         </div>
//         <div className="reserve-box">
//           <p><strong>${spot.price || '0'}</strong> / night</p>
//           <button onClick={() => alert('Feature coming soon!')}>Reserve</button>
//         </div>
//       </div>

//       <div className="spot-reviews">
//         <h3>
//           ★ {spot.avgStarRating || 'New'} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
//         </h3>
        
//         {showPostBtn && (
//           <OpenModalButton
//             buttonText="Post Your Review"
//             modalComponent={
//               <ReviewFormModal 
//                 spotId={spotId} 
//                 onSuccess={() => {
//                   dispatch(fetchReviews(spotId));
//                   dispatch(fetchSpot(spotId));
//                 }} 
//               />
//             }
//           />
//         )}
        
//         {reviews.length > 0 ? (
//           <ul className="reviews-list">
//             {reviews.map(r => (
//               <li key={r.id} className="review-item">
//                 <p>
//                   <strong>{r.User?.firstName || 'Anonymous'}</strong> · {r.stars || 0} ★
//                 </p>
//                 <p>{r.review || 'No review text'}</p>
//                 {currentUser && r.userId === currentUser.id && (
//                   <button onClick={() => setDeleteId(r.id)}>Delete</button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="no-reviews">No reviews yet for this spot.</p>
//         )}
//       </div>

//       {deleteId && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to delete this review?</p>
//             <button className="danger" onClick={handleDelete}>Yes (Delete Review)</button>
//             <button onClick={() => setDeleteId(null)}>No (Keep Review)</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpot } from '../../store/spots';
// import { fetchReviews, deleteReview } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import ReviewFormModal from '../Reviews/ReviewFormModal.jsx';
// import './SpotShow.css';

// export default function SpotShow() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
  
//   // Safely get the spot with default empty object
//   const spot = useSelector(state => state.spots.singleSpot || {});
//   const currentUser = useSelector(state => state.session.user);
  
//   // Make sure reviews.bySpot exists before trying to access it
//   const reviewsObj = useSelector(state => 
//     state.reviews && state.reviews.bySpot ? 
//     (state.reviews.bySpot[spotId] || {}) : 
//     {}
//   );
  
//   // Convert reviews object to array safely
//   const reviews = Object.values(reviewsObj);

//   // Check if current user has already reviewed this spot
//   const hasReviewed = currentUser ? 
//     reviews.some(r => r.userId === currentUser.id) : 
//     false;
  
//   // Determine if we should show the post button
//   const showPostBtn = Boolean(currentUser) && 
//     spot && spot.ownerId !== (currentUser?.id) && 
//     !hasReviewed;
  
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     // Only dispatch if spotId is valid
//     if (spotId) {
//       dispatch(fetchSpot(spotId));
//       dispatch(fetchReviews(spotId));
//     }
//   }, [dispatch, spotId]);

//   const handleDelete = async () => {
//     if (!deleteId) return;
    
//     try {
//       await dispatch(deleteReview(deleteId));
//       dispatch(fetchReviews(spotId));
//       dispatch(fetchSpot(spotId));
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     } finally {
//       setDeleteId(null);
//     }
//   };

//   // Show loading state if spot data isn't loaded yet
//   if (!spot || !spot.id) return <div className="loading">Loading…</div>;

//   // Safely determine main image URL
//   const mainImageUrl = spot.previewImage
//     || (spot.SpotImages && spot.SpotImages.length > 0 && 
//         (spot.SpotImages.find(img => img && img.preview)?.url || 
//          spot.SpotImages[0]?.url))
//     || '';

//   return (
//     <div className="spot-show">
//       <h2 className="spot-title">{spot.name || 'Unnamed Spot'}</h2>
//       <p className="spot-location">
//         {spot.city || 'Unknown city'}, {spot.state || 'Unknown state'}, {spot.country || 'Unknown country'}
//       </p>

//       <div className="spot-gallery">
//         <div className="gallery-main">
//           {mainImageUrl
//             ? <img src={mainImageUrl} alt={spot.name || 'Spot image'} />
//             : <div className="no-image">No image available</div>
//           }
//         </div>
//         <div className="gallery-thumbs">
//           {spot.SpotImages && spot.SpotImages.length > 0 && 
//             spot.SpotImages
//               .filter(img => img && !img.preview)
//               .map(img => (
//                 <img 
//                   key={img.id} 
//                   src={img.url} 
//                   alt={`${spot.name || 'Spot'} thumbnail`} 
//                 />
//               ))
//           }
//         </div>
//       </div>

//       <div className="spot-owner-desc">
//         <div className="owner-desc-text">
//           <p className="spot-hosted">
//             Hosted by {spot.Owner?.firstName || 'Unknown'} {spot.Owner?.lastName || ''}
//           </p>
//           <p className="spot-desc">{spot.description || 'No description available.'}</p>
//         </div>
//         <div className="reserve-box">
//           <p><strong>${spot.price || '0'}</strong> / night</p>
//           <button onClick={() => alert('Feature coming soon!')}>Reserve</button>
//         </div>
//       </div>

//       <div className="spot-reviews">
//         <h3>
//           ★ {spot.avgStarRating || 'New'} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
//         </h3>
        
//         {showPostBtn && (
//           <OpenModalButton
//             buttonText="Post Your Review"
//             modalComponent={
//               <ReviewFormModal 
//                 spotId={spotId} 
//                 onSuccess={() => {
//                   dispatch(fetchReviews(spotId));
//                   dispatch(fetchSpot(spotId));
//                 }} 
//               />
//             }
//           />
//         )}
        
//         {reviews.length > 0 ? (
//           <ul className="reviews-list">
//             {reviews.map(r => (
//               <li key={r.id} className="review-item">
//                 <p>
//                   <strong>{r.User?.firstName || 'Anonymous'}</strong> · {r.stars || 0} ★
//                 </p>
//                 <p>{r.review || 'No review text'}</p>
//                 {currentUser && r.userId === currentUser.id && (
//                   <button onClick={() => setDeleteId(r.id)}>Delete</button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="no-reviews">No reviews yet for this spot.</p>
//         )}
//       </div>

//       {deleteId && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to delete this review?</p>
//             <button className="danger" onClick={handleDelete}>Yes (Delete Review)</button>
//             <button onClick={() => setDeleteId(null)}>No (Keep Review)</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useParams }                from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpot }                from '../../store/spots';
// import { fetchReviews, deleteReview } from '../../store/reviews';
// import OpenModalButton             from '../OpenModalButton/OpenModalButton.jsx';
// import ReviewFormModal             from '../Reviews/ReviewFormModal.jsx';
// import './SpotShow.css';

// export default function SpotShow() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
//   const [deleteId, setDeleteId] = useState(null);

//   const spot = useSelector(state => state.spots.singleSpot) || {};
//   const currentUser = useSelector(state => state.session.user);
//   const reviewsObj = useSelector(state =>
//     (state.reviews.bySpot && state.reviews.bySpot[spotId]) || {}
//   );
//   const reviews = Object.values(reviewsObj);

//   const hasReviewed = currentUser
//     ? reviews.some(r => r.userId === currentUser.id)
//     : false;

//   const showPostBtn =
//     currentUser &&
//     spot.ownerId !== currentUser.id &&
//     !hasReviewed;

//   useEffect(() => {
//     if (!spotId) return;
//     dispatch(fetchSpot(spotId));
//     dispatch(fetchReviews(spotId));
//   }, [dispatch, spotId]);

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     try {
//       await dispatch(deleteReview(deleteId, spotId));
//       // refresh both lists
//       dispatch(fetchReviews(spotId));
//       dispatch(fetchSpot(spotId));
//     } catch (e) {
//       console.error('Error deleting review:', e);
//     } finally {
//       setDeleteId(null);
//     }
//   };

//   if (!spot.id) return <div className="loading">Loading…</div>;

//   const mainImageUrl =
//     spot.previewImage ||
//     spot.SpotImages?.find(img => img.preview)?.url ||
//     spot.SpotImages?.[0]?.url ||
//     '';

//   return (
//     <div className="spot-show">
//       {/* ... existing spot details ... */}

//       <div className="spot-reviews">
//         <h3>
//           ★ {spot.avgStarRating || 'New'} · {reviews.length}{' '}
//           review{reviews.length !== 1 && 's'}
//         </h3>

//         {showPostBtn && (
//           <OpenModalButton
//             buttonText="Post Your Review"
//             modalComponent={
//               <ReviewFormModal
//                 spotId={spotId}
//                 onSuccess={() => {
//                   dispatch(fetchReviews(spotId));
//                   dispatch(fetchSpot(spotId));
//                 }}
//               />
//             }
//           />
//         )}

//         {reviews.length > 0 ? (
//           <ul className="reviews-list">
//             {reviews.map(r => (
//               <li key={r.id} className="review-item">
//                 <p>
//                   <strong>{r.User?.firstName || 'Anonymous'}</strong> ·{' '}
//                   {r.stars || 0} ★
//                 </p>
//                 <p>{r.review || 'No review text'}</p>

//                 {currentUser?.id === r.userId && (
//                   <div className="review-actions">
//                     <OpenModalButton
//                       buttonText="Update"
//                       modalComponent={
//                         <ReviewFormModal
//                           spotId={spotId}
//                           review={r}
//                           onSuccess={() => {
//                             dispatch(fetchReviews(spotId));
//                             dispatch(fetchSpot(spotId));
//                           }}
//                         />
//                       }
//                     />
//                     <button onClick={() => setDeleteId(r.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="no-reviews">No reviews yet for this spot.</p>
//         )}
//       </div>

//       {deleteId && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to delete this review?</p>
//             <button className="danger" onClick={handleDelete}>
//               Yes (Delete Review)
//             </button>
//             <button onClick={() => setDeleteId(null)}>
//               No (Keep Review)
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { useParams }                from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot }                from '../../store/spots';
import { fetchReviews, deleteReview } from '../../store/reviews';
import OpenModalButton             from '../OpenModalButton/OpenModalButton.jsx';
import ReviewFormModal             from '../Reviews/ReviewFormModal.jsx';
import './SpotShow.css';

export default function SpotShow() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);

  const spot = useSelector(state => state.spots.singleSpot) || {};
  const currentUser = useSelector(state => state.session.user);
  const reviewsObj = useSelector(state =>
    (state.reviews.bySpot && state.reviews.bySpot[spotId]) || {}
  );
  const reviews = Object.values(reviewsObj);

  const hasReviewed = currentUser
    ? reviews.some(r => r.userId === currentUser.id)
    : false;

  const showPostBtn =
    currentUser &&
    spot.ownerId !== currentUser.id &&
    !hasReviewed;

  useEffect(() => {
    if (!spotId) return;
    dispatch(fetchSpot(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteReview(deleteId, spotId));
      dispatch(fetchReviews(spotId));
      dispatch(fetchSpot(spotId));
    } catch (e) {
      console.error('Error deleting review:', e);
    } finally {
      setDeleteId(null);
    }
  };

  if (!spot.id) return <div className="loading">Loading…</div>;

  // Determine the main image
  const mainImageUrl =
    spot.previewImage ||
    spot.SpotImages?.find(img => img.preview)?.url ||
    spot.SpotImages?.[0]?.url ||
    '';

  return (
    <div className="spot-show">
      {/* Spot Details */}
      <h2 className="spot-title">{spot.name}</h2>
      <p className="spot-location">
        {spot.city}, {spot.state}, {spot.country}
      </p>

      <div className="spot-gallery">
        <div className="gallery-main">
          {mainImageUrl
            ? <img src={mainImageUrl} alt={spot.name} />
            : <div className="no-image">No image available</div>
          }
        </div>
        <div className="gallery-thumbs">
          {spot.SpotImages
            ?.filter(img => !img.preview)
            .map(img => (
              <img
                key={img.id}
                src={img.url}
                alt={`${spot.name} thumbnail`}
              />
            ))}
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
          <p><strong>${spot.price}</strong> / night</p>
          <button onClick={() => alert('Feature coming soon!')}>
            Reserve
          </button>
        </div>
      </div>

      {/* Reviews Section */}
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
            {reviews.map(r => (
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
                    <button onClick={() => setDeleteId(r.id)}>
                      Delete
                    </button>
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
            <button onClick={() => setDeleteId(null)}>
              No (Keep Review)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}