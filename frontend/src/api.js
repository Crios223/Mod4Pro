import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true      // keeps auth cookies if you use them
});