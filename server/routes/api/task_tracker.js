const express = require('express');
const fs = require('fs');
const { deleteTask ,taskExist, readTaskFile, saveNewTask} = require('./taskOp')

const router = express.Router();



// get tasks file
router.get('/', async (req,res) => {
    const taskFile = await readTaskFile();
    res.json(taskFile);
});

// post added task
router.post('/', async (req,res) => {
    const newTask = req.body
    const newTaskExist = await taskExist(newTask.name);
    if(newTaskExist){
        res.send('Task Already Exist');
    }else{
        await saveNewTask(newTask);
        res.status(201).send();
    }
    
});

// delete task
router.delete('/:name', (req, res) =>{

    res.status(200).send();
})

module.exports = router;