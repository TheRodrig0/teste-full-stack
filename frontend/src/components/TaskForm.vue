<script setup lang="ts">
import type { Task, NewTask } from '../types/task'
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  taskToEdit?: Task
}>()

const emit = defineEmits<{
  (e: 'submit', payload: NewTask | Task): void
}>()

const title = ref('')
const description = ref('')

watch(() => props.taskToEdit, (newTask) => {
  if (newTask) {
    title.value = newTask.title
    description.value = newTask.description || ''
    return
  }

  title.value = ''
  description.value = ''

}, { immediate: true })

function handleSubmit() {
  if (!title.value) {
    alert('O título é obrigatório!')
    return
  }

  if (!props.taskToEdit) {
    emit('submit', {
      title: title.value,
      description: description.value
    })

    return
  }

  emit('submit', {
    ...props.taskToEdit,
    title: title.value,
    description: description.value
  })

}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="title" placeholder="Insira o título da Task" class="input" maxlength="40" />
    <input type="text" v-model="description" placeholder="Insira a descrição da Task" class="input" maxlength="100" />
    <button type="submit" class="submit-btn">{{ taskToEdit ? 'Salvar Alterações' : 'Adicionar' }}</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.input,
.submit-btn {
  width: 80%;
  border-radius: 0.3rem;
  padding: 0.5rem;
}

.input::placeholder {
  color: #ffffff;
  opacity: 0.7;
}
</style>