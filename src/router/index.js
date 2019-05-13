import Vue from 'vue'
import Router from 'vue-router'
import WelcomePageComponent from '../components/WelcomePageComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import MyCabinetComponent from '../components/MyCabinetComponent.vue'
import MainComponent from '../components/MainComponent.vue'
import auth from 'firebase'

Vue.use(Router);

let router = new Router({

  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomePageComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/main',
      name: 'main',
      component: MainComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mycabinet',
      name: 'mycabinet',
      component: MyCabinetComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent,
      meta: {
        requiresAuth: true
      }
    },
  ],

});

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!auth.auth().onAuthStateChanged) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (auth.auth().onAuthStateChanged) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
