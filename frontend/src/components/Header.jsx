import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '/burrowfinder-logo.svg';      // place SVG in /public

export default function Header() {
  const user = useSelector(state => state.session.user);

  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo (top-left, links home) */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BurrowFinder logo" className="h-20" />
          <span className="sr-only">BurrowFinder</span>
        </Link>

        {/* Right-side controls */}
        {user ? (
          <button
            className="rounded-full border px-4 py-2 hover:bg-gray-50"
            onClick={() => {/* open user menu later */}}
          >
            {user.username}
          </button>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="rounded-md border px-4 py-2 hover:bg-gray-50"
            >
              Log&nbsp;In
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Sign&nbsp;Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}