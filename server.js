/* eslint-env node */
'use strict';


// Import Express
import express from 'express';

//JSON file
import list from './public/shopping-list.json';

function getShoppingList(type) {
  return list.filter(item => item.type === type);

app.get('/shoppingList', (request, response) => {
 const type = request.query.type || 'type';
 console.log(request.query);

 const results = getShoppingList(type);
 response.status(200).send(results);

});

}
// Create Express app
const app = express();

// Set port
const PORT = process.env.PORT || 3001;

//Error Handlers
app.use('*', (request, response) => {
 response.status(404).send('Not Found');
});

app.get('/throw-an-error', (request, response) => {
 throw new Error('Something went wrong!');
});

app.use((error, request, response, next) => {
 response.status(500).send(error.message);
});


// =========================
// ROUTES
// =========================

// Home route
app.get('/', (request, response) => {
  response.send('Home Page');
});


// Banana route
app.get('/bananas', (request, response) => {
  response.json({ message: 'Bananas are great!',
  });

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});