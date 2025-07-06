<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Task } from '../types/task'

const props = defineProps<{
    tasks: Task[]
}>()

const filterFunctions = {
    all: (tasks: Task[]) => tasks,
    pending: (tasks: Task[]) => tasks.filter(task => !task.completed),
    completed: (tasks: Task[]) => tasks.filter(task => task.completed)
} as const

type FilterKey = keyof typeof filterFunctions

const currentFilter = ref<FilterKey>('all')

const filteredTasks = computed(() => {
    return filterFunctions[currentFilter.value](props.tasks)
})
</script>

<template>
    <div class="filter-control">
        <label for="filter-select">Filtro:</label>
        <select id="filter-select" v-model="currentFilter">
            <option value="all">Todos</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Completados</option>
        </select>
    </div>

    <div class="list-wrapper">
        <ul>
            <p v-if="filteredTasks.length === 0">Nenhuma tarefa encontrada.</p>
            <slot v-for="task in filteredTasks" :key="task.id" name="task" :task="task" />
        </ul>
    </div>
</template>

<style scoped>
.filter-control {
    display: flex;
    justify-content: center;
    gap: 0.3rem;
}

button {
    width: 6rem;
}

.list-wrapper {
    padding: 0 1rem;
}

.list-wrapper::-webkit-scrollbar {
    width: 10rem;
}

ul {
    list-style: none;
    max-height: 10rem;
    overflow-y: auto;
}
</style>