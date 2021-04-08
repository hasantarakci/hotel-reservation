import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Hotel from '../views/Hotel.vue';
import Payment from '../views/Payment.vue';
import Success from '../views/Success.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: Home,
  },
  {
    path: '/room',
    name: 'hotelPage',
    component: Hotel,
  },
  {
    path: '/payment',
    name: 'paymentPage',
    component: Payment,
  },
  {
    path: '/success',
    name: 'successPage',
    component: Success,
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
});

export default router;
