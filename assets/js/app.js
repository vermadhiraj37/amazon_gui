(function initQueryPrefill(){
  const params = new URLSearchParams(location.search);
  const to = params.get('to');
  const city = params.get('city');
  if (to && document.getElementById('to')) {
    document.getElementById('to').value = to;
  }
  if (city && document.getElementById('city')) {
    document.getElementById('city').value = city;
  }
})();

window.TripStorage = {
  getTrips() {
    try { return JSON.parse(localStorage.getItem('wanderly_trips') || '{}'); } catch { return {}; }
  },
  saveTrips(data) {
    localStorage.setItem('wanderly_trips', JSON.stringify(data));
  },
  addFlight(flight) {
    const trips = this.getTrips();
    trips.flights = trips.flights || [];
    trips.flights.push({ id: crypto.randomUUID(), createdAt: Date.now(), ...flight });
    this.saveTrips(trips);
  },
  addHotel(hotel) {
    const trips = this.getTrips();
    trips.hotels = trips.hotels || [];
    trips.hotels.push({ id: crypto.randomUUID(), createdAt: Date.now(), ...hotel });
    this.saveTrips(trips);
  },
  remove(type, id) {
    const trips = this.getTrips();
    if (!trips[type]) return;
    trips[type] = trips[type].filter(x => x.id !== id);
    this.saveTrips(trips);
  }
};

