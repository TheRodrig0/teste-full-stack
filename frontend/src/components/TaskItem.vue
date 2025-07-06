<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Task } from '../types/task'

const props = defineProps<{
    task: Task
}>()

const emit = defineEmits(['edit', 'delete', 'toggle'])

function onToggle() {
    emit('toggle', props.task)
}

function onEdit() {
    emit('edit', props.task)
}

function onDelete() {
    emit('delete', props.task)
}
</script>

<template>
    <li class="task-item">
        <input type="checkbox" class="task-checkbox" :id="`task-${task.id}`" :checked="task.completed"
            @change="onToggle" />

        <div class="task-info">
            <span :class="{ done: task.completed }">{{ task.title }}</span>
            <span class="desc">{{ task.description }}</span>
        </div>

        <div class="task-actions">
            <button @click="onEdit" class="edit-button">🖊</button>
            <button @click="onDelete" class="delete-button">🗑</button>
        </div>
    </li>
</template>

<style scoped>
.task-item {
    min-height: 5rem;
    padding: 0.5rem 0.75rem;
    border-bottom: 0.07rem solid #eee;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.task-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.task-actions {
    display: flex;
    gap: 0.4rem;
}

.task-checkbox,
.edit-button,
.delete-button {
    padding: 0.4rem;
}

.done {
    text-decoration: line-through;
    color: #aaa;
}

.desc {
    color: #666;
    white-space: normal;
    overflow-wrap: break-word;
    word-wrap: break-word;
}
</style>