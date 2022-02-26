const express = require('express');
const fs = require('fs');
const { 
    toDate,
    sortTasks ,
    deleteTask ,
    taskExist, 
    readTaskFile, 
    saveNewTask, 
    saveModification
} = require('./taskOp')

const router = express.Router();



// get tasks file
router.get('/', async (req,res) => {
    let taskFile = await readTaskFile();
    taskFile = sortTasks(taskFile);
    res.json(taskFile);
});

// post added task
router.post('/', async (req,res) => {
    const newTask = req.body
    const newTaskDate = toDate(newTask.date);
    const now = new Date();
    const newTaskExist = await taskExist(newTask.name);
    if(newTaskExist || newTaskDate < now ){
        res.status(400).send('Invalid Task');
    }else{
        await saveNewTask(newTask);
        res.status(201).send('Task Added');
    }
    
});

router.post('/:name',async (req, res) => {
    const taskName  = req.params.name;
    try{
        await saveModification(taskName);
        res.status(200).send();
    }catch(err){
        res.send(err);
    }
    
});

// delete task
router.delete('/:name', async (req, res) =>{
    const taskName = req.params.name;
    const newTaskExist = await taskExist(taskName);
    if(newTaskExist){
        try{
            await deleteTask(taskName);
            res.status(200).send();
        }catch(err){
            res.send(err);
        }
    }else{
        res.send(`Task doesn't exist`);
    }
        
        
})

module.exports = router;