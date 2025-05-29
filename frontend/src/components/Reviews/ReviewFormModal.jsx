// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createReview } from '../../store/reviews';
// import { useModal } from '../../context/Modal';

// export default function ReviewFormModal({ spotId, onSuccess }) {
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();
//   const currentUser = useSelector(s => s.session.user); // remove to test

//   const [review, setReview] = useState('');
//   const [stars, setStars]   = useState(0);
//   const [errors, setErrors] = useState([]);

//   const disabled = review.length < 10 || stars < 1;

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setErrors([]);
//     try {
//       const newRev = await dispatch(createReview(spotId, { review, stars }));
//       closeModal();
//       onSuccess(newRev);
//     } catch (res) {
//       const data = await res.json();
//       setErrors(Object.values(data.errors || {}));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="review-form">
//       <h2>How was your stay?</h2>
//       {errors.length > 0 && (
//         <ul className="form-errors">
//           {errors.map(err => <li key={err}>{err}</li>)}
//         </ul>
//       )}
//       <textarea
//         value={review}
//         onChange={e => setReview(e.target.value)}
//         placeholder="Leave your review here..."
//         required
//       />
//       <label>
//         Stars
//         <select
//           value={stars}
//           onChange={e => setStars(+e.target.value)}
//           required
//         >
//           <option value="">Select rating</option>
//           {[1,2,3,4,5].map(n => (
//             <option key={n} value={n}>{n}</option>
//           ))}
//         </select>
//       </label>
//       <button type="submit" disabled={disabled}>
//         Submit Your Review
//       </button>
//     </form>
//   );
// }

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, updateReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';

export default function ReviewFormModal({ spotId, review = null, onSuccess }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const isEdit = Boolean(review);
  const [text, setText]     = useState(review?.review || '');
  const [stars, setStars]   = useState(review?.stars  || 0);
  const [errors, setErrors] = useState([]);

  const disabled = text.length < 10 || stars < 1;

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);

    try {
      if (isEdit) {
        await dispatch(updateReview(review.id, { review: text, stars }));
      } else {
        await dispatch(createReview(spotId, { review: text, stars }));
      }
      closeModal();
      onSuccess();
    } catch (err) {
      let data;
      try { data = await err.json(); }
      catch { data = { errors: { message: err.message || 'Something went wrong' } }; }
      setErrors(Object.values(data.errors || { message: data.message }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h2>{isEdit ? 'Update Your Review' : 'How was your stay?'}</h2>

      {errors.length > 0 && (
        <ul className="form-errors">
          {errors.map(msg => <li key={msg}>{msg}</li>)}
        </ul>
      )}

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Leave your review here..."
        required
      />

      <label>
        Stars
        <select
          value={stars}
          onChange={e => setStars(+e.target.value)}
          required
        >
          <option value="">Select rating</option>
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={disabled}>
        {isEdit ? 'Update Review' : 'Submit Your Review'}
      </button>
    </form>
  );
}