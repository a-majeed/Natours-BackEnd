const Tour = require('./../models/tourModel');

// exports.checkBody = (req,res,next) => {
//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status: 'fail',
//             message: 'missing name or price'
//         });
//     }
//     next();
// }

exports.getAllTours = async (req, res) => {
    try{
        
        // BUILD QUERY
        // 1) FILTERING
        const queryObj = { ...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B) ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Tour.find(JSON.parse(queryStr));

        // 2) SORTING
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } 
        else {
            query = query.sort('-createdAt');

        }

        // 3) FIELD LIMITING 
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }
        else{
            query = query.select('-__v');
        }

        // 4) PAGINATION
        // page=2&limit=10, 1-10 page 1, 11-20 page2, 21-30 page 3
        query = query.skip(2).limit(10)
        // EXECUTE QUERY
        const tours = await query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length, 
            data: {
                tours
            }
        });
    } catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getTour =  async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            results: tours.length, 
            data: {
                tour
            }
     });       
    } catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
     });       
    } catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.createTour = async (req, res) => {
    try{

        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: "success", 
            data: {
                tour: newTour
            }
        });  
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTour = async (req, res) => {
    res.status(204).json({
    status: 'success',
    data: null
    });
};

exports.deleteTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
     });       
    } catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}