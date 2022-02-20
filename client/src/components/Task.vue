<template>
    <div @dblclick="$emit('toggle-reminder', task.id)" :class="{reminder: task.reminder}">
        <h3>
            {{task.name}}
            <!-- <i class="fa-solid fa-pen-to-square"></i> -->
            <i @click="$emit('delete-task', task.id)" class="fas fa-times"></i>
        </h3>
        <p>
            {{task.date}}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'TaskItem',
        props: {
            task: Object
        },
        emits: ['delete-task', 'toggle-reminder']
    }
</script>

<style scoped>
.fas {
    color: red
} 
div {
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
}
.reminder {
  border-left: 5px solid darkcyan;
}
h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>