(function(){
  const form = document.getElementById('flight-form');
  const results = document.getElementById('flight-results');

  function mockSearch(data){
    const carriers = ['SkyJet','AeroSwift','BlueWave','Nimbus Air'];
    const durations = [95, 120, 180, 240, 300];
    const prices = [129, 159, 199, 249, 299, 349];
    const flights = Array.from({length: 6}).map((_,i)=>{
      const departTime = new Date(data.depart + 'T08:00:00Z');
      departTime.setHours(departTime.getHours() + i * 2);
      const duration = durations[i % durations.length];
      const arriveTime = new Date(departTime.getTime() + duration*60000);
      return {
        id: `${Date.now()}_${i}`,
        carrier: carriers[i % carriers.length],
        from: data.from,
        to: data.to,
        departTime: departTime.toISOString(),
        arriveTime: arriveTime.toISOString(),
        durationMin: duration,
        cabin: data.cabin,
        travelers: Number(data.travelers),
        price: prices[i % prices.length] * Number(data.travelers)
      };
    });
    return flights;
  }

  function renderFlights(flights){
    if (!flights.length){
      results.innerHTML = '<div class="empty">No flights found. Try different dates.</div>';
      return;
    }
    results.innerHTML = '';
    for (const f of flights){
      const depart = new Date(f.departTime);
      const arrive = new Date(f.arriveTime);
      const el = document.createElement('div');
      el.className = 'result-card';
      el.innerHTML = `
        <div>
          <div class="result-title">${f.carrier} • ${f.from} → ${f.to}</div>
          <div class="result-sub">${depart.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} - ${arrive.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} • ${Math.floor(f.durationMin/60)}h ${f.durationMin%60}m • ${f.cabin}</div>
        </div>
        <div>
          <div style="text-align:right; margin-bottom:6px; font-weight:600;">$${f.price}</div>
          <button class="btn btn-primary btn-sm" data-id="${f.id}">Book</button>
        </div>
      `;
      el.querySelector('button').addEventListener('click', ()=>{
        window.TripStorage.addFlight({
          carrier: f.carrier,
          from: f.from,
          to: f.to,
          departTime: f.departTime,
          arriveTime: f.arriveTime,
          durationMin: f.durationMin,
          cabin: f.cabin,
          travelers: f.travelers,
          price: f.price
        });
        el.querySelector('button').textContent = 'Booked';
        el.querySelector('button').disabled = true;
      });
      results.appendChild(el);
    }
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.from || !data.to || !data.depart){
      alert('Please fill From, To and Depart date.');
      return;
    }
    const flights = mockSearch(data);
    renderFlights(flights);
  });
})();

