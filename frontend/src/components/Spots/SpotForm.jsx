// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createSpot } from '../../store/spots';
// import { useNavigate } from 'react-router-dom';

// export default function SpotForm() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     address: '', city: '', state: '', country: '',
//     name: '', price: '', previewImage: ''
//   });

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const newSpot = await dispatch(createSpot(form));
//     if (newSpot) navigate(`/spots/${newSpot.id}`);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="spot-form">
//       {['address','city','state','country','name','price','previewImage'].map(field => (
//         <div key={field}>
//           <label>{field}</label>
//           <input
//             name={field}
//             value={form[field]}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       ))}
//       <button type="submit">Create Spot</button>
//     </form>
//   );
// }


///change 2


// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createSpot, updateSpot, fetchSpot } from '../../store/spots';

// export default function SpotForm({ mode = 'create' }) {
//   const dispatch = useDispatch();
//   const navigate  = useNavigate();
//   const { spotId } = useParams();

//   const isEdit = mode === 'edit';

//   // form state
//   const [country, setCountry] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [description, setDescription] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [previewImage, setPreviewImage] = useState('');
//   // optional extra images
//   const [url2, setUrl2] = useState('');
//   const [url3, setUrl3] = useState('');
//   const [url4, setUrl4] = useState('');
//   const [url5, setUrl5] = useState('');

//   const [errors, setErrors] = useState([]);

//   // if edit mode, preload spot
//   useEffect(() => {
//     if (isEdit) {
//       dispatch(fetchSpot(spotId)).then(data => {
//         setCountry(data.country);
//         setAddress(data.address);
//         setCity(data.city);
//         setState(data.state);
//         setDescription(data.description);
//         setName(data.name);
//         setPrice(data.price);
//         setPreviewImage(data.previewImage);
//       });
//     }
//   }, [dispatch, isEdit, spotId]);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const errs = [];
//     if (!country.trim())    errs.push('Country is required');
//     if (!address.trim())    errs.push('Street Address is required');
//     if (!city.trim())       errs.push('City is required');
//     if (!state.trim())      errs.push('State is required');
//     if (description.length < 30)
//       errs.push('Description needs 30 or more characters');
//     if (!name.trim())       errs.push('Name of your spot is required');
//     if (!price || Number(price) <= 0)
//       errs.push('Price per night is required and must be > 0');
//     if (!previewImage.trim())
//       errs.push('Preview Image URL is required');

//     setErrors(errs);
//     if (errs.length) return;

//     const payload = {
//       country, address, city, state,
//       description, name,
//       price: Number(price),
//       previewImage
//     };

//     let spot;
//     if (isEdit) {
//       spot = await dispatch(updateSpot(spotId, payload));
//     } else {
//       spot = await dispatch(createSpot(payload));
//     }

//     if (spot && spot.id) {
//       navigate(`/spots/${spot.id}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="spot-form">
//       <h2>{isEdit ? 'Update your Spot' : 'Create a New Spot'}</h2>
//       {errors.length > 0 && (
//         <ul className="form-errors">
//           {errors.map(err => <li key={err}>{err}</li>)}
//         </ul>
//       )}

//       {/* Section 1 */}
//       <section>
//         <h3>Where&apos;s your place located?</h3>
//         <p>Guests will only get your exact address once booked.</p>
//         <label>
//           Country
//           <input
//             value={country}
//             onChange={e => setCountry(e.target.value)}
//             placeholder="Country"
//             required
//           />
//         </label>
//         <label>
//           Street Address
//           <input
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//             placeholder="Street Address"
//             required
//           />
//         </label>
//         <label>
//           City
//           <input
//             value={city}
//             onChange={e => setCity(e.target.value)}
//             placeholder="City"
//             required
//           />
//         </label>
//         <label>
//           State
//           <input
//             value={state}
//             onChange={e => setState(e.target.value)}
//             placeholder="State"
//             required
//           />
//         </label>
//       </section>

//       {/* Section 2 */}
//       <section>
//         <h3>Describe your place to guests</h3>
//         <p>
//           Mention the best features of your space… write at least 30 characters.
//         </p>
//         <textarea
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           placeholder="Please write at least 30 characters"
//           required
//         />
//       </section>

//       {/* Section 3 */}
//       <section>
//         <h3>Create a title for your spot</h3>
//         <p>Catch guests&apos; attention with a spot title.</p>
//         <input
//           value={name}
//           onChange={e => setName(e.target.value)}
//           placeholder="Name of your spot"
//           required
//         />
//       </section>

//       {/* Section 4 */}
//       <section>
//         <h3>Set a base price for your spot</h3>
//         <p>Competitive pricing helps your listing stand out.</p>
//         <input
//           type="number"
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           placeholder="Price per night (USD)"
//           required
//         />
//       </section>

//       {/* Section 5 */}
//       <section>
//         <h3>Liven up your spot with photos</h3>
//         <p>Submit a link to at least one photo to publish your spot.</p>
//         <label>
//           Preview Image URL*
//           <input
//             value={previewImage}
//             onChange={e => setPreviewImage(e.target.value)}
//             placeholder="Preview Image URL"
//             required
//           />
//         </label>
//         <label>
//           Image URL
//           <input
//             value={url2}
//             onChange={e => setUrl2(e.target.value)}
//             placeholder="Image URL"
//           />
//         </label>
//         <label>
//           Image URL
//           <input
//             value={url3}
//             onChange={e => setUrl3(e.target.value)}
//             placeholder="Image URL"
//           />
//         </label>
//         <label>
//           Image URL
//           <input
//             value={url4}
//             onChange={e => setUrl4(e.target.value)}
//             placeholder="Image URL"
//           />
//         </label>
//         <label>
//           Image URL
//           <input
//             value={url5}
//             onChange={e => setUrl5(e.target.value)}
//             placeholder="Image URL"
//           />
//         </label>
//       </section>

//       <button type="submit">
//         {isEdit ? 'Update your Spot' : 'Create Spot'}
//       </button>
//     </form>
//   );
// }







// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createSpot, updateSpot, fetchSpot } from '../../store/spots';

// // Simple geocode helper using OpenStreetMap Nominatim
// async function geocode({ address, city, state, country }) {
//   const q = encodeURIComponent(`${address}, ${city}, ${state}, ${country}`);
//   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}`;
//   const res = await fetch(url, {
//     headers: { 'User-Agent': 'airbnb-clone-dev' }
//   });
//   const results = await res.json();
//   if (!results.length) throw new Error('Address not found');
//   return {
//     lat: parseFloat(results[0].lat),
//     lng: parseFloat(results[0].lon)
//   };
// }

// export default function SpotForm({ mode = 'create' }) {
//   const dispatch = useDispatch();
//   const navigate  = useNavigate();
//   const { spotId } = useParams();
//   const isEdit = mode === 'edit';

//   // form state
//   const [country, setCountry] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [description, setDescription] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [previewImage, setPreviewImage] = useState('');
//   const [url2, setUrl2] = useState('');
//   const [url3, setUrl3] = useState('');
//   const [url4, setUrl4] = useState('');
//   const [url5, setUrl5] = useState('');
//   const [errors, setErrors] = useState([]);

//   // preload for edit
//   useEffect(() => {
//     if (isEdit) {
//       dispatch(fetchSpot(spotId)).then(data => {
//         setCountry(data.country);
//         setAddress(data.address);
//         setCity(data.city);
//         setState(data.state);
//         setDescription(data.description);
//         setName(data.name);
//         setPrice(data.price);
//         setPreviewImage(data.previewImage);
//       });
//     }
//   }, [dispatch, isEdit, spotId]);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const frontErrs = [];
//     if (!country.trim()) frontErrs.push('Country is required');
//     if (!address.trim()) frontErrs.push('Street Address is required');
//     if (!city.trim())    frontErrs.push('City is required');
//     if (!state.trim())   frontErrs.push('State is required');
//     if (description.length < 30)
//       frontErrs.push('Description needs 30 or more characters');
//     if (!name.trim())    frontErrs.push('Name of your spot is required');
//     if (!price || Number(price) <= 0)
//       frontErrs.push('Price per night must be > 0');
//     if (!previewImage.trim())
//       frontErrs.push('Preview Image URL is required');

//     if (frontErrs.length) {
//       setErrors(frontErrs);
//       return;
//     }

//     // geocode address → lat/lng
//     let coords;
//     try {
//       coords = await geocode({ address, city, state, country });
//     } catch (err) {
//       setErrors([err.message]);
//       return;
//     }

//     const payload = {
//       country, address, city, state,
//       lat:  coords.lat,
//       lng:  coords.lng,
//       description, name,
//       price: Number(price),
//       previewImage
//     };

//     try {
//       const spot = isEdit
//         ? await dispatch(updateSpot(spotId, payload))
//         : await dispatch(createSpot(payload));
//       if (spot.id) navigate(`/spots/${spot.id}`);
//     } catch (res) {
//       const data = await res.json();
//       setErrors(Object.values(data.errors || {}));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="spot-form">
//       <h2>{isEdit ? 'Update your Spot' : 'Create a New Spot'}</h2>
//       {errors.length > 0 && (
//         <ul className="form-errors">
//           {errors.map(err => <li key={err}>{err}</li>)}
//         </ul>
//       )}

//       {/* Section 1 */}
//       <section>
//         <h3>Where&apos;s your place located?</h3>
//         <p>Guests will only get your exact address once booked.</p>
//         <label>
//           Country
//           <input
//             value={country}
//             onChange={e => setCountry(e.target.value)}
//             placeholder="Country"
//             required
//           />
//         </label>
//         <label>
//           Street Address
//           <input
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//             placeholder="Street Address"
//             required
//           />
//         </label>
//         <label>
//           City
//           <input
//             value={city}
//             onChange={e => setCity(e.target.value)}
//             placeholder="City"
//             required
//           />
//         </label>
//         <label>
//           State
//           <input
//             value={state}
//             onChange={e => setState(e.target.value)}
//             placeholder="State"
//             required
//           />
//         </label>
//       </section>

//       {/* Section 2 */}
//       <section>
//         <h3>Describe your place to guests</h3>
//         <p>Please write at least 30 characters.</p>
//         <textarea
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           placeholder="Description"
//           required
//         />
//       </section>

//       {/* Section 3 */}
//       <section>
//         <h3>Create a title for your spot</h3>
//         <input
//           value={name}
//           onChange={e => setName(e.target.value)}
//           placeholder="Name of your spot"
//           required
//         />
//       </section>

//       {/* Section 4 */}
//       <section>
//         <h3>Set a base price for your spot</h3>
//         <input
//           type="number"
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           placeholder="Price per night (USD)"
//           required
//         />
//       </section>

//       {/* Section 5 */}
//       <section>
//         <h3>Liven up your spot with photos</h3>
//         <label>
//           Preview Image URL*
//           <input
//             value={previewImage}
//             onChange={e => setPreviewImage(e.target.value)}
//             placeholder="Preview Image URL"
//             required
//           />
//         </label>
//         {[url2,setUrl2,url3,setUrl3,url4,setUrl4,url5,setUrl5].map((_, i) => (
//           <label key={i}>
//             Image URL
//             <input
//               value={[url2,url3,url4,url5][i]}
//               onChange={e => [setUrl2,setUrl3,setUrl4,setUrl5][i](e.target.value)}
//               placeholder="Image URL"
//             />
//           </label>
//         ))}
//       </section>

//       <button type="submit">
//         {isEdit ? 'Update your Spot' : 'Create Spot'}
//       </button>
//     </form>
//   );
// }




// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createSpot, updateSpot, fetchSpot } from '../../store/spots';

// // Simple geocode helper using OpenStreetMap Nominatim
// async function geocode({ address, city, state, country }) {
//   const q = encodeURIComponent(`${address}, ${city}, ${state}, ${country}`);
//   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}`;
//   const res = await fetch(url, {
//     headers: { 'User-Agent': 'airbnb-clone-dev' }
//   });
//   const results = await res.json();
//   if (!results.length) throw new Error('Address not found');
//   return {
//     lat: parseFloat(results[0].lat),
//     lng: parseFloat(results[0].lon)
//   };
// }

// export default function SpotForm({ mode = 'create' }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { spotId } = useParams();
//   const isEdit = mode === 'edit';

//   // form state
//   const [country, setCountry] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [description, setDescription] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [previewImage, setPreviewImage] = useState('');
//   const [url2, setUrl2] = useState('');
//   const [url3, setUrl3] = useState('');
//   const [url4, setUrl4] = useState('');
//   const [url5, setUrl5] = useState('');
//   const [errors, setErrors] = useState([]);

//   // preload for edit
//   useEffect(() => {
//     if (isEdit) {
//       dispatch(fetchSpot(spotId)).then(data => {
//         setCountry(data.country);
//         setAddress(data.address);
//         setCity(data.city);
//         setState(data.state);
//         setDescription(data.description);
//         setName(data.name);
//         setPrice(data.price);
//         setPreviewImage(data.previewImage);
//         // if editing, you could also initialize extra URLs if desired
//       });
//     }
//   }, [dispatch, isEdit, spotId]);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const frontErrs = [];
//     if (!country.trim()) frontErrs.push('Country is required');
//     if (!address.trim()) frontErrs.push('Street Address is required');
//     if (!city.trim()) frontErrs.push('City is required');
//     if (!state.trim()) frontErrs.push('State is required');
//     if (description.length < 30)
//       frontErrs.push('Description needs 30 or more characters');
//     if (!name.trim()) frontErrs.push('Name of your spot is required');
//     if (!price || Number(price) <= 0)
//       frontErrs.push('Price per night must be > 0');
//     if (!previewImage.trim())
//       frontErrs.push('Preview Image URL is required');

//     if (frontErrs.length) {
//       setErrors(frontErrs);
//       return;
//     }

//     // geocode address → lat/lng
//     let coords;
//     try {
//       coords = await geocode({ address, city, state, country });
//     } catch (err) {
//       setErrors([err.message]);
//       return;
//     }

//     const payload = {
//       country,
//       address,
//       city,
//       state,
//       lat: coords.lat,
//       lng: coords.lng,
//       description,
//       name,
//       price: Number(price),
//       previewImage,
//       extraImages: [url2, url3, url4, url5].filter(Boolean)
//     };

//     try {
//       const spot = isEdit
//         ? await dispatch(updateSpot(spotId, payload))
//         : await dispatch(createSpot(payload));
//       if (spot.id) navigate(`/spots/${spot.id}`);
//     } catch (res) {
//       const data = await res.json();
//       setErrors(Object.values(data.errors || {}));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="spot-form">
//       <h2>{isEdit ? 'Update your Spot' : 'Create a New Spot'}</h2>
//       {errors.length > 0 && (
//         <ul className="form-errors">
//           {errors.map(err => (
//             <li key={err}>{err}</li>
//           ))}
//         </ul>
//       )}

//       {/* Section 1 */}
//       <section>
//         <h3>Where&apos;s your place located?</h3>
//         <p>Guests will only get your exact address once booked.</p>
//         <label>
//           Country
//           <input
//             value={country}
//             onChange={e => setCountry(e.target.value)}
//             placeholder="Country"
//             required
//           />
//         </label>
//         <label>
//           Street Address
//           <input
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//             placeholder="Street Address"
//             required
//           />
//         </label>
//         <label>
//           City
//           <input
//             value={city}
//             onChange={e => setCity(e.target.value)}
//             placeholder="City"
//             required
//           />
//         </label>
//         <label>
//           State
//           <input
//             value={state}
//             onChange={e => setState(e.target.value)}
//             placeholder="State"
//             required
//           />
//         </label>
//       </section>

//       {/* Section 2 */}
//       <section>
//         <h3>Describe your place to guests</h3>
//         <p>Please write at least 30 characters.</p>
//         <textarea
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           placeholder="Description"
//           required
//         />
//       </section>

//       {/* Section 3 */}
//       <section>
//         <h3>Create a title for your spot</h3>
//         <input
//           value={name}
//           onChange={e => setName(e.target.value)}
//           placeholder="Name of your spot"
//           required
//         />
//       </section>

//       {/* Section 4 */}
//       <section>
//         <h3>Set a base price for your spot</h3>
//         <input
//           type="number"
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           placeholder="Price per night (USD)"
//           required
//         />
//       </section>

//       {/* Section 5 */}
//       <section>
//         <h3>Liven up your spot with photos</h3>
//         <label>
//           Preview Image URL*
//           <input
//             value={previewImage}
//             onChange={e => setPreviewImage(e.target.value)}
//             placeholder="Preview Image URL"
//             required
//           />
//         </label>
//         <label>
//           Image URL
//           <input
//             value={url2}
//             onChange={e => setUrl2(e.target.value)}
//             placeholder="Image URL"
//           />
//         </label>
//         <label>
//           Image URL
//           <input
//             value={url3}
//             onChange={e => setUrl3(e.target.value)}
//             placeholder="Image URL"
//           />
//         </label>
//         <label>
//           Image URL
//           <input
//             value={url4}
//             onChange={e => setUrl4(e.target.value)}
//             placeholder="Image URL"
//           />
//         </label>
//         <label>
//           Image URL
//           <input
//             value={url5}
//             onChange={e => setUrl5(e.target.value)}
//             placeholder="Image URL"
//           />
//         </label>
//       </section>

//       <button type="submit">
//         {isEdit ? 'Update your Spot' : 'Create Spot'}
//       </button>
//     </form>
//   );
// }


// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createSpot, updateSpot, fetchSpot } from '../../store/spots';

// import { csrfFetch } from './csrf';

// // action types
// const LOAD_SPOTS        = 'spots/LOAD_SPOTS';
// const LOAD_SPOT         = 'spots/LOAD_SPOT';
// const CREATE_SPOT       = 'spots/CREATE_SPOT';
// const UPDATE_SPOT       = 'spots/UPDATE_SPOT';
// const DELETE_SPOT       = 'spots/DELETE_SPOT';
// const LOAD_USER_SPOTS   = 'spots/LOAD_USER_SPOTS';

// // action creators
// const loadSpots      = spots => ({ type: LOAD_SPOTS, spots });
// const loadSpot       = spot  => ({ type: LOAD_SPOT,  spot });
// const addSpot        = spot  => ({ type: CREATE_SPOT, spot });
// const editSpot       = spot  => ({ type: UPDATE_SPOT, spot });
// const removeSpot     = id    => ({ type: DELETE_SPOT, id   });
// const loadUserSpots  = spots => ({ type: LOAD_USER_SPOTS, spots });

// // helper to post images
// async function postSpotImages(spotId, urls) {
//   await Promise.all(
//     urls.map((url, idx) =>
//       csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         body: JSON.stringify({ url, preview: idx === 0 })
//       })
//     )
//   );
// }

// // thunks
// export const fetchSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpots(data.Spots));
//   }
// };

// export const fetchSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpot(data));
//     return data;
//   }
// };

// export const fetchCurrentSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots/current');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadUserSpots(data.Spots));
//   }
// };

// export const createSpot = payload => async dispatch => {
//   // extract previewImage and extraImages from payload
//   const { previewImage, extraImages = [], ...spotData } = payload;

//   // 1) create spot record
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(spotData)
//   });
//   if (!res.ok) throw res;
//   const spot = await res.json();
//   dispatch(addSpot(spot));

//   // 2) post images: first is previewImage, then extraImages
//   const imageUrls = [previewImage, ...extraImages].filter(Boolean);
//   await postSpotImages(spot.id, imageUrls);

//   return spot;
// };

// export const updateSpot = (id, payload) => async dispatch => {
//   const { previewImage, extraImages = [], ...spotData } = payload;

//   // 1) update spot record
//   const res = await csrfFetch(`/api/spots/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(spotData)
//   });
//   if (!res.ok) throw res;
//   const spot = await res.json();
//   dispatch(editSpot(spot));

//   // 2) post any new images
//   const imageUrls = [previewImage, ...extraImages].filter(Boolean);
//   await postSpotImages(id, imageUrls);

//   return spot;
// };

// export const deleteSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
//   if (res.ok) dispatch(removeSpot(id)); else throw res;
// };

// // reducer
// const initialState = {
//   allSpots:   {},
//   singleSpot: {},
//   userSpots:  {}
// };

// export default function spotsReducer(state = initialState, action) {
//   const newState = {
//     allSpots:   { ...state.allSpots },
//     singleSpot: { ...state.singleSpot },
//     userSpots:  { ...state.userSpots }
//   };
//   switch (action.type) {
//     case LOAD_SPOTS:
//       newState.allSpots = {};
//       action.spots.forEach(s => newState.allSpots[s.id] = s);
//       return newState;
//     case LOAD_SPOT:
//       newState.singleSpot = action.spot;
//       return newState;
//     case LOAD_USER_SPOTS:
//       newState.userSpots = {};
//       action.spots.forEach(s => newState.userSpots[s.id] = s);
//       return newState;
//     case CREATE_SPOT:
//     case UPDATE_SPOT:
//       newState.allSpots[action.spot.id] = action.spot;
//       newState.singleSpot = action.spot;
//       newState.userSpots[action.spot.id] = action.spot;
//       return newState;
//     case DELETE_SPOT:
//       delete newState.allSpots[action.id];
//       delete newState.userSpots[action.id];
//       if (newState.singleSpot.id === action.id) newState.singleSpot = {};
//       return newState;
//     default:
//       return state;
//   }
// }





// import { useState, useEffect } from 'react';
// import { useDispatch }       from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createSpot, updateSpot, fetchSpot } from '../../store/spots';

// import { csrfFetch } from './csrf';

// // action types
// const LOAD_SPOTS        = 'spots/LOAD_SPOTS';
// const LOAD_SPOT         = 'spots/LOAD_SPOT';
// const CREATE_SPOT       = 'spots/CREATE_SPOT';
// const UPDATE_SPOT       = 'spots/UPDATE_SPOT';
// const DELETE_SPOT       = 'spots/DELETE_SPOT';
// const LOAD_USER_SPOTS   = 'spots/LOAD_USER_SPOTS';

// // action creators
// const loadSpots      = spots => ({ type: LOAD_SPOTS, spots });
// const loadSpot       = spot  => ({ type: LOAD_SPOT,  spot });
// const addSpot        = spot  => ({ type: CREATE_SPOT, spot });
// const editSpot       = spot  => ({ type: UPDATE_SPOT, spot });
// const removeSpot     = id    => ({ type: DELETE_SPOT, id   });
// const loadUserSpots  = spots => ({ type: LOAD_USER_SPOTS, spots });

// // helper to post images
// async function postSpotImages(spotId, urls) {
//   await Promise.all(
//     urls.map((url, idx) =>
//       csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         body: JSON.stringify({ url, preview: idx === 0 })
//       })
//     )
//   );
// }

// // thunks
// export const fetchSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpots(data.Spots));
//   }
// };

// export const fetchSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpot(data));
//     return data;
//   }
// };

// export const fetchCurrentSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots/current');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadUserSpots(data.Spots));
//   }
// };

// export const createSpot = payload => async dispatch => {
//   // extract previewImage and extraImages from payload
//   const { previewImage, extraImages = [], ...spotData } = payload;

//   // 1) create spot record
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(spotData)
//   });
//   if (!res.ok) throw res;
//   const spot = await res.json();
//   dispatch(addSpot(spot));

//   // 2) post images: first is previewImage, then extraImages
//   const imageUrls = [previewImage, ...extraImages].filter(Boolean);
//   await postSpotImages(spot.id, imageUrls);

//   return spot;
// };

// export const updateSpot = (id, payload) => async dispatch => {
//   const { previewImage, extraImages = [], ...spotData } = payload;

//   // 1) update spot record
//   const res = await csrfFetch(`/api/spots/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(spotData)
//   });
//   if (!res.ok) throw res;
//   const spot = await res.json();
//   dispatch(editSpot(spot));

//   // 2) post any new images
//   const imageUrls = [previewImage, ...extraImages].filter(Boolean);
//   await postSpotImages(id, imageUrls);

//   return spot;
// };

// export const deleteSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
//   if (res.ok) dispatch(removeSpot(id)); else throw res;
// };

// // reducer
// const initialState = {
//   allSpots:   {},
//   singleSpot: {},
//   userSpots:  {}
// };

// export default function spotsReducer(state = initialState, action) {
//   const newState = {
//     allSpots:   { ...state.allSpots },
//     singleSpot: { ...state.singleSpot },
//     userSpots:  { ...state.userSpots }
//   };
//   switch (action.type) {
//     case LOAD_SPOTS:
//       newState.allSpots = {};
//       action.spots.forEach(s => newState.allSpots[s.id] = s);
//       return newState;
//     case LOAD_SPOT:
//       newState.singleSpot = action.spot;
//       return newState;
//     case LOAD_USER_SPOTS:
//       newState.userSpots = {};
//       action.spots.forEach(s => newState.userSpots[s.id] = s);
//       return newState;
//     case CREATE_SPOT:
//     case UPDATE_SPOT:
//       newState.allSpots[action.spot.id] = action.spot;
//       newState.singleSpot = action.spot;
//       newState.userSpots[action.spot.id] = action.spot;
//       return newState;
//     case DELETE_SPOT:
//       delete newState.allSpots[action.id];
//       delete newState.userSpots[action.id];
//       if (newState.singleSpot.id === action.id) newState.singleSpot = {};
//       return newState;
//     default:
//       return state;
//   }
// }




// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createSpot, updateSpot, fetchSpot } from '../../store/spots';
// import './SpotForm.css';

// // Simple geocode helper using OpenStreetMap Nominatim
// async function geocode({ address, city, state, country }) {
//   const q = encodeURIComponent(`${address}, ${city}, ${state}, ${country}`);
//   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}`;
//   const res = await fetch(url, {
//     headers: { 'User-Agent': 'airbnb-clone-dev' }
//   });
//   const results = await res.json();
//   if (!results.length) throw new Error('Address not found');
//   return {
//     lat: parseFloat(results[0].lat),
//     lng: parseFloat(results[0].lon)
//   };
// }

// export default function SpotForm({ mode = 'create' }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { spotId } = useParams();
//   const isEdit = mode === 'edit';

//   // form state
//   const [country, setCountry] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [description, setDescription] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [previewImage, setPreviewImage] = useState('');
//   const [url2, setUrl2] = useState('');
//   const [url3, setUrl3] = useState('');
//   const [url4, setUrl4] = useState('');
//   const [url5, setUrl5] = useState('');
//   const [errors, setErrors] = useState([]);

//   useEffect(() => {
//     if (isEdit) {
//       dispatch(fetchSpot(spotId)).then(data => {
//         setCountry(data.country);
//         setAddress(data.address);
//         setCity(data.city);
//         setState(data.state);
//         setDescription(data.description);
//         setName(data.name);
//         setPrice(data.price);
//         setPreviewImage(data.previewImage);
//       });
//     }
//   }, [dispatch, isEdit, spotId]);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const frontErrs = [];
//     if (!country.trim()) frontErrs.push('Country is required');
//     if (!address.trim()) frontErrs.push('Street Address is required');
//     if (!city.trim()) frontErrs.push('City is required');
//     if (!state.trim()) frontErrs.push('State is required');
//     if (description.length < 30)
//       frontErrs.push('Description needs 30 or more characters');
//     if (!name.trim()) frontErrs.push('Name of your spot is required');
//     if (!price || Number(price) <= 0)
//       frontErrs.push('Price per night must be > 0');
//     if (!previewImage.trim())
//       frontErrs.push('Preview Image URL is required');

//     if (frontErrs.length) {
//       setErrors(frontErrs);
//       return;
//     }

//     let coords;
//     try {
//       coords = await geocode({ address, city, state, country });
//     } catch (err) {
//       setErrors([err.message]);
//       return;
//     }

//     const payload = {
//       country, address, city, state,
//       lat: coords.lat, lng: coords.lng,
//       description, name,
//       price: Number(price),
//       previewImage,
//       extraImages: [url2, url3, url4, url5].filter(Boolean)
//     };

//     try {
//       const spot = isEdit
//         ? await dispatch(updateSpot(spotId, payload))
//         : await dispatch(createSpot(payload));
//       if (spot.id) navigate(`/spots/${spot.id}`);
//     } catch (res) {
//       const data = await res.json();
//       setErrors(Object.values(data.errors || {}));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="spot-form">
//       {/* form content... */}
//     </form>
//   );
// }

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createSpot, updateSpot, fetchSpot } from '../../store/spots';
import './SpotForm.css';

// Simple geocode helper using OpenStreetMap Nominatim
async function geocode({ address, city, state, country }) {
  const q = encodeURIComponent(`${address}, ${city}, ${state}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'airbnb-clone-dev' } });
  const results = await res.json();
  if (!results.length) throw new Error('Address not found');
  return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
}

export default function SpotForm({ mode = 'create' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();
  const isEdit = mode === 'edit';

  // form state
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');
  const [url4, setUrl4] = useState('');
  const [url5, setUrl5] = useState('');
  const [errors, setErrors] = useState([]);

  // preload for edit
  useEffect(() => {
    if (isEdit) {
      dispatch(fetchSpot(spotId)).then(data => {
        setCountry(data.country);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setDescription(data.description);
        setName(data.name);
        setPrice(data.price);
        setPreviewImage(data.previewImage);
      });
    }
  }, [dispatch, isEdit, spotId]);

  const handleSubmit = async e => {
    e.preventDefault();
    const frontErrs = [];
    if (!country.trim()) frontErrs.push('Country is required');
    if (!address.trim()) frontErrs.push('Street address is required');
    if (!city.trim()) frontErrs.push('City is required');
    if (!state.trim()) frontErrs.push('State is required');
    if (description.trim().length < 30) frontErrs.push('Description needs 30 or more characters');
    if (!name.trim()) frontErrs.push('Title is required');
    if (!price || Number(price) <= 0) frontErrs.push('Price per night must be > 0');
    if (!previewImage.trim()) frontErrs.push('Preview Image URL is required');

    if (frontErrs.length) {
      setErrors(frontErrs);
      return;
    }

    let coords;
    try { coords = await geocode({ address, city, state, country }); }
    catch (err) { setErrors([err.message]); return; }

    const payload = {
      country, address, city, state,
      lat: coords.lat, lng: coords.lng,
      description, name,
      price: Number(price), previewImage,
      extraImages: [url2, url3, url4, url5].filter(Boolean)
    };

    try {
      const spot = isEdit
        ? await dispatch(updateSpot(spotId, payload))
        : await dispatch(createSpot(payload));
      if (spot.id) navigate(`/spots/${spot.id}`);
    } catch (res) {
      const data = await res.json();
      setErrors(Object.values(data.errors || {}));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="spot-form">
      <h2>{isEdit ? 'Update your Spot' : 'Create a New Spot'}</h2>
      {errors.length > 0 && (
        <ul className="form-errors">
          {errors.map(err => <li key={err}>{err}</li>)}
        </ul>
      )}

      {/* Section 1 */}
      <section>
        <h3>Where are you located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <label>
          Country
          <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" />
        </label>
        <label>
          Street Address
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
        </label>
        <div className="row">
          <label>
            City
            <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
          </label>
          <label>
            State
            <input value={state} onChange={e => setState(e.target.value)} placeholder="State" />
          </label>
        </div>
        <hr />
      </section>

      {/* Section 2 */}
      <section>
        <h3>Describe your place to your guests</h3>
        <p>Mention the best features of your space…</p>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Please write at least 30 characters." />
        <hr />
      </section>

      {/* Section 3 */}
      <section>
        <h3>Create a title for your spot</h3>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name of your spot" />
        <hr />
      </section>

      {/* Section 4 */}
      <section>
        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out…</p>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price per night (USD)" />
        <hr />
      </section>

      {/* Section 5 */}
      <section>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <label>
          Preview Image URL
          <input value={previewImage} onChange={e => setPreviewImage(e.target.value)} placeholder="Preview Image URL" />
        </label>
        <label>
          Image URL
          <input value={url2} onChange={e => setUrl2(e.target.value)} placeholder="Image URL" />
        </label>
        <label>
          Image URL
          <input value={url3} onChange={e => setUrl3(e.target.value)} placeholder="Image URL" />
        </label>
        <label>
          Image URL
          <input value={url4} onChange={e => setUrl4(e.target.value)} placeholder="Image URL" />
        </label>
        <label>
          Image URL
          <input value={url5} onChange={e => setUrl5(e.target.value)} placeholder="Image URL" />
        </label>
      </section>

      <button type="submit">{isEdit ? 'Update your Spot' : 'Create Spot'}</button>
    </form>
  );
}
