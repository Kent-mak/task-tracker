<template>
    <header>
        <h1>{{title}}</h1>
        <AddTaskBtn 
            @btn-click="$emit('toggle-add-task')"  
            :text=" showAddTask ? 'Close':'Add Task'" 
            :color=" showAddTask ? 'red' : '#00ced1'" 
        />

    </header>
    
</template>

<script>
import AddTaskBtn from './AddTaskButton.vue'

export default {
    name: 'HeaderItem',
    props: {
        title: {
            type: String,
        },
        showAddTask: Boolean
    },
    components: {
        AddTaskBtn,
    },
    emits: ['toggle-add-task']
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>

