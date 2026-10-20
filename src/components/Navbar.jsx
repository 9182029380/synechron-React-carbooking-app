import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar({ bookingCount }) {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">D</span>
          <span>DriveNow <small>CAR BOOKING</small></span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>Explore cars</NavLink>
          <NavLink to="/bookings">
            Bookings <span className="nav-count">{bookingCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  bookingCount: PropTypes.number.isRequired
};

export default Navbar;