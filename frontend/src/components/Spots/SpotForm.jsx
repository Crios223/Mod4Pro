import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createSpot, updateSpot, fetchSpot } from '../../store/spots';
import './SpotForm.css';


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

  
  // useEffect(() => {
  //   if (isEdit) {
  //     dispatch(fetchSpot(spotId)).then(data => {
  //       setCountry(data.country);
  //       setAddress(data.address);
  //       setCity(data.city);
  //       setState(data.state);
  //       setDescription(data.description);
  //       setName(data.name);
  //       setPrice(data.price);
  //       setPreviewImage(data.previewImage);
  //     });
  //   }
  // }, [dispatch, isEdit, spotId]);



useEffect(() => {
  if (!isEdit) return;

  dispatch(fetchSpot(spotId)).then(data => {
    setCountry(data.country);
    setAddress(data.address);
    setCity(data.city);
    setState(data.state);
    setDescription(data.description);
    setName(data.name);
    setPrice(data.price);

    
    const images = data.SpotImages || [];

    
    const previewObj = images.find(img => img.preview);
    setPreviewImage(previewObj ? previewObj.url : "");

    
    const extras = images
      .filter(img => !img.preview)
      .map(img => img.url);

    
    setUrl2(extras[0] || "");
    setUrl3(extras[1] || "");
    setUrl4(extras[2] || "");
    setUrl5(extras[3] || "");
  });
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

      
      <section>
        <h3>Describe your place to your guests</h3>
        <p>Mention the best features of your space…</p>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Please write at least 30 characters." />
        <hr />
      </section>

      
      <section>
        <h3>Create a title for your spot</h3>
        <p>Catch guests attention with a spot title that highlights what makes your place special.</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name of your spot" />
        <hr />
      </section>

      
      <section>
        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out…</p>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price per night (USD)" />
        <hr />
      </section>

      
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
