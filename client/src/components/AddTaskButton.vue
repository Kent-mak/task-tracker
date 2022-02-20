<template>
    <button  @click="onClick()" :style="{background: color}" class="btn">{{text}}</button>
</template>

<script>
export default {
    name: 'AddTaskBtn',
    props: {

        text: String,
        color: String
    },
    methods: {
        onClick(){
            this.$emit('btn-click')
        }
    },
    // emits: ['toggle-add-task']
}
</script>

<style scoped>


</style>