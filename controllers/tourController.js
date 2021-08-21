const Tour = require('./../models/tourModel');

exports.checkBody = (req,res,next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'missing name or price'
        });
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        // results: tours.length, 
        // data: {
        //     tours
        // }
    });
};

exports.getTour =  (req, res) => {
    const tour = tours.find(el => el.id === id) // only the element equal to the specified parameters will get returned and stored in tour
    // res.status(200).json({
    //     status: 'success',
    //     results: tours.length, 
    //     data: {
    //         tour
    //     }
    // });
}

exports.updateTour = (req, res) => {
    res.status(200).json({
    status: 'success',
    data: {
        tour: '<Updated tour here...>'
        }
    });

};

exports.createTour =  (req, res) => {
    res.status(201).json({
        status: "success", 
        // data: {
        //     tour: newTour
        // }
    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
    status: 'success',
    data: null
    });
};