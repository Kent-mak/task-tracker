const express = require('express');
const fs = require('fs');
const {readTaskFile, saveNewTask} = require('./taskOp')

const router = express.Router();



// get tasks file
router.get('/', (req,res) => {
    let taskFile = readTaskFile()
    res.send(taskFile);
});

// post added task
router.post('/',saveNewTask, (req,res) => {

    res.send(req.body);
});

// delete task

module.exports = router;