const mongoose = require('mongoose');

//using mongoose schema we'll set up the structure for all the docs that eventually have in our collection
//NOTE:- only the properties that we're setting in our schema we'll be passed to the db
const TaskSchema = new mongoose.Schema({
    // name: String,
    // comepleted: Boolean,
    //we can add validators to the specific object
    //just like we declare the variable in the c lang
    name: {
        type: String,
        // You can configure the error message for individual validators in your schema
        required: [true, 'must provide name'],
        // To eliminate leading and trailing whitespace, we use the trim() function. 
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default:false,
    }
})

//creating the model for the structure
module.exports = mongoose.model('Task', TaskSchema)

