import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

function CarCard({ car, onBook }) {
  const navigate = useNavigate();

  function handleBookClick() {
    // Methods as Props: invoke the function received from the parent.
    onBook(car.id);
    navigate(`/book/${car.id}`);
  }

  return (
    <article className="car-card">
      <div className="car-visual" style={{ background: car.color }}>
        <span className="car-tag">{car.type}</span>
        <div className="car-illustration" aria-hidden="true">
          <svg viewBox="0 0 300 125" role="img" aria-label="Illustration of a car">
            <path d="M45 78 L61 48 Q66 38 82 36 L190 36 Q207 38 220 55 L246 68 Q257 73 257 86 L257 96 L38 96 L38 85 Q38 79 45 78Z" fill="#ffffff" stroke="#24445e" strokeWidth="3"/>
            <path d="M78 43 L119 43 L119 64 L65 64Z" fill="#a8c5d9"/>
            <path d="M128 43 L188 43 Q200 45 211 64 L128 64Z" fill="#a8c5d9"/>
            <path d="M41 77 L67 77 M228 77 L252 77" stroke="#f0a84b" strokeWidth="7" strokeLinecap="round"/>
            <circle cx="83" cy="96" r="17" fill="#243b53"/><circle cx="83" cy="96" r="7" fill="#d9e2ec"/>
            <circle cx="216" cy="96" r="17" fill="#243b53"/><circle cx="216" cy="96" r="7" fill="#d9e2ec"/>
          </svg>
        </div>
        <span className="car-initials">{car.initials}</span>
      </div>
      <div className="car-content">
        <p className="eyebrow">{car.brand} · {car.fuel}</p>
        <h3>{car.name}</h3>
        <p className="car-description">{car.description}</p>
        <div className="car-specs">
          <span>{car.transmission}</span>
          <span>{car.type}</span>
        </div>
        <div className="car-footer">
          <div>
            <span className="price-label">Starting at</span>
            <strong>{formatPrice(car.price)}</strong>
          </div>
          <button className="button button-primary" onClick={handleBookClick}>
            Book now <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fuel: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onBook: PropTypes.func.isRequired
};

export default CarCard;