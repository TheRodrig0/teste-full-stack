<script setup lang="ts">
import TaskForm from "./TaskForm.vue"
import TaskList from "./TaskList.vue"
</script>

<template>
    <main class="container">
        <header>
            <h1>Todo List</h1>
        </header>
        <section>
            <TaskForm />
            <TaskList />
        </section>
    </main>
</template>

<style scoped>
.container {
    background-color: #f8f9fa;
    width: 100%;
    max-width: 30rem;
    min-height: 20rem;
    border-radius: 10px;
    align-items: center;
}

header {
    margin: 1.5rem;
    display: flex;
    justify-content: center;
}

header h1 {
    font-size: 2.5rem;
    font-weight: bold;
}

</style>