const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req,res)=>{
    
        const tasks = await Task.find({})
        // res.status(200).json({ tasks })
        // res.status(200).json({ tasks,amount:tasks.length })
        res
            .status(200)
            .json({ tasks })      //status is a flag which is set to true
    
})

//before applying the middleware
// const createTask = async (req,res)=>{

//     //whatever we get from req.body of create task we'll simply pass that object to Task.create document 
//     //for eg., reg.body could be {name: "fisrt product"}
//     //for that we'll use async-await instead of callbacks
//     try{
//         const task = await Task.create(req.body)
//         res.status(201).json({ task })
//     }
//     catch(error) {
//         res.status(500).json({msg:error})
//     }
//     //status code 500:- the server encountered an unexpected condition that prevented it from fulfilling the request.
//     //status 201 when we have a successful POST request
//     //and here instead of req.body WE'LL pass the actual contents which needs to be passed
// }

//after applying the middleware
const createTask = asyncWrapper(async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})
 
// const getTask = async (req,res)=>{
//     try{
//         const {id:taskID} = req.params
//         const task = await Task.findOne({_id:taskID});
//     if(!task) {
//         return res.status(404).json({msg: `No task with id : ${taskID}`})
//     }
//     res.status(200).json({ task })
// } catch(error) {
//     res.status(500).json({msg:error})
// }
// }

const getTask = asyncWrapper(async (req,res,next)=>{
    const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID});
    if(!task) {
        // const error = new Error('Not found');
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // error.status = 404;
        // return next(error)
        // return res.status(404).json({msg: `No task with id : ${taskID}`})
    }
    res.status(200).json({ task })
})

// const updateTask = async (req,res)=>{
//     try{
        
//         const {id:taskID} = req.params
        
//         const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
//             new:true,
//             runValidators:true,
//         })
        
//         if(!task) {
//             return res.status(404).json({msg: `No task with id : ${taskID}`})
//         }

//         res.status(200).json({ task })
//     } catch(error) {
//         res.status(500).json({msg:error})
//     }
// }

const updateTask = asyncWrapper(async (req,res)=>{
    const {id:taskID} = req.params
        
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true,
            runValidators:true,
        })
        
        if(!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
        }

        res.status(200).json({ task })
})


// // const deleteTask = async (req,res)=>{
// //     try{
// //         const {id:taskId} = req.params;
// //         const task = await Task.findOneAndDelete({_id:taskID});
// //         if(!task) {
// //             return res.status(404).json({msg: `No task with id : ${taskID}`})
// //         }
// //         res.status(200).json({ task })
// //         // res.status(200).send()
// //         // res.status(200).json({task: null, status: 'success'})
// //     } catch(error) {
// //         res.status(500).json({msg:error})
// //     }
// // }

const deleteTask = asyncWrapper(async (req,res)=>{
    const {id:taskId} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})


// const editTask = async (res,req)=>{
//     try{
//         const {id:taskID} = req.params
        
//         const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
//             new:true,
//             runValidators:true,
//             overwrite: true,
//         })
        
//         if(!task) {
//             return res.status(404).json({msg: `No task with id : ${taskID}`})
//         }

//         res.status(200).json({ task })
//     } catch(error) {
//         res.status(500).json({msg:error})
//     }
// }

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}