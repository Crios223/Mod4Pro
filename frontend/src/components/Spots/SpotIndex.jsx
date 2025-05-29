// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpots } from '../../store/spots';
// import { Link } from 'react-router-dom';
// import './SpotIndex.css';

// // export default function SpotIndex() {
// //   const dispatch = useDispatch();
// //   const spots = useSelector(state => Object.values(state.spots.allSpots));

// //   useEffect(() => { dispatch(fetchSpots()); }, [dispatch]);

// //   return (
// //     <div className="spot-index">
// //       {spots.map(spot => (
// //         <Link key={spot.id} to={`/spots/${spot.id}`} className="spot-card">
// //           <img src={spot.previewImage} alt={spot.name} />
// //           <div>{spot.city}, {spot.state}</div>
// //           <div>${spot.price} / night</div>
// //         </Link>
// //       ))}
// //     </div>
// //   );
// // }


// // export default function SpotIndex() {
// //   const dispatch = useDispatch();
// //   const spots = useSelector(state => Object.values(state.spots.allSpots));

// //   useEffect(() => { dispatch(fetchSpots()); }, [dispatch]);

// //   return (
// //     <div className="spot-index">
// //       {spots.map(spot => {
// //         // fallback to the first image in SpotImages
// //         const imgUrl = spot.previewImage || spot.SpotImages?.[0]?.url;
// //         return (
// //           <Link key={spot.id} to={`/spots/${spot.id}`} className="spot-card">
// //             <img src={imgUrl} alt={spot.name} />
// //             <div>{spot.city}, {spot.state}</div>
// //             <div>${spot.price} / night</div>
// //           </Link>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // export default function SpotIndex() {
// //   const dispatch = useDispatch();
// //   const spots = useSelector(state => Object.values(state.spots.allSpots));

// //   useEffect(() => { dispatch(fetchSpots()); }, [dispatch]);

// //   return (
// //     <div className="spot-index">
// //       {spots.map(spot => {
// //         // fallback to the first image in SpotImages
// //         const imgUrl = spot.previewImage || spot.SpotImages?.[0]?.url;
// //         return (
// //           <Link key={spot.id} to={`/spots/${spot.id}`} className="spot-card">
// //             <img src={imgUrl} alt={spot.name} />
// //             <div>{spot.city}, {spot.state}</div>
// //             <div>${spot.price} / night</div>
// //           </Link>
// //         );
// //       })}
// //     </div>
// //   );
// // }



// export default function SpotIndex() {
//   const dispatch = useDispatch();
//   const spots = useSelector(state => Object.values(state.spots.allSpots));

//   useEffect(() => {
//     dispatch(fetchSpots());
//   }, [dispatch]);

//   return (
//     <div className="spot-index">
//       {spots.map(spot => {
//         const imgUrl = spot.previewImage || spot.SpotImages?.find(img => img.preview)?.url || spot.SpotImages?.[0]?.url;
//         return (
//           <Link key={spot.id} to={`/spots/${spot.id}`} className="spot-card" title={spot.name}>
//             <img src={imgUrl} alt={spot.name} />
//             <div className="spot-name">{spot.name}</div>
//             <div className="spot-location">{spot.city}, {spot.state}</div>
//             <div className="spot-price">${spot.price} / night</div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import './SpotIndex.css';

export default function SpotIndex() {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots.allSpots));

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="spot-index">
      {spots.map(spot => {
        const imgUrl =
          spot.previewImage ||
          spot.SpotImages?.find(img => img.preview)?.url ||
          spot.SpotImages?.[0]?.url ||
          '';

        // format rating text
        const ratingText = spot.avgRating > 0
          ? spot.avgRating.toFixed(1)
          : 'New';
        const reviewsText = spot.numReviews > 0
          ? ` · ${spot.numReviews} ${spot.numReviews === 1 ? 'Review' : 'Reviews'}`
          : '';

        return (
          <Link
            key={spot.id}
            to={`/spots/${spot.id}`}
            className="spot-card"
            title={spot.name}
          >
            <img src={imgUrl} alt={spot.name} />
            <div className="spot-card-info">
              <span className="spot-name">{spot.name}</span>
              <span className="spot-rating">
                ★ {ratingText}{reviewsText}
              </span>
            </div>
            <div className="spot-location">{spot.city}, {spot.state}</div>
            <div className="spot-price">${spot.price} / night</div>
          </Link>
        );
      })}
    </div>
  );
}