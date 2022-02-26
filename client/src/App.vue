/* eslint-disable no-unused-vars */
<template>
  <div class="container">
    <HeaderItem  @toggle-add-task="toggleAddTask" title="Task Tracker" :showAddTask="isShown" />
    <div v-if="isShown">
    <AddTask @add-task="addTask($event)" /> 
    </div>
    
    <TasksItem @toggle-reminder="toggleReminder($event)" @delete-task="deleteTask($event)" :tasks="tasks" />
    
  </div>
  
</template>

<script>
  import HeaderItem from './components/Header.vue'
  import TasksItem from './components/Tasks.vue'
  import AddTask from './components/AddTask.vue'
  import service from './service'
  export default {
    name: 'App',
    components: {
      HeaderItem,
      TasksItem,
      AddTask,
    },
    data(){
      return{
        tasks: [],
        isShown: false,
        error:''
      }
    },
    methods: {
      async deleteTask(name){
        try{
          const res = service.deleteData(name);
          console.log((await res).statusText);

          this.tasks = await service.getData();
        }catch(err){
          console.log(err);
        }
      },
      async toggleReminder(name){
        try{
          const res = await service.saveModData(name);
          console.log((await res).statusText);
          this.tasks.forEach((task) => {
          task.name === name ? task.reminder = !task.reminder:""  ;
          })
        }catch(err){
          console.log(err);
          alert('error occured');
        }
        
        

      },
      async addTask(newTask){
        this.tasks.push(newTask)
        try{
          const res = service.addData(newTask);
          alert((await res).data);
          console.log((await res).statusText);
          this.tasks = await service.getData();
        }catch(err){
          console.log(err);
          alert('error occured');
        }
      },
      toggleAddTask(){
        this.isShown = !this.isShown;
        console.log(this.isShown);
      },
    },
    async created(){
      try{
        this.tasks = await service.getData();
      }catch(err){
        this.error = err;
      }
      
    }
  }


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
