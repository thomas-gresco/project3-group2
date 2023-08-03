from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

# Helper function to execute SQL queries and fetch results
def execute_query(query, params=None, fetchone=False):
    connection = sqlite3.connect('sqlite_database/f1_database.sqlite')
    cursor = connection.cursor()
    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)
    if fetchone:
        result = cursor.fetchone()
    else:
        result = cursor.fetchall()
    connection.commit()
    connection.close()
    return result

# Route to welcome users to the API
@app.route('/', methods=['GET'])
def welcome():
    return (
        f"Welcome to the Formula 1 Racing App API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/drivers<br/>"
        f"- List of all the drivers in Formula 1<br/>"
        f"/api/v1.0/teams<br/>"
        f"- List of all the teams in Formula 1<br/>"
        f"/api/v1.0/circuits<br/>"
        f"- List of all the circuits in Formula 1<br/>"
        f"/api/v1.0/driver_standings/<int:race_id><br/>"
        f"- List of the driver standings for a specific race<br/>"
        f"/api/v1.0/team_standings/<int:race_id><br/>"
        f"- List of the team standings for a specific race<br/>"
    )

# Route to get all drivers
@app.route('/drivers', methods=['GET'])
def get_drivers():
    query = 'SELECT driverId, driverRef, firstname, lastname, nationality FROM Drivers'
    drivers = execute_query(query)
    columns = ('driverId', 'driverRef', 'firstname', 'lastname', 'nationality')
    drivers_data = [dict(zip(columns, driver)) for driver in drivers]
    return jsonify(drivers_data)

# Route to get all teams
@app.route('/teams', methods=['GET'])
def get_teams():
    query = 'SELECT teamId, name, nationality FROM Teams'
    teams = execute_query(query)
    columns = ('teamId', 'name', 'nationality')
    teams_data = [dict(zip(columns, team)) for team in teams]
    return jsonify(teams_data)

# Route to get all circuits
@app.route('/circuits', methods=['GET'])
def get_circuits():
    query = 'SELECT circuitId, name, location, country, lat, lng FROM Circuits'
    circuits = execute_query(query)
    columns = ('circuitId', 'name', 'location', 'country', 'lat', 'lng')
    circuits_data = [dict(zip(columns, circuit)) for circuit in circuits]
    return jsonify(circuits_data)

# Route for driver standings for a specific race
@app.route('/driver_standings/<int:race_id>', methods=['GET'])
def get_driver_standings(race_id):
    query = 'SELECT driverStandingsId, raceId, driverId, points, position FROM driver_standings WHERE raceId = ?'
    params = (race_id,)
    driver_standings = execute_query(query, params)
    columns = ('driverStandingsId', 'raceId', 'driverId', 'points', 'position')
    driver_standings_data = [dict(zip(columns, standing)) for standing in driver_standings]
    return jsonify(driver_standings_data)

# Route for team standings for a specific race
@app.route('/team_standings/<int:race_id>', methods=['GET'])
def get_team_standings(race_id):
    query = 'SELECT teamStandingsId, raceId, teamId, points, position FROM team_standings WHERE raceId = ?'
    params = (race_id,)
    team_standings = execute_query(query, params)
    columns = ('teamStandingsId', 'raceId', 'teamId', 'points', 'position')
    team_standings_data = [dict(zip(columns, standing)) for standing in team_standings]
    return jsonify(team_standings_data)

if __name__ == '__main__':
    app.run(debug=True)