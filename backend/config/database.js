const mongoose = require('mongoose');
// require('dotenv').config({ path: 'config' });

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI)
    .then(con => {console.log(`Mongo DB connected with HOST: ${con.connection.host}`)})
}

module.exports = connectDatabase

//* important info
//! old method be careful
//? is it really necessary?
//TODO: refactor this part
//@param myParam
//MORE THAN 3 SLASHES = ////CROSS OUT

/* 
TODO: 1) add DB_LOCAL_URI = mongodb://localhost:27017/shopit/ to config.env DONE
TODO: 2) connect mongoose thru DB_LOCAL_URI with process.env DONE
TODO: 3) pass object to connect and set useNewUrlParse, useUnifiedTopology, useCreateIndex to true in obj DONE
TODO: 4) .then in arrow func, clg MONGO DB connected with HOST: con.connection.host DONE
TODO: 5) import it in sever.js DONE
*/

