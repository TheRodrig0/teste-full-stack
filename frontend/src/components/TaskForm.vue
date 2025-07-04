<template>
  <form>
    <input type="text" id="form-task-title" placeholder="Insira o título da Task" class="input" />

    <input type="text" id="form-task-description" placeholder="Insira a descrição da Task" class="input" />

    <button type="submit" class="submit-btn">Adicionar</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input,
.submit-btn {
  width: 80%;
  align-self: center;
  border-radius: 0.3rem;
  padding: 0.5rem;
}

.input::placeholder {
  color: #ffffff;
  opacity: 0.7;
}

.submit-btn:hover {
  background: #949494;
}
</style>