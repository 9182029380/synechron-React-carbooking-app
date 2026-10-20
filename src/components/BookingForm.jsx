import { useRef, useState } from "react";
import PropTypes from "prop-types";

function BookingForm({ car, onBook }) {
  const nameInputRef = useRef(null);
  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    email: "",
    bookingDate: "",
    paymentMethod: "Finance",
    notes: ""
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (error) setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      nameInputRef.current?.focus();
      return;
    }

    onBook({
      ...formData,
      carId: car.id,
      carName: car.name,
      carPrice: car.price
    });
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-section-heading">
        <span className="step-number">01</span>
        <div><h3>Customer details</h3><p>Who will be booking this car?</p></div>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Full name <b>*</b></span>
          <input
            ref={nameInputRef}
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            minLength={2}
          />
        </label>
        <label className="field">
          <span>Mobile number <b>*</b></span>
          <input
            name="mobile"
            type="tel"
            inputMode="numeric"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength={10}
            required
          />
        </label>
        <label className="field field-full">
          <span>Email address</span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="form-section-heading section-spaced">
        <span className="step-number">02</span>
        <div><h3>Booking preferences</h3><p>Choose a date and payment option.</p></div>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Preferred booking date <b>*</b></span>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            min={new Date().toLocaleDateString("en-CA")}
            required
          />
        </label>
        <label className="field">
          <span>Payment preference <b>*</b></span>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="Finance">Car finance</option>
            <option value="Full payment">Full payment</option>
            <option value="Not decided">Not decided yet</option>
          </select>
        </label>
        <label className="field field-full">
          <span>Additional notes</span>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Preferred colour, test drive request, or any questions..."
            rows="3"
          />
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions">
        <p><span className="required-star">*</span> Required fields</p>
        <button className="button button-primary button-large" type="submit">
          Confirm booking <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

BookingForm.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onBook: PropTypes.func.isRequired
};

export default BookingForm;