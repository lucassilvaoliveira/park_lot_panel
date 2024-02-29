// routes.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue') 
  },
  {
    path: '/vehicle',
    name: 'Vehicle',
    component: () => import('./pages/Vehicle.vue')
  },
  {
    path: '/customer',
    name: 'Customer',
    component: () => import('./pages/Customer.vue')
  },
  {
    path: '/plan',
    name: 'Plan',
    component: () => import('./pages/Plan.vue')
  },
  {
    path: '/contract',
    name: 'Contract',
    component: () => import('./pages/Contract.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;