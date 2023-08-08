# project3-group2
# Formula 1 Racing Data Exploration App

Welcome to the Formula 1 Racing Data Exploration App! This interactive web application allows users to explore Formula 1 racing data through visualizations and interactive charts. The app provides insights into drivers, teams, races, circuits, fastest lap times, and driver standings over time. Users can customize their data exploration experience, making it an ideal resource for Formula 1 enthusiasts and data enthusiasts alike.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Interactive Charts](#interactive-charts)
- [Map of Circuits](#map-of-circuits)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To run the Formula 1 Racing Data Exploration App locally, follow these steps:

1. Clone this repository to your local machine.
2. Set up a Python virtual environment (recommended) and activate it.
3. Install the required dependencies by running: `pip install -r requirements.txt`
4. Make sure you have a SQLite database file with the necessary tables and data. You can use the provided SQLite database file or create your own.
5. Update the database path in the Flask app code (`app.py`) to match the path to your SQLite database file.
6. Run the Flask app: `python app.py`
7. Access the app by opening your web browser and navigating to [http://localhost:5000](http://localhost:5000)

## Features

- **API Endpoints:** Explore various API endpoints to retrieve information about drivers, teams, races, circuits, standings, lap times, and more.
- **Interactive Charts:** Visualize Formula 1 data through interactive charts, including fastest lap times and driver standings over time.
- **Map of Circuits:** View a map displaying the locations of Formula 1 circuits around the world.

## Usage

Upon visiting the app, you'll be greeted with a welcome page that provides an overview of available routes and features. You can explore drivers, teams, races, and circuits using the provided API endpoints. Additionally, you can access interactive charts and a map of circuits to dive deeper into the data.

## API Endpoints

The app offers the following API endpoints to retrieve Formula 1 racing data:

- `/drivers`: Get a list of all drivers in Formula 1.
- `/teams`: Get a list of all teams in Formula 1.
- `/races`: Get a list of all races in Formula 1.
- `/circuits`: Get a list of all circuits in Formula 1.
- `/driver_standings/<int:race_id>`: Get driver standings for a specific race.
- `/team_standings/<int:race_id>`: Get team standings for a specific race.
- `/fastest_lap_times/<int:driver_id>`: Get the top 7 fastest lap times for a specific driver.
- `/driver_standings_over_time/<int:driver_id>`: Get driver standings over time for a specific driver.

## Interactive Charts

The app offers two interactive charts to visualize Formula 1 data:

- **Fastest Lap Times Chart:** Visualizes the fastest lap times for a selected driver across different races.
- **Driver Standings Chart:** Displays the driver standings points for a selected driver over different races, with zooming functionality.

## Map of Circuits

The app provides an interactive map displaying the locations of Formula 1 circuits worldwide. Users can choose from different map backgrounds, including OpenStreetMap, Carto Light, and Satellite Imagery.

## Technologies Used

- Flask: Backend web framework for building the API and serving the app.
- SQLite: Database system used to store and retrieve Formula 1 racing data.
- Chart.js: JavaScript library for creating interactive charts and visualizations.
- Leaflet: JavaScript library for creating interactive maps.
- HTML/CSS: Frontend languages used to structure and style the web app.
- Python: Programming language used to create the Flask application and handle data.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

