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
        // console.log(item.name);
        return item.name !== name;
    });
    console.log(filteredTaskArr);
    fs.writeFileSync(taskFilePath, JSON.stringify(filteredTaskArr, null, 2));
}

function toDate (date){
    // yyyy/dd/mm   
    let year = date.slice(0,4);
    let month = date.slice(5,7);
    let day = date.slice(-2)
    year = parseInt(year,10);
    month = parseInt(month,10);
    day = parseInt(day,10);
    // console.log([year,month,day]);
    let dateObj = new Date(year,month-1,day)
    return dateObj;
}

function partition(front, end, arr){
    let i = front;
    let pivot = toDate(arr[end].date)

    for( let j = front; j < end; j++){
        let date = toDate(arr[j].date);
        // console.log(j);
        // console.log(date <= pivot );
        if(date <= pivot){
            [arr[i],arr[j]] = [arr[j], arr[i]];
            // console.log(arr);
            i++;
            // console.log(i);
        }
    }
    // console.log('fin');
    // console.log(`i: ${i}`);    
    [arr[i],arr[end]] = [arr[end],arr[i]];
    

    return [arr,i];
}

function quickSort(Arr, front, end){
    if(front < end){
        let pArr = partition(front,end,Arr);
        Arr = pArr[0];
        // console.log(Arr)
        let pivot = pArr[1];
        // console.log(`pivot: ${pivot}`)
        quickSort(Arr, front, pivot-1);
        // console.log(Arr)
        quickSort(Arr, pivot + 1, end);

    }
}

function sortTasks (taskArr){
    quickSort(taskArr, 0, taskArr.length-1);
    
    return taskArr;
}

async function saveModification(name){
    let tasksArr = await readTaskFile();
    tasksArr.forEach((task) => {
        task.name === name ? task.reminder = !task.reminder:""  ;
    })
    fs.writeFileSync(taskFilePath, JSON.stringify(tasksArr, null, 2));

}

    

module.exports = {toDate,sortTasks, deleteTask, taskExist ,readTaskFile, saveNewTask, saveModification}