import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/*  Home page */}
          <Route index element={<h2 className="text-xl font-semibold">
            Welcome to BurrowFinder
          </h2>} />

          {/*  Auth pages (fill in later) */}
          <Route path="login"  element={<p>TODO: Login form</p>} />
          <Route path="signup" element={<p>TODO: Signup form</p>} />

          {/*  Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}