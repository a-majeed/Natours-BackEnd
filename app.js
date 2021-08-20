const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // using middleware

app.use((req,res,next) => {
    console.log('Hello from the middleware!')
    next();
});

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const port = 3000;

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length, 
        data: {
            tours
        }
    });
};

const getTour =  (req, res) => {
    const id = req.params.id *1;

    if(id > tour.length){
        return res.status(404).json({
            status: 'fail',
            message: "Invalid ID"
        });

    }
    const tour = tours.find(el => el.id === id) // only the element equal to the specified parameters will get returned and stored in tour
    res.status(200).json({
        status: 'success',
        results: tours.length, 
        data: {
            tour
        }
    });
}

const updateTour = (req, res) => {
    if(req.params.id *1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
    status: 'success',
    data: {
        tour: '<Updated tour here...>'
        }
    });

};

const createTour =  (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, req.body); // creating a new object by merging existing objects together

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`, 
        JSON.stringify(tours),
        err => {
        res.status(201).json({
            status: "success", 
            data: {
                tour: newTour
            }
        })
    });
};

const deleteTour = (req, res) => {
    if(req.params.id *1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
    status: 'success',
    data: null
    });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour); 
// app.post('/api/v1/tours', createTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);


app.listen(port, () => {
    console.log(`App running on port ${port} ..`);
});

