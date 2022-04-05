require('dotenv').config();
require('express-async-errors');
// Express
const express = require('express');
const app = express();

// Connect Database
const connectDB = require('./db/connect');

// Error Handler Middleware Import
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Routes
app.get('/', (req, res) => {
    res.send('E-commerce API')
})

// Middleware 
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start App Fnc
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })

    } catch (error) {
        console.log(error)
    }
};
start()