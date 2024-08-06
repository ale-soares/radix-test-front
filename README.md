# Radix Test (Front-end)

- [Live version (Front-end)](radix-test-front.vercel.app)
- [Frontend Repo](https://github.com/ale-soares/radix-test-front)
- [Live version (Back-end)](radix-test-one.vercel.app)
- [Backend Repo](https://github.com/ale-soares/radix-test)

## Overview 🎯

This React application serves as a user interface for managing and visualizing sensor data. It integrates with backend services to fetch, display, and analyze data from various sensors. The application features a dropdown to select different sensor IDs, displays detailed measurements for the selected sensor, and visualizes the data in graphical form.

## Tools 🛠️

- React.JS
- Vite
- TypeScript
- Tailwind CSS
- Prettier
- ESLint
- ChartJS
- uuidv4
- Axios

## Installing and running 💻

1. Clone repository

`git clone git@github.com:ale-soares/radix-test-front.git`

2. Go to project folder and install dependencies

`npm install`

3. Start local server

`npm run start`

## Functionalities 🔎

### Fetch All Sensor Data

- The application fetches all sensor data from the backend when it loads.
- The data is stored in the allSensorData state.

### Unique Sensor IDs

- Extracts unique sensor IDs from the fetched sensor data.
- Stores these unique IDs in the uniqueSensorIds state to populate the dropdown menu.

### Fetch Sensor Data by ID

- Fetches data for a specific sensor ID when selected from the dropdown.
- The data is stored in the sensorData state and is used to display measurements and graphs.

### Sensor ID Selection

- Allows the user to select a sensor ID from a dropdown menu.
- Fetches and displays data for the selected sensor.

### Data Display

- Displays detailed measurements for the selected sensor using the SensorMeasurements component.
- Visualizes the sensor data using the SensorDataGraph component.

## Next Steps 📝

These points aim to enhance the functionality, usability, performance, and maintainability of the sensor data management application. Each idea can be expanded upon based on specific project requirements and user needs.

- Add sorting and filtering options for sensor data based on different parameters (e.g., timestamp, value).
- Enhance error handling to provide more informative messages or retry mechanisms for failed data fetch operations.
- Integrate real-time updates using WebSocket or server-sent events (SSE) to reflect changes in sensor data without manual refresh.
- Implement authentication and authorization mechanisms to secure access to sensitive sensor data.
- Enhance UI/UX with data visualization enhancements, such as interactive charts with zoom and pan functionalities.
- Develop a dashboard view to display multiple sensors' data simultaneously, allowing users to compare trends and anomalies.
- Enable data export functionalities, allowing users to download sensor data in CSV or Excel formats.
- Improve performance optimizations, such as memoization of fetched data or lazy loading of components.
- Implement unit tests and integration tests to ensure reliability and maintainability of the application.
- Explore accessibility improvements.

<hr>
<p>Made with ❤️ by me</p>
