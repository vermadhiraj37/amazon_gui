(function(){
  const form = document.getElementById('hotel-form');
  const results = document.getElementById('hotel-results');

  function mockSearch(data){
    const names = ['Grand Plaza','Cityscape Inn','Harborview Suites','Aurora Hotel','The Courtyard','Central Stay'];
    const stars = [3,4,5,4,5,3];
    const prices = [89, 119, 149, 189, 229, 269];
    return Array.from({length: 6}).map((_,i)=>({
      id: `${Date.now()}_${i}`,
      name: names[i],
      city: data.city,
      stars: stars[i],
      price: prices[i],
      guests: Number(data.guests),
      checkin: data.checkin,
      checkout: data.checkout
    }));
  }

  function renderHotels(hotels){
    if (!hotels.length){
      results.innerHTML = '<div class="empty">No hotels found. Try different dates.</div>';
      return;
    }
    results.innerHTML = '';
    for (const h of hotels){
      const el = document.createElement('div');
      el.className = 'result-card';
      el.innerHTML = `
        <div>
          <div class="result-title">${h.name} • ${'★'.repeat(h.stars)}</div>
          <div class="result-sub">${h.city} • ${h.checkin} → ${h.checkout} • ${h.guests} guest${h.guests>1?'s':''}</div>
        </div>
        <div>
          <div style="text-align:right; margin-bottom:6px; font-weight:600;">$${h.price}/night</div>
          <button class="btn btn-primary btn-sm" data-id="${h.id}">Book</button>
        </div>
      `;
      el.querySelector('button').addEventListener('click', ()=>{
        window.TripStorage.addHotel({
          name: h.name,
          city: h.city,
          stars: h.stars,
          pricePerNight: h.price,
          guests: h.guests,
          checkin: h.checkin,
          checkout: h.checkout
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
    if (!data.city || !data.checkin || !data.checkout){
      alert('Please fill City, Check-in and Check-out.');
      return;
    }
    const hotels = mockSearch(data);
    renderHotels(hotels);
  });
})();

