<template>
    <div class="card text-left">
        <div class="card-header">
            New Task
        </div>
        <div class="card-body">
            <form  @submit="onSubmit" >
                <!-- task name -->
                <div class="row mb-3">
                    <label for="task-name" class="col-sm-2 col-form-label">Task Name</label>
                    <div class="col-sm-10">
                        <input  v-model="name" type="text" class="form-control" id="task-name" placeholder="enter task">
                    </div>
                </div>
                    
                <!-- date -->
                <div class="row mb-3 ">
                    <label for="date" class="col-sm-2 col-form-label">Due Date</label>
                    <div class="col-sm-10">
                        <input v-model="date" type="date" class="form-control" id="date" placeholder="DD/MM/YY">
                    </div>
                </div>
            
                <!-- reminder -->
                <div class="row mb-3 ms-1">
                    <div class="form-check ">
                        <input v-model="reminder" class="form-check-input" type="checkbox" value="" id="reminder-checkbox">
                        <label class="form-check-label" for="reminder-checkbox">
                            Reminder
                        </label>
                        
                    </div>
                </div>
            
                <!-- save btn -->
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="submit">Save Task</button>
                </div>
                

            </form>
        </div>
    </div>
    <br>
</template>

<script>
    export default {
        name: 'AddTask',
        data(){
            return{
                name: '',
                date: '',
                reminder: false
            }
        },
        methods: {
            onSubmit(event){
                event.preventDefault();
                
                if (!this.name){
                    alert('Please add a Task')
                }

                const newTask = {
                    name: this.name,
                    date: this.date,
                    reminder: this.reminder
                }

                this.$emit('add-task', newTask)

                this.name = ''
                this.date = ''
                this.reminder = false

            },
        },
        emits: ['add-task']
    }
</script>

<style scoped>

</style>