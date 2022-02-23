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