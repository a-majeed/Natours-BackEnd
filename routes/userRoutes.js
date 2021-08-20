const express = require('express')

const router = express.Router();


const getAllUsers = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet defined"
    });
};

const getUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet defined"
    });
};

const createUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet defined"
    });
};

const updateUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet defined"
    });
};

const deleteUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet defined"
    });
};


router
    .route('api/v1/users')
    .get(getAllUsers)
    .post(createUser);

router
    .route('api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);



module.exports = router;
