<template>
    <div v-for="task in tasks" :key="task.id" >

        <TaskItem @toggle-reminder="$emit('toggle-reminder', $event)" @delete-task="$emit('delete-task', $event)" :task="task" />
    </div>
</template>

<script>
import TaskItem from './Task.vue'
    export default {
        name: 'TasksItem',
        props:{
            tasks: Array,
        },
        components: {
            TaskItem,
        },
        
        emits: ['delete-task', 'toggle-reminder']
    }

    
</script>

<style scoped>

</style>