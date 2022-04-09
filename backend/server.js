const app = require('./app');
const dotenv = require('dotenv');

// setting up config file
dotenv.config({path:'backend/config/config.env'})

const { PORT, NODE_ENV } = process.env;

app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT} in ${NODE_ENV} mode`)
})