import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import axios from 'axios'


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
        authUser: null,
        activeUserName: null,
        activeUserRole: null,
        activeUserRate: null,
      },

      methods: {
        getUserName(){
          //если пользователь авторизован, получаем из бд его данные
          if (this.authUser !== null) {
            const body = {email: this.authUser.email};
            const jBody = JSON.stringify(body);

            axios.post('http://localhost:8080/getUser', jBody).then((response) => {
              console.log(response);
              //     получаем имая пользователя из ответа и назначаем переменнst
              this.activeUserName = response.data.user.user_name;
              this.activeUserRole = response.data.user.user_role;
              this.activeUserRate = response.data.user.user_rate;
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      },

      mounted: function() {

      },

      created: function () {
        firebase.auth().onAuthStateChanged(user => {this.authUser = user});

      },


    }).$mount('#app')
  }
});

