const app = require('./app');
const connectDatabase = require('./config/database');

// setting up config file
require('dotenv').config({path:'config/config.env'})

// connecting to database
connectDatabase();

const { PORT, NODE_ENV } = process.env;

app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT} in ${NODE_ENV} mode`)
})

/*
TODO: 0) Look in database.js first DONE
TODO: 1) import database named connectDatabase DONE
TODO: 2) Call the connectDatabase func here DONE
*/