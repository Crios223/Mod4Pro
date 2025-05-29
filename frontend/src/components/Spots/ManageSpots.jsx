// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentSpots, deleteSpot } from '../../store/spots';
// import { useNavigate, Link } from 'react-router-dom';

// export default function ManageSpots() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const spots     = useSelector(s => Object.values(s.spots.userSpots));
//   const [toDelete, setToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCurrentSpots());
//   }, [dispatch]);

//   const confirmDelete = id => {
//     setToDelete(id);
//   };

//   const handleDelete = async () => {
//     await dispatch(deleteSpot(toDelete));
//     setToDelete(null);
//   };

//   return (
//     <div className="manage-spots-page">
//       <h1>Manage Spots</h1>

//       {spots.length === 0 ? (
//         <div>
//           <p>You have no spots yet.</p>
//           <Link to="/spots/new">Create a New Spot</Link>
//         </div>
//       ) : (
//         <div className="spot-grid">
//           {spots.map(spot => (
//             <div key={spot.id} className="spot-card">
//               <div
//                 onClick={() => navigate(`/spots/${spot.id}`)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <img src={spot.previewImage} alt={spot.name} />
//                 <div>{spot.city}, {spot.state}</div>
//                 <div>${spot.price} / night</div>
//               </div>
//               <div className="spot-actions">
//                 <button
//                   onClick={() => navigate(`/spots/${spot.id}/edit`)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => confirmDelete(spot.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {toDelete !== null && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to remove this spot?</p>
//             <button className="danger" onClick={handleDelete}>
//               Yes (Delete Spot)
//             </button>
//             <button onClick={() => setToDelete(null)}>
//               No (Keep Spot)
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentSpots, deleteSpot } from '../../store/spots';
// import { useNavigate, Link } from 'react-router-dom';

// export default function ManageSpots() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const spots = useSelector(state => Object.values(state.spots.userSpots));
//   const [toDelete, setToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCurrentSpots());
//   }, [dispatch]);

//   const confirmDelete = id => {
//     setToDelete(id);
//   };

//   const handleDelete = async () => {
//     await dispatch(deleteSpot(toDelete));
//     setToDelete(null);
//   };

//   return (
//     <div className="manage-spots-page">
//       {/* Header with Create button */}
//       <div className="manage-spots-header">
//         <h1>Manage Your Spots</h1>
//         <Link to="/spots/new" className="btn btn-primary">
//           Create a New Spot
//         </Link>
//       </div>

//       {spots.length === 0 ? (
//         <div className="no-spots">
//           <p>You have no spots yet.</p>
//           <Link to="/spots/new" className="btn btn-primary">
//             Create a New Spot
//           </Link>
//         </div>
//       ) : (
//         <div className="spot-grid">
//           {spots.map(spot => (
//             <div key={spot.id} className="spot-card">
//               {/* Spot Link & Info */}
//               <Link to={`/spots/${spot.id}`} className="spot-link">
//                 <img
//                   className="spot-image"
//                   src={spot.previewImage || '/placeholder.png'}
//                   alt={spot.name}
//                 />
//                 <div className="spot-info">
//                   <div className="spot-location">
//                     {spot.city}, {spot.state}
//                   </div>
//                   <div className="spot-rating">
//                     ★ {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
//                   </div>
//                   <div className="spot-price">
//                     ${spot.price} <span className="per-night">/ night</span>
//                   </div>
//                 </div>
//               </Link>

//               {/* Action Buttons */}
//               <div className="spot-actions">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => navigate(`/spots/${spot.id}/edit`)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => confirmDelete(spot.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {toDelete !== null && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to remove this spot?</p>
//             <div className="modal-actions">
//               <button className="btn btn-danger" onClick={handleDelete}>
//                 Yes (Delete Spot)
//               </button>
//               <button className="btn btn-secondary" onClick={() => setToDelete(null)}>
//                 No (Keep Spot)
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentSpots, deleteSpot } from '../../store/spots';
// import { useNavigate, Link } from 'react-router-dom';
// import './ManageSpots.css';

// export default function ManageSpots() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const spots = useSelector(state => Object.values(state.spots.userSpots));
//   const [toDelete, setToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCurrentSpots());
//   }, [dispatch]);

//   const confirmDelete = id => {
//     setToDelete(id);
//   };

//   const handleDelete = async () => {
//     await dispatch(deleteSpot(toDelete));
//     setToDelete(null);
//   };

//   return (
//     <div className="manage-spots-page">
//       {/* Header with Create button */}
//       <div className="manage-spots-header">
//         <h1>Manage Your Spots</h1>
//         <Link to="/spots/new" className="btn btn-primary">
//           Create a New Spot
//         </Link>
//       </div>

//       {spots.length === 0 ? (
//         <div className="no-spots">
//           <p>You have no spots yet.</p>
//           <Link to="/spots/new" className="btn btn-primary">
//             Create a New Spot
//           </Link>
//         </div>
//       ) : (
//         <div className="spot-grid">
//           {spots.map(spot => (
//             <div key={spot.id} className="spot-card">
//               {/* Spot Link & Info */}
//               <Link to={`/spots/${spot.id}`} className="spot-link">
//                 <img
//                   className="spot-image"
//                   src={spot.previewImage || '/placeholder.png'}
//                   alt={spot.name}
//                 />
//                 <div className="spot-info">
//                   <div className="spot-location">
//                     {spot.city}, {spot.state}
//                   </div>
//                   <div className="spot-rating">
//                     ★ {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
//                   </div>
//                   <div className="spot-price">
//                     ${spot.price} <span className="per-night">/ night</span>
//                   </div>
//                 </div>
//               </Link>

//               {/* Action Buttons */}
//               <div className="spot-actions">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => navigate(`/spots/${spot.id}/edit`)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => confirmDelete(spot.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {toDelete !== null && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to remove this spot?</p>
//             <div className="modal-actions">
//               <button className="btn btn-danger" onClick={handleDelete}>
//                 Yes (Delete Spot)
//               </button>
//               <button className="btn btn-secondary" onClick={() => setToDelete(null)}>
//                 No (Keep Spot)
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentSpots, deleteSpot } from '../../store/spots';
// import { Link, useNavigate } from 'react-router-dom';
// import './ManageSpots.css';

// export default function ManageSpots() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const spotsObj = useSelector(state => state.spots.userSpots);
//   const spots = Object.values(spotsObj);

//   useEffect(() => {
//     dispatch(fetchCurrentSpots());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to remove this spot?')) {
//       dispatch(deleteSpot(id));
//     }
//   };

//   if (!spots.length) {
//     return (
//       <div className="manage-spots">
//         <h2>Manage Spots</h2>
//         <Link to="/spots/new" className="create-spot-btn">Create a New Spot</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="manage-spots">
//       <h2>Manage Spots</h2>
//       <div className="spots-list">
//         {spots.map(spot => {
//           const imgUrl = spot.previewImage
//             || spot.SpotImages?.find(img => img.preview)?.url
//             || '';
//           return (
//             <div key={spot.id} className="spot-card-manage">
//               <Link to={`/spots/${spot.id}`}>              
//                 <img src={imgUrl} alt={spot.name} className="manage-preview" />
//               </Link>
//               <div className="manage-info">
//                 <Link to={`/spots/${spot.id}`} className="manage-name">{spot.name}</Link>
//                 <p className="manage-location">{spot.city}, {spot.state}</p>
//                 <p className="manage-price">${spot.price} / night</p>
//               </div>
//               <div className="manage-buttons">
//                 <button
//                   className="manage-btn update-btn"
//                   onClick={() => navigate(`/spots/${spot.id}/edit`)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="manage-btn delete-btn"
//                   onClick={() => handleDelete(spot.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentSpots, deleteSpot } from '../../store/spots';
// import { Link, useNavigate } from 'react-router-dom';
// import './ManageSpots.css';

// export default function ManageSpots() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const spotsObj = useSelector(state => state.spots.userSpots);
//   const spots = Object.values(spotsObj);

//   // For delete confirmation modal
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCurrentSpots());
//   }, [dispatch]);

//   const confirmDelete = id => setDeleteId(id);
//   const cancelDelete = () => setDeleteId(null);
//   const handleConfirmDelete = async () => {
//     await dispatch(deleteSpot(deleteId));
//     setDeleteId(null);
//   };

//   if (!spots.length) {
//     return (
//       <div className="manage-spots">
//         <h2>Manage Spots</h2>
//         <Link to="/spots/new" className="create-spot-btn">Create a New Spot</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="manage-spots">
//       <h2>Manage Spots</h2>
//       <Link to="/spots/new" className="create-spot-btn">Create a New Spot</Link>
//       <div className="spots-list">
//         {spots.map(spot => {
//           const imgUrl =
//             spot.previewImage ||
//             spot.SpotImages?.find(img => img.preview)?.url ||
//             '';
//           return (
//             <div key={spot.id} className="spot-card-manage">
//               <Link to={`/spots/${spot.id}`}>              
//                 <img src={imgUrl} alt={spot.name} className="manage-preview" />
//               </Link>
//               <div className="manage-info">
//                 <Link to={`/spots/${spot.id}`} className="manage-name">{spot.name}</Link>
//                 <p className="manage-location">{spot.city}, {spot.state}</p>
//                 <p className="manage-price">${spot.price} / night</p>
//               </div>
//               <div className="manage-buttons">
//                 <button
//                   className="manage-btn update-btn"
//                   onClick={() => navigate(`/spots/${spot.id}/edit`)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="manage-btn delete-btn"
//                   onClick={() => confirmDelete(spot.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {deleteId !== null && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to remove this spot?</p>
//             <button className="btn danger-btn" onClick={handleConfirmDelete}>
//               Yes (Delete Spot)
//             </button>
//             <button className="btn cancel-btn" onClick={cancelDelete}>
//               No (Keep Spot)
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSpots, deleteSpot } from '../../store/spots';
import { Link, useNavigate } from 'react-router-dom';
import './ManageSpots.css';

export default function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => Object.values(state.spots.userSpots));
  const [deleteId, setDeleteId] = useState(null);



  useEffect(() => {
    dispatch(fetchCurrentSpots());
  }, [dispatch]);

  const openConfirm = id => setDeleteId(id);
  const cancelConfirm = () => setDeleteId(null);
  const confirmDelete = async () => {
    await dispatch(deleteSpot(deleteId));
    setDeleteId(null);
  };

  return (
    <div className="manage-spots">
      <h2>Manage Spots</h2>
      <Link to="/spots/new" className="create-spot-btn">Create a New Spot</Link>

      {spots.length === 0 ? (
        <p className="no-spots">You have no spots yet.</p>
      ) : (
        <div className="spots-list">
          {spots.map(spot => (
            <div key={spot.id} className="spot-card-manage">
              <Link to={`/spots/${spot.id}`} className="manage-preview-link">
                <img
                  src={spot.previewImage || spot.SpotImages?.find(img => img.preview)?.url || ''}
                  alt={spot.name}
                  className="manage-preview"
                />
              </Link>
              <div className="manage-info">
                <Link to={`/spots/${spot.id}`} className="manage-name">{spot.name}</Link>
                <p className="manage-location">{spot.city}, {spot.state}</p>
                <p className="manage-price">${spot.price} / night</p>
              </div>
              <div className="manage-buttons">
                <button
                  className="manage-btn update-btn"
                  onClick={() => navigate(`/spots/${spot.id}/edit`)}
                >
                  Update
                </button>
                <button
                  className="manage-btn delete-btn"
                  onClick={() => openConfirm(spot.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <button className="btn danger-btn" onClick={confirmDelete}>
              Yes (Delete Spot)
            </button>
            <button className="btn cancel-btn" onClick={cancelConfirm}>
              No (Keep Spot)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}