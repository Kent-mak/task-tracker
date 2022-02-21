const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// middleware

app.use(bodyParser.json());
app.use(cors());

const task_tracker = require('./routes/api/task_tracker');
app.use('/api/task_tracker', task_tracker);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})
