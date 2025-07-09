<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const GOOGLE_AUTH_URL = `${import.meta.env.VITE_API_BASE_URL}auth/google/url`
const router = useRouter()

onMounted(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (!token) {
        return
    }

    localStorage.setItem('token', token)
    router.push('/todo')

})

async function loginWithGoogle() {
    const response = await fetch(GOOGLE_AUTH_URL)
    const data = await response.json()
    window.location.href = data.url
}
</script>

<template>
    <main class="login-container">
        <h1>Login</h1>
        <button @click="loginWithGoogle" class="google-btn">
            Entrar com Google
        </button>
    </main>
</template>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.google-btn {
    background: #4285f4;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
}

h1 {
    color: var(--color-secondary-text);
}
</style>
