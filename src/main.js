import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'


let app ='';
const config = {
  apiKey: "AIzaSyBikSr7T1CseO8oLZpCDIGSnkR05u7aax4",
  authDomain: "test-auth-vuejs.firebaseapp.com",
  databaseURL: "https://test-auth-vuejs.firebaseio.com",
  projectId: "test-auth-vuejs",
  storageBucket: "test-auth-vuejs.appspot.com",
  messagingSenderId: "652844837907"
};
// Initialize Firebase
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App),
      data: {
        authUser: null
      },
      mounted: function() {
        firebase.auth().onAuthStateChanged(user => {this.authUser = user});

      },
    }).$mount('#app');
  }
});



