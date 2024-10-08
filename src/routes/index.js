import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import ManagerUser from '@/views/ManagerUser.vue';
import ManagerProduct from '@/views/ManagerProduct.vue';

const routes = [
  { path: '/admin', component: Dashboard },
  { path: '/admin/manager-user', component: ManagerUser },
  { path: '/admin/manager-product', component: ManagerProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
