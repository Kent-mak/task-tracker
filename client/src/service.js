/* eslint-disable no-unused-vars */
import axios  from "axios";

const url = 'http://localhost:3000/api/task_tracker/';

class service {
    // get
    static async getTasks() {
        return new Promise( (resolve, reject) => {
            console.log('called');
            axios.get(url)
            .then((res) => {
                const data = res.data;
                console.log(data);
                resolve(data);
                reject('Get Task Failed');
            }),(err) => {
                console.log(err);
            };
        });
    }

    // add
    static async addNewTask(newTask){
        return await axios.post(url, newTask);
    }

    // delete
}

export default service;
