const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(con => console.log('DB connection successful'));

// READ JSON FILE

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT DATA INTO DB
const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('Data successfuly loaded!');
        process.exit();
    } catch (err) {
        console.log(err)
    }
}

// DELETE ALL DATA FROM DB 

const deletetData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfuly deleted!');
        process.exit();
    } catch (err) {
        console.log(err)
    }
}

if(process.argv[2] === '--import'){
    importData();
} else if (process.argv[2] === '--delete'){
    deletetData();
}
