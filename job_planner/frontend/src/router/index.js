import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/dashboard',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/JobView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UsersView.vue')
  },
  {
    path: "/job-types",
    name: "job-types",
    component: () => import(/* webpackChunkName: "job-types" */ '../views/JobTypeView.vue')
  },
  {
    path: '/:pathMatch(.*)*', 
    redirect: '/login'
  }
]

async function checkLogin() {
  const response = await fetch("http://localhost:3000/login/check", {
    method: "GET",
    credentials: "include", 
  });
  return response.status === 200;
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login') {
    const loggedIn = await checkLogin();
    if (!loggedIn) {
      return next('/login');
    }
  }
  next();
})

export default router