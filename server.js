const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Catching uncaught exceptions
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(con => console.log('DB connection successful'));



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port} ..`);
});

// Errors outside of express
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    server.close( () => {
        process.exit(1);
    })
});

