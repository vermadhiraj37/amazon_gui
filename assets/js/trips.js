(function(){
  const tabs = document.querySelectorAll('.tab');
  const flightsEl = document.getElementById('trips-flights');
  const hotelsEl = document.getElementById('trips-hotels');

  function render(){
    const trips = window.TripStorage.getTrips();

    // Flights
    flightsEl.innerHTML = '';
    const flights = trips.flights || [];
    if (!flights.length){
      flightsEl.innerHTML = '<div class="empty">No flight bookings yet.</div>';
    } else {
      for (const f of flights){
        const depart = new Date(f.departTime);
        const arrive = new Date(f.arriveTime);
        const el = document.createElement('div');
        el.className = 'result-card';
        el.innerHTML = `
          <div>
            <div class="result-title">${f.carrier} • ${f.from} → ${f.to}</div>
            <div class="result-sub">${depart.toLocaleString()} • ${Math.floor(f.durationMin/60)}h ${f.durationMin%60}m • ${f.cabin} • ${f.travelers} pax</div>
          </div>
          <div>
            <div style="text-align:right; margin-bottom:6px; font-weight:600;">$${f.price}</div>
            <button class="btn btn-sm" data-type="flights" data-id="${f.id}">Remove</button>
          </div>
        `;
        el.querySelector('button').addEventListener('click', ()=>{
          window.TripStorage.remove('flights', f.id);
          render();
        });
        flightsEl.appendChild(el);
      }
    }

    // Hotels
    hotelsEl.innerHTML = '';
    const hotels = trips.hotels || [];
    if (!hotels.length){
      hotelsEl.innerHTML = '<div class="empty">No hotel bookings yet.</div>';
    } else {
      for (const h of hotels){
        const el = document.createElement('div');
        el.className = 'result-card';
        el.innerHTML = `
          <div>
            <div class="result-title">${h.name} • ${'★'.repeat(h.stars)}</div>
            <div class="result-sub">${h.city} • ${h.checkin} → ${h.checkout} • ${h.guests} guests</div>
          </div>
          <div>
            <div style="text-align:right; margin-bottom:6px; font-weight:600;">$${h.pricePerNight}/night</div>
            <button class="btn btn-sm" data-type="hotels" data-id="${h.id}">Remove</button>
          </div>
        `;
        el.querySelector('button').addEventListener('click', ()=>{
          window.TripStorage.remove('hotels', h.id);
          render();
        });
        hotelsEl.appendChild(el);
      }
    }
  }

  tabs.forEach(t=>{
    t.addEventListener('click', ()=>{
      tabs.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      const tab = t.dataset.tab;
      if (tab === 'flights'){ flightsEl.classList.remove('hidden'); hotelsEl.classList.add('hidden'); }
      else { hotelsEl.classList.remove('hidden'); flightsEl.classList.add('hidden'); }
    });
  });

  render();
})();

