const fs = require('fs');
const path = require('path');
const taskFilePath = path.resolve(__dirname, "taskdb.json")

function readTaskFile(req, res, next){
    console.log("Reading tasks: ", taskFilePath);
    let rawData = fs.readFileSync(taskFilePath);
    console.log(JSON.parse(rawData));
    return JSON.parse(rawData);
}

function saveNewTask(req, res, next){
    
    console.log(`Saving new task:`);
    console.log(req.body);
    let tasksArr = JSON.parse(fs.readFileSync(taskFilePath));
    // console.log(`tasksArr: `);
    // console.log(tasksArr);
    let newTaskObj = req.body;
    // console.log(`newTask: `);
    // console.log(newTaskObj);

    tasksArr.push(newTaskObj);
    console.log(tasksArr);
    console.log(JSON.stringify(tasksArr, null, 2));
    fs.writeFileSync(taskFilePath, JSON.stringify(tasksArr, null, 2));


    next();
}

module.exports = {readTaskFile, saveNewTask}