import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentSpots, deleteSpot } from "../../store/spots";
import { Link, useNavigate } from "react-router-dom";
import "./ManageSpots.css";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector((state) =>
    Object.values(state.spots.userSpots)
  );
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchCurrentSpots());
  }, [dispatch]);

  const openConfirm = (id) => setDeleteId(id);
  const cancelConfirm = () => setDeleteId(null);
  const confirmDelete = async () => {
    await dispatch(deleteSpot(deleteId));
    setDeleteId(null);
  };

  
  const listClass = spots.length === 1 ? "spots-list single" : "spots-list";

  return (
    <div className="manage-spots">
      <h2>Manage Spots</h2>
      <Link to="/spots/new" className="create-spot-btn">
        Create a New Spot
      </Link>

      {spots.length === 0 ? (
        <p className="no-spots">You have no spots yet.</p>
      ) : (
        <div className={listClass}>
          {spots.map((spot) => (
            <div key={spot.id} className="spot-card-manage">
              <Link
                to={`/spots/${spot.id}`}
                className="manage-preview-link"
              >
                <img
                  src={
                    spot.previewImage ||
                    spot.SpotImages?.find((img) => img.preview)?.url ||
                    ""
                  }
                  alt={spot.name}
                  className="manage-preview"
                />
              </Link>
              <div className="manage-info">
                <Link to={`/spots/${spot.id}`} className="manage-name">
                  {spot.name}
                </Link>
                <p className="manage-location">
                  {spot.city}, {spot.state}
                </p>
                <p className="manage-price">
                  ${spot.price} / night
                </p>
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
            <button
              className="btn danger-btn"
              onClick={confirmDelete}
            >
              Yes (Delete Spot)
            </button>
            <button
              className="btn cancel-btn"
              onClick={cancelConfirm}
            >
              No (Keep Spot)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}