import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('@/views/Home.vue'), },
      { path: 'login', name: 'login', component: () => import('@/views/Login.vue'), },
      { path: 'register', name: 'register', component: () => import('@/views/Register.vue'), },
      { path: 'addroom', name: 'addroom', component: () => import('@/views/AddRoom.vue'), },
      { path: 'messages', name: 'messages', component: () => import('@/views/Messages.vue'), },
      { path: 'rooms', name: 'rooms', component: () => import('@/views/Rooms.vue'), },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
