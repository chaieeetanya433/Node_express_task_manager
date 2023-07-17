const mongoose = require('mongoose');   //importing mongoose

const connectDB = (url) => {
    return mongoose.connect(url, {    
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
}

module.exports = connectDB
    
