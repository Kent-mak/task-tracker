const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// middleware

app.use(bodyParser.json());
app.use(cors());

// const tasks = require('./routes/api/tasks');
// app.use('/api/tasks', tasks);
function readTaskFile(){
    let path = require('path');
    console.log("READING FILE: ", path.resolve(__dirname, "taskdb.json"));
    let rawData = fs.readFileSync(path.resolve(__dirname, "taskdb.json"));
    console.log(JSON.parse(rawData));
    return JSON.parse(rawData);

}

// get tasks file
app.get('/', (req,res) => {
    let taskFile = readTaskFile()
    res.send(taskFile);
});

// post added task
app.post('/', (req,res) => {
    console.log(req.body);
    res.json(req.body);
});

// delete task

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})
