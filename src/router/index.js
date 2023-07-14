import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('@/views/Login.vue'), meta: { requiresAuth: false }},
      { path: 'register', name: 'register', component: () => import('@/views/Register.vue'), meta: { requiresAuth: false }},
      { path: 'addroom', name: 'addroom', component: () => import('@/views/AddRoom.vue'), meta: { requiresAuth: true }},
      { path: 'messages', name: 'messages', component: () => import('@/views/Messages.vue'),meta: { requiresAuth: true } },
      { path: '', name: 'rooms', component: () => import('@/views/Rooms.vue'),meta: { requiresAuth: true } },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  const token = localStorage.getItem('token');
  const isAuthorized =!!token;

  if (requiresAuth && !isAuthorized) {
      next('login');
  } 
  else if (!requiresAuth && isAuthorized){
    next('');
  }
  else{
    next();
  }
});
export default router
