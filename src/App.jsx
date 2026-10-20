import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewBooking from "./pages/NewBooking";
import BookingDashboard from "./pages/BookingDashboard";
import "./App.css";

const STORAGE_KEY = "drivenow-bookings";

function readBookings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function App() {
  const [bookings, setBookings] = useState(readBookings);

  // useEffect: keep browser storage in sync with React state.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  // Methods as Props: this parent method is passed down to the booking form.
  const createBooking = useCallback((formData) => {
    const newBooking = {
      ...formData,
      bookingId: `CAR-${Date.now().toString().slice(-7)}`,
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };
    setBookings((previous) => [newBooking, ...previous]);
  }, []);

  // Methods as Props: dashboard receives this function to cancel a booking.
  const cancelBooking = useCallback((bookingId) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  }, []);

  // Passed to each CarCard as a method prop. This is a small demo callback.
  const startBooking = useCallback((carId) => {
    console.log("Starting booking for car ID:", carId);
  }, []);

  return (
    <div className="app-shell">
      <Navbar bookingCount={bookings.length} />
      <Routes>
        <Route path="/" element={<Home onBook={startBooking} />} />
        <Route path="/book/:carId" element={<NewBooking onCreateBooking={createBooking} />} />
        <Route path="/bookings" element={<BookingDashboard bookings={bookings} onCancel={cancelBooking} />} />
        <Route path="*" element={
          <main className="page-container not-found">
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <a className="button button-primary" href="/">Go home</a>
          </main>
        } />
      </Routes>
      <footer className="site-footer">
        <div className="footer-inner"><span>DriveNow <small>CAR BOOKING</small></span><p>Find your next journey.</p><span>React learning project</span></div>
      </footer>
    </div>
  );
}

export default App;