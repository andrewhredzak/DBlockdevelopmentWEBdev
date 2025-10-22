import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <img src="/assets/images/dblock_logo_Final.svg" alt="D Block logo" className="brand-logo" />
          <span className="brand-text">D Block Development</span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Products
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

