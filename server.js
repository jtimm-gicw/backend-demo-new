'use strict';

// Import Express
import express from 'express';

//JSON file
import shoppingList from './public/shopping-list.json' with { type: 'json' };

// Create Express app
const app = express();

// Set port
const PORT = process.env.PORT || 3001;


// Function to filter shopping list by type
function getShoppingList(type) {
  return shoppingList.filter(item => item.type === type);
}


// =========================
// ROUTES
// =========================

// Shopping List route
app.get('/shoppingList', (request, response) => {
 const type = request.query.type || 'type';
 console.log(request.query);

 const results = getShoppingList(type);
 response.status(200).send(results);

});


// Home route
app.get('/', (request, response) => {
  response.send('Home Page');
});


// Banana route
app.get('/bananas', (request, response) => {
  response.json({
    message: 'Bananas are great!',
  });
});


//Error Handlers
app.use('/', (request, response) => {
 response.status(404).send('Not Found');
});

app.get('/throw-an-error', (request, response) => {
 throw new Error('Something went wrong!');
});

app.use((error, request, response, next) => {
 response.status(500).send(error.message);
});


// =========================
// START SERVER
// Must be at the end of the file
// =========================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});