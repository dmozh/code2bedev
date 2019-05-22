import Vue from 'vue'
import Router from 'vue-router'
import WelcomePageComponent from '../components/WelcomePageComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import MyCabinetComponent from '../components/MyCabinetComponent.vue'
import ViewPostComponent from '../components/ViewPostComponent.vue'
import CompilerComponent from '../components/CompilerComponent.vue'
import MainComponent from '../components/MainComponent.vue'
import ArticlesListComponent from '../components/ListComponents/ArticlesListComponent.vue'
import LessonsListComponent from '../components/ListComponents/LessonsListComponent.vue'
import TasksListComponent from '../components/ListComponents/TasksListComponent.vue'
import NewsListComponent from '../components/ListComponents/NewsListComponent.vue'
import ProfileComponent from '../components/MyCabinetsComponents/ProfileComponent'
import PostsComponent from '../components/MyCabinetsComponents/PostsComponent'
import CreateComponent from '../components/MyCabinetsComponents/CreateComponent'
import SeenComponent from '../components/MyCabinetsComponents/SeenComponent'
// import auth from 'firebase/auth'

Vue.use(Router);

let router = new Router({

  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePageComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'main',
      component: MainComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: MyCabinetComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/create',
      name: 'creates',
      component: CreateComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/my_views',
      name: 'myViews',
      component: SeenComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/my_posts',
      name: 'myPosts',
      component: PostsComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/me',
      name: 'myProfile',
      component: ProfileComponent,
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
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesListComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/lessons',
      name: 'lessons',
      component: LessonsListComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksListComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/news',
      name: 'news',
      component: NewsListComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/compiler',
      name: 'compiler',
      component: CompilerComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:postsType/:type/:params',
      name: 'post',
      component: ViewPostComponent,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ],

});

// router.beforeEach((to, from, next) => {
//   // Check for requiresAuth guard
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // Check if NO logged user
//     if (!firebase.auth().onAuthStateChanged) {
//       // Go to login
//       next({
//         path: '/',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.requiresGuest)) {
//     // Check if NO logged user
//     if (firebase.auth().onAuthStateChanged) {
//       // Go to login
//       next({
//         path: '/',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else {
//     // Proceed to route
//     next();
//   }
// });

export default router;
