import Vue from 'vue';
import VueRouter from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import StudioNavBar from '@/components/StudioNavBar.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      NavBar,
      default: () => import('@/views/Home.vue'),
    },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/Auth/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/Auth/SignUp.vue'),
  },
  {
    path: '/Setting',
    name: 'Setting',
    components:{
    StudioNavBar,
    default:() => import('@/views/Setting.vue'),
  },
},
  {
    path: '/VuetubeStudio',
    // name: 'VuetubeStudio',
    components: {
     
      StudioNavBar,
      default:() => import('@/views/VuetubeStudio.vue'),
      
  },
  children: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/VuetubeStudio/Dashboard.vue'),
    },
    {
      path: 'contents',
      name: 'Contents',
      component: () => import('@/views/VuetubeStudio/Contents.vue'),
    },
  ],
},
  // {
  //   path: '/studio',
  //   components: {
  //     StudioNavBar,
  //     default: () => import('@/views/Studio/Index.vue'),
  //   },
  //   children: [
  //     {
  //       path: '/',
  //       name: 'Dashboard',
  //       component: () => import('@/views/Studio/Dashboard.vue'),
  //     },
  //     {
  //       path: 'videos',
  //       name: 'Videos',
  //       component: () => import('@/views/Studio/Videos.vue'),
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
