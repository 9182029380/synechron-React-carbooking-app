import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import cars from "../data/cars";
import CarCard from "../components/CarCard";

function Home({ onBook }) {
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("All");

  const filteredCars = useMemo(() => {
    const term = search.trim().toLowerCase();
    return cars.filter((car) => {
      const matchesSearch = `${car.name} ${car.brand} ${car.type}`.toLowerCase().includes(term);
      const matchesFuel = fuelFilter === "All" || car.fuel === fuelFilter;
      return matchesSearch && matchesFuel;
    });
  }, [search, fuelFilter]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker"><span className="status-dot" /> YOUR NEXT JOURNEY STARTS HERE</span>
          <h1>Find the car that<br /><em>moves you.</em></h1>
          <p>Explore our latest models, compare your options, and book your next car in a few simple steps.</p>
          <a href="#available-cars" className="button button-light">Explore cars <span>↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-circle circle-one" />
          <div className="hero-circle circle-two" />
          <div className="hero-car">
            <svg viewBox="0 0 600 260">
              <path d="M62 158 L100 90 Q115 70 151 65 L356 65 Q390 68 430 111 L492 139 Q521 151 530 179 L530 205 L48 205 L48 181 Q48 164 62 158Z" fill="#f6f8fa" stroke="#a8bdca" strokeWidth="5"/>
              <path d="M145 82 L232 82 L232 130 L113 130Z" fill="#7897a9"/>
              <path d="M247 82 L353 82 Q383 84 414 130 L247 130Z" fill="#7897a9"/>
              <path d="M52 161 L98 161 M478 161 L523 161" stroke="#f3b65b" strokeWidth="13" strokeLinecap="round"/>
              <path d="M234 141 L234 199" stroke="#a8bdca" strokeWidth="4"/>
              <circle cx="148" cy="203" r="38" fill="#18354a"/><circle cx="148" cy="203" r="17" fill="#bdcbd4"/>
              <circle cx="438" cy="203" r="38" fill="#18354a"/><circle cx="438" cy="203" r="17" fill="#bdcbd4"/>
            </svg>
          </div>
          <div className="hero-note"><span className="hero-note-icon">✓</span><span><strong>Simple. Secure. Convenient.</strong><small>Your car booking, made easier.</small></span></div>
        </div>
      </section>

      <main className="page-container" id="available-cars">
        <div className="section-top">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Find your next car</h2>
            <p className="section-subtitle">Explore our available models and choose the right fit for you.</p>
          </div>
          <span className="results-count">{filteredCars.length} models available</span>
        </div>

        <div className="filters">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by model, brand, or type..." aria-label="Search cars" />
          </label>
          <label className="filter-select">
            <span>Fuel type</span>
            <select value={fuelFilter} onChange={(event) => setFuelFilter(event.target.value)}>
              <option>All</option><option>Petrol</option><option>Electric</option><option>Hybrid</option>
            </select>
          </label>
        </div>

        {filteredCars.length ? (
          <div className="car-grid">
            {filteredCars.map((car) => <CarCard key={car.id} car={car} onBook={onBook} />)}
          </div>
        ) : (
          <div className="empty-state"><span>⌕</span><h3>No cars found</h3><p>Try a different search or fuel type.</p><button className="button button-outline" onClick={() => { setSearch(""); setFuelFilter("All"); }}>Clear filters</button></div>
        )}
      </main>
    </>
  );
}

Home.propTypes = { onBook: PropTypes.func.isRequired };
export default Home;