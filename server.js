'use strict';
// Express helps us build routes and create a server
// without writing low-level Node code.
const express = require('express');
// Allows our React frontend to communicate with
// our backend server.
const cors = require('cors');
// Axios lets our backend make requests to outside APIs.
const axios = require('axios');

// ADD eNVIRONMENT VARIABLES
// Load environment variables.
// Gives us access to values stored in .env.
require('dotenv').config();

// // CREATE EXPRESS APPLICATION
// This gives us access to routes, middleware,
// and server configuration.
const app = express();

// MIDDLEWARE
// Enable CORS for every route.
// Without this, browsers block frontend requests.
app.use(cors());

// PORT
// Store the port number.
// WHY:
// Allows us to change ports without editing code.
const PORT = process.env.PORT || 3001;


// =====================================================
// WEATHER CLASS
// =====================================================
// Create a Forecast class.
//
// WHY:
// WeatherBit returns huge objects.
// We only want the data our frontend needs.

class Forecast {
  constructor(day) {
    // Save a formatted weather description.
    // WHY:
    // Easier for the frontend to display.
    this.description =
      `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    // Save the forecast date.
    // WHY:
    // Frontend needs a date to display.
    this.date = day.datetime;
  }
}


// =====================================================
// MOVIE CLASS
// =====================================================
// Create a Movie class.
// WHY:
// TMDB returns lots of data.
// We only send the fields our frontend needs.

class Movie {
  constructor(movie) {
    // Save movie title.
    // Frontend displays movie names.
    this.title = movie.title;
    // Save movie description.
    // Gives users movie information.
    this.overview = movie.overview;
    // Save average vote score.
    // Shows movie rating.
    this.average_votes = movie.vote_average;
    // Save vote count.
    // Shows how many users voted.
    this.total_votes = movie.vote_count;
    // Build full image URL.
    // WHY:
    // TMDB only provides part of the URL.
    this.image_url =
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    // Save popularity score.
    // Useful movie information.
    this.popularity = movie.popularity;
    // Save release date.
    // Frontend can display release year
    this.released_on = movie.release_date;
  }
}
// =====================================================
// HOME ROUTE
// =====================================================

// Create a test route.
// Allows us to verify the server is running.

app.get('/', (request, response) => {

  response.send('City Explorer API Running');

});

// =====================================================
// WEATHER ROUTE
// =====================================================
// Create the weather endpoint.
// React will call this route whenever
// a city search occurs.
app.get('/weather', handleWeather);

// Handle weather requests.
// WHY:
// Keeps route logic organized and easier to read.
async function handleWeather(request, response, next) {
  try {
    // Read latitude from query parameters.
    // WeatherBit needs coordinates.
    const lat = request.query.lat;

    // Read longitude from query parameters.
    // WeatherBit needs coordinates.
    const lon = request.query.lon;

    // Build WeatherBit URL.
    // WHY:
    // Tells WeatherBit what location and
    // how many forecast days we want.
    const weatherUrl =
      `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;

    // Request weather data.
    // WHY:
    // This is where our backend talks
    // to the external WeatherBit API.
    const weatherResponse =
      await axios.get(weatherUrl);

    // Convert raw weather data into Forecast objects.
    // WHY:
    // Gives React cleaner data.
    const weatherArray =
      weatherResponse.data.data.map((day) => {

        return new Forecast(day);

      });

    // Send weather data to frontend.
    // React needs this data to display forecasts.
    response.send(weatherArray);

  } catch (error) {

    next(error);

  }
}


// =====================================================
// MOVIES ROUTE
// =====================================================
// Create movie endpoint.
// WHY:
// React will request movie data here.
app.get('/movies', handleMovies);

// Handle movie requests.
// WHY:
// Keeps movie logic separate and organized.
async function handleMovies(request, response, next) {
  try {

    // Read city name from query parameters.
    // WHY:
    // TMDB searches by city name.
    const city =
      request.query.searchQuery;

    // Build TMDB URL.
    // WHY:
    // Sends city name to movie database.
    const movieUrl =
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

    // Request movie data.
    // WHY:
   // Our backend communicates with TMDB.
    const movieResponse =
      await axios.get(movieUrl);

    // Create clean movie objects.
    // WHY:
    // React only needs selected fields.
    const movies =
      movieResponse.data.results.map((movie) => {

        return new Movie(movie);

      });

    // Send movies to frontend.
    // WHY:
    // React displays movie cards.

    response.send(movies);

  } catch (error) {

    next(error);

  }
}


// =====================================================
// ERROR HANDLER
// =====================================================
// Catch unexpected errors.
// WHY:
// Prevents server crashes and sends a useful
// response back to the frontend.

app.use((error, request, response, next) => {

  response.status(500).send({

    error: 'Something went wrong on our server.'

  });

});


// =====================================================
// START SERVER
// =====================================================
// Start the server.
// Without app.listen(), no routes are available.

app.listen(PORT, () => {

  console.log(`Server listening on port ${PORT}`);

});