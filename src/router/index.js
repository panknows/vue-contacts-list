import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexView from '@/views/IndexView.vue';
import ContactsView from '@/views/ContactsView.vue';
import ContactView from '@/views/ContactView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    redirect: { name: 'contact-list' },
    children: [
      {
        name: 'contact-list',
        path: '',
        component: ContactsView,
      },
      {
        name: 'contact',
        path: ':id',
        component: ContactView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
