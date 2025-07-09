<script setup lang="ts">
import type { Task, NewTask } from '../types/task'
import { onMounted, ref } from 'vue'
import TaskForm from "./TaskForm.vue"
import TaskList from "./TaskList.vue"
import TaskItem from "./TaskItem.vue"
import { getTasks, addTask, updateTask, deleteTask } from '../services/api-service'

const tasks = ref<Task[]>([])
const taskToEdit = ref<Task | undefined>(undefined)

onMounted(async () => {
    tasks.value = await getTasks() ?? []
})

async function handleFormSubmit(payload: NewTask | Task) {
    if (!('id' in payload)) {
        const newTask = await addTask(payload)
        tasks.value.push(newTask)
        return
    }

    const updated = await updateTask(payload.id, {
        title: payload.title,
        description: payload.description
    })

    const index = tasks.value.findIndex(t => t.id === updated.id)

    if (index !== -1) {
        tasks.value[index] = updated
    }

    taskToEdit.value = undefined

}

function handleEdit(task: Task) {
    taskToEdit.value = task
}

async function handleDelete(task: Task) {
    await deleteTask(task.id)
    tasks.value = tasks.value.filter(t => t.id !== task.id)
}

async function handleToggle(task: Task) {
    const updated = await updateTask(task.id, { completed: !task.completed })
    const index = tasks.value.findIndex(t => t.id === updated.id)

    if (index !== -1) {
        tasks.value[index] = updated
    }
}
</script>

<template>
    <main class="container">
        <header>
            <h1>Todo List</h1>
        </header>

        <section>
            <TaskForm :task-to-edit="taskToEdit" @submit="handleFormSubmit" />

            <TaskList :tasks="tasks">
                <template #task="{ task }">
                    <TaskItem :task="task" @edit="handleEdit" @delete="handleDelete" @toggle="handleToggle" />
                </template>
            </TaskList>
        </section>
    </main>
</template>

<style scoped>
.container {
    background-color: #f8f9fa;
    width: 100%;
    max-width: 30rem;
    min-height: 20rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
}

section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
</style>