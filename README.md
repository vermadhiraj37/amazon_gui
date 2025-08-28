# Wanderly - Travel Recommendations Website

Wanderly is a lightweight static travel site with flight and hotel search, mock results, and local saved trips.

## Features
- Flights search with mock results and booking to localStorage
- Hotels search with mock results and booking to localStorage
- "My Trips" page to view/remove saved bookings
- Responsive, modern UI

## Quickstart
Serve the folder and open the site:

```bash
python3 -m http.server 8080 --directory /workspace
```

Then open `http://localhost:8080`.

## Pages
- `index.html`: Landing with destinations and packages
- `flights.html`: Flights search and booking
- `hotels.html`: Hotels search and booking
- `trips.html`: View and remove saved bookings

## Tech
- Static HTML/CSS/JS
- Storage: `localStorage` (`wanderly_trips` key)

## Notes
- All data is mocked on the client; no backend required.