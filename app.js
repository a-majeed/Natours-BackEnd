const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

// MIDDLEWARE

app.use(express.json());
//app.use(morgan('dev')); 
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) => {
    console.log('Hello from the middleware!')
    next();
});

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const port = 3000;


// ROUTE HANDLERS


// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour); 
// app.post('/api/v1/tours', createTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// SERVERS

module.exports = app;