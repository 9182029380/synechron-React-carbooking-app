import { useNavigate, useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import cars from "../data/cars";
import BookingForm from "../components/BookingForm";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
}

function NewBooking({ onCreateBooking }) {
  const { carId } = useParams();
  const navigate = useNavigate();
  const car = cars.find((item) => item.id === Number(carId));

  if (!car) {
    return (
      <main className="page-container narrow-container">
        <div className="empty-state">
          <h2>Car not found</h2>
          <p>The selected car is not available in our collection.</p>
          <Link className="button button-primary" to="/">Back to cars</Link>
        </div>
      </main>
    );
  }

  function handleBook(formData) {
    onCreateBooking(formData);
    navigate("/bookings", { state: { justBooked: true } });
  }

  return (
    <main className="page-container narrow-container">
      <Link to="/" className="back-link">← Back to cars</Link>
      <div className="page-heading">
        <p className="eyebrow">RESERVE YOUR CAR</p>
        <h1>Let's make it yours.</h1>
        <p>Share your details and our team can follow up about your selected vehicle.</p>
      </div>

      <section className="selected-car">
        <div className="selected-car-icon" style={{ background: car.color }}>{car.initials}</div>
        <div className="selected-car-info">
          <span className="eyebrow">{car.brand} · {car.type}</span>
          <h2>{car.name}</h2>
          <p>{car.fuel} · {car.transmission}</p>
        </div>
        <div className="selected-price"><span>Listed price</span><strong>{formatPrice(car.price)}</strong></div>
      </section>

      <BookingForm car={car} onBook={handleBook} />
      <p className="privacy-note">This is a demo booking form. No payment is collected and no real vehicle reservation is made.</p>
    </main>
  );
}

NewBooking.propTypes = { onCreateBooking: PropTypes.func.isRequired };
export default NewBooking;