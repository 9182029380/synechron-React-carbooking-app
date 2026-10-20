import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
}

function BookingDashboard({ bookings, onCancel }) {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(Boolean(location.state?.justBooked));

  const filteredBookings = useMemo(() => {
    const term = search.trim().toLowerCase();
    return bookings.filter((booking) =>
      [booking.customerName, booking.mobile, booking.carName, booking.email, booking.bookingId]
        .some((value) => String(value || "").toLowerCase().includes(term))
    );
  }, [bookings, search]);

  const activeCount = bookings.filter((booking) => booking.status === "Confirmed").length;

  function handleCancel(bookingId) {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      onCancel(bookingId);
    }
  }

  return (
    <main className="page-container">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">BOOKING MANAGEMENT</p>
          <h1>Your booking dashboard</h1>
          <p className="section-subtitle">Review customer requests and manage booking status.</p>
        </div>
        <Link to="/" className="button button-primary">+ New booking</Link>
      </div>

      {showSuccess && (
        <div className="success-banner">
          <span className="success-check">✓</span>
          <div><strong>Booking saved successfully</strong><p>Your demo booking has been added to the dashboard.</p></div>
          <button aria-label="Dismiss notification" onClick={() => setShowSuccess(false)}>×</button>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card"><span className="stat-icon">▤</span><div><p>Total bookings</p><strong>{bookings.length}</strong></div></div>
        <div className="stat-card"><span className="stat-icon green">✓</span><div><p>Active bookings</p><strong>{activeCount}</strong></div></div>
        <div className="stat-card"><span className="stat-icon amber">⌕</span><div><p>Cars in collection</p><strong>4</strong></div></div>
      </div>

      <section className="table-panel">
        <div className="table-heading">
          <div><h2>All bookings</h2><p>{filteredBookings.length} record{filteredBookings.length === 1 ? "" : "s"} shown</p></div>
          <label className="search-box table-search">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, mobile, car..." aria-label="Search bookings" />
          </label>
        </div>

        {filteredBookings.length > 0 ? (
          <div className="table-scroll">
            <table>
              <thead><tr><th>Booking ID</th><th>Customer</th><th>Car</th><th>Booking date</th><th>Price</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td><span className="booking-id">{booking.bookingId}</span><small className="mobile-sub">{booking.mobile}</small></td>
                    <td><strong>{booking.customerName}</strong><small className="table-secondary">{booking.email || "No email provided"}</small></td>
                    <td>{booking.carName}</td>
                    <td>{booking.bookingDate}</td>
                    <td className="price-cell">{formatPrice(booking.carPrice)}</td>
                    <td>{booking.paymentMethod}</td>
                    <td><span className={`status-pill ${booking.status === "Confirmed" ? "status-confirmed" : "status-cancelled"}`}>{booking.status}</span></td>
                    <td>{booking.status === "Confirmed" ? <button className="text-button danger-text" onClick={() => handleCancel(booking.bookingId)}>Cancel</button> : <span className="muted-text">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state table-empty">
            <span>▤</span><h3>{search ? "No matching bookings" : "No bookings yet"}</h3>
            <p>{search ? "Try searching with a different customer or car detail." : "Your new car bookings will appear here."}</p>
            {search ? <button className="button button-outline" onClick={() => setSearch("")}>Clear search</button> : <Link to="/" className="button button-primary">Explore cars</Link>}
          </div>
        )}
      </section>
      <p className="privacy-note">Demo only: data is stored in this browser's local storage. It is not a real dealership booking system.</p>
    </main>
  );
}

BookingDashboard.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({
    bookingId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    carName: PropTypes.string.isRequired,
    bookingDate: PropTypes.string.isRequired,
    carPrice: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  })).isRequired,
  onCancel: PropTypes.func.isRequired
};

export default BookingDashboard;