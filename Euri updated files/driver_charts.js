// Add the Chart.js library script
const chartJsScript = document.createElement('script');
chartJsScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(chartJsScript);

// Add the Chart.js Zoom plugin script
const chartJsZoomPluginScript = document.createElement('script');
chartJsZoomPluginScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom';
document.head.appendChild(chartJsZoomPluginScript);

let lapTimesChart = null; // Variable to store the Chart instance
let driverStandingsChart = null; // Variable to store the Chart instance for driver standings

// Function to format time in seconds to "m:ss.SSS" format
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const secondsWithMilliseconds = (timeInSeconds % 60).toFixed(3).padStart(6, '0'); // Ensure 3 decimal places and pad with zeros
    return `${minutes}:${secondsWithMilliseconds}`;
  }
  
  // Function to fetch and display fastest lap times for the selected driver
  function fetchFastestLapTimes() {
    const driverSelect = document.getElementById('driverSelect');
    const driverId = driverSelect.value;
  
    fetch(`/api/v1.0/fastest_lap_times/${driverId}`)
      .then(response => response.json())
      .then(data => {
        // Process the data received from the server (Flask/SQLite)
        const lapTimes = data;
        const lapTimesData = lapTimes.map(item => {
          // Convert the lap time in "m:ss.SSS" format to seconds for Chart.js
          const lapTimeParts = item.fastestLapTime.split(':');
          const minutesInSeconds = parseInt(lapTimeParts[0]) * 60;
          const secondsWithMilliseconds = parseFloat(lapTimeParts[1]);
          return minutesInSeconds + secondsWithMilliseconds;
        });
        const raceIdsData = lapTimes.map(item => item.raceId);
  
        // Destroy the previous chart instance if it exists
        if (lapTimesChart) {
          lapTimesChart.destroy();
        }
  
        // Create a new horizontal bar chart using Chart.js
        const canvasElement = document.getElementById('lapTimesChart');
        lapTimesChart = new Chart(canvasElement, {
          type: 'bar',
          data: {
            labels: raceIdsData,
            datasets: [
              {
                label: 'Fastest Lap Times',
                data: lapTimesData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: 'y',
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Race ID',
                },
              },
              x: {
                beginAtZero: false, // Start the scale from the lowest value in the data
                title: {
                  display: true,
                  text: 'Fastest Lap Time',
                },
                ticks: {
                  // To set custom step size and maximum value for x-axis
                  stepSize: 5, // Customize the step size based on your data
                  callback: function (value) {
                    const minutes = Math.floor(value / 60);
                    const secondsWithMilliseconds = (value % 60).toFixed(3).padStart(6, '0');
                    return `${minutes}:${secondsWithMilliseconds}`;
                  },
                },
              },
            },
            responsive: true,
            plugins: {
              legend: {
                display: true, 
              },
              title: {
                display: true,
                text: 'Fastest Lap Times',
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: function (context) {
                    const lapTimeInSeconds = context.parsed.y; // Use parsed value directly
                    const raceId = context.dataset.labels[context.dataIndex];
                    return `Race ID: ${raceId}, Lap Time: ${formatTime(lapTimeInSeconds)}`;
                  },
                },
              },
            },
          },
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  // Function to fetch and display driver standings over time for the selected driver
  function fetchDriverStandingsOverTime() {
    const driverSelect = document.getElementById('driverSelect');
    const driverId = driverSelect.value;

    fetch(`/api/v1.0/driver_standings_over_time/${driverId}`)
        .then(response => response.json())
        .then(data => {
            // Process the data received from the server (Flask/SQLite)
            const driverStandings = data;
            const raceIdsData = driverStandings.map(item => item.raceId);
            const pointsData = driverStandings.map(item => item.points);

            // Destroy the previous chart instance if it exists
            if (driverStandingsChart) {
                driverStandingsChart.destroy();
            }

            // Create a new line chart using Chart.js with zooming enabled
            const canvasElement = document.getElementById('driverStandingsChart');
            driverStandingsChart = new Chart(canvasElement, {
                type: 'line',
                data: {
                    labels: raceIdsData,
                    datasets: [{
                        label: 'Driver Points',
                        data: pointsData,
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Driver Points',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Race ID',
                            },
                        },
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Driver Points Per Race',
                        },
                        zoom: {
                            zoom: {
                                enabled: true,
                                mode: 'xy', // Enable zooming in both x and y directions
                            },
                        },
                    },
                },
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
  
  // Function to fetch driver names and populate the dropdown on page load
  function fetchDriverNames() {
    fetch('/api/v1.0/drivers')
      .then(response => response.json())
      .then(data => {
        const driverSelect = document.getElementById('driverSelect');
        data.forEach(driver => {
          const option = document.createElement('option');
          option.value = driver.driverId;
          option.text = `${driver.first_name} ${driver.last_name}`;
          driverSelect.appendChild(option);
        });
  
        // Fetch fastest lap times for the first driver in the dropdown by default
        fetchFastestLapTimes();
      });
  }
  
  // Fetch driver names and populate the dropdown on page load
  fetchDriverNames();
  
  // Event listener for the dropdown selection change
  document.getElementById('driverSelect').addEventListener('change', fetchDriverStandingsOverTime);
  