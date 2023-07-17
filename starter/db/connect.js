const mongoose = require('mongoose');   //importing mongoose

// const connectionString = 
// 'mongodb+srv://chai_eee_tanya:619@cluster0.jjdeb4h.mongodb.net/01-TASK-MANAGER?retryWrites=true&w=majority'

const connectDB = (url) => {
    return mongoose.connect(url, {    
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
}

module.exports = connectDB
    