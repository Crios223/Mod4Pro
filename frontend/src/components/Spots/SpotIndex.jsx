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
            <div className="spot-image-wrapper">
              <img src={imgUrl} alt={spot.name} />
            </div>
            <div className="spot-card-info">
              <span className="spot-name">{spot.name}</span>
              <span className="spot-rating">
                ★ {ratingText}{reviewsText}
              </span>
            </div>
            <div className="spot-location">
              {spot.city}, {spot.state}
            </div>
            <div className="spot-price">
              ${spot.price} / night
            </div>
          </Link>
        );
      })}
    </div>
  );
}