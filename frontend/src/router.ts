import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import TodoListPage from './pages/TodoListPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/todo',
        name: 'TodoList',
        component: TodoListPage,
        meta: { requiresAuth: true }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next): void => {
    if (!to.meta.requiresAuth) {
        next()
        return
    }

    const token = localStorage.getItem('token')

    if (!token) {
        next('/login')
        return
    }

    next()
})
