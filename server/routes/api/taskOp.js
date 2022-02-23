const fs = require('fs');
const path = require('path');
const taskFilePath = path.resolve(__dirname, "taskdb.json")

function readTaskFile(){
    console.log("Reading tasks: ", taskFilePath);
    let rawData = fs.readFileSync(taskFilePath);
    console.log(JSON.parse(rawData));
    return JSON.parse(rawData);
}


// function saveNewTask(req, res, next){
    
//     let newTaskObj = req.body;
//     let tasksArr = JSON.parse(fs.readFileSync(taskFilePath));
//     let taskNameArr = tasksArr.map((task) =>{
//         return task.name;
//     });

//     if(taskNameArr.includes(newTaskObj.name)){
//         res.send('Task already exist');
//     }else{
//         console.log(`Saving new task:`);
//         console.log(req.body);

//         tasksArr.push(newTaskObj);
//         console.log(tasksArr);
//         console.log(JSON.stringify(tasksArr, null, 2));
//         fs.writeFileSync(taskFilePath, JSON.stringify(tasksArr, null, 2));
//         next();
//     }

async function saveNewTask(task){
    console.log('Saving Task....')
    let tasksArr = await readTaskFile();
    tasksArr.push(task);
    // console.log(tasksArr);
    // console.log(JSON.stringify(tasksArr, null, 2));
    fs.writeFileSync(taskFilePath, JSON.stringify(tasksArr, null, 2));
 
}

async function taskExist(taskName){
    let tasksArr = await readTaskFile();
        let taskNameArr = tasksArr.map((task) =>{
            return task.name;
        }); 
    return taskNameArr.includes(taskName);
}

async function deleteTask(name){
    console.log(name);
    let tasksArr = await readTaskFile();
    const filteredTaskArr = tasksArr.filter((item) => {
        console.log(item.name);
        return item.name !== name;
    });
    console.log(filteredTaskArr);
    fs.writeFileSync(taskFilePath, JSON.stringify(filteredTaskArr, null, 2));
}

    

module.exports = { deleteTask, taskExist ,readTaskFile, saveNewTask}