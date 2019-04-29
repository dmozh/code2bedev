import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// const SEC_HTTPS = true;
// const SEC_BASE = "compilers.widgets.sphere-engine.com";
// (function(d, s, id){ SEC = window.SEC || (window.SEC = []);
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return; js = d.createElement(s); js.id = id;
//   js.src = (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, "script", "sphere-engine-compilers-jssdk"));

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

        activeLang: null,

        langsName: null,

        userLessons: null,
      },

      methods: {
        getUserName(){
          //если пользователь авторизован, получаем из бд его данные
          if (this.authUser !== null) {
            // console.log(1111111);
            const body = {email: this.authUser.email};
            const jBody = JSON.stringify(body);

            axios.post('http://localhost:8080/getUser', jBody).then((response) => {
              console.log(response);
              //     получаем имая пользователя из ответа и назначаем переменнst
              this.activeUserName = response.data.user.user_name;
              this.activeUserRole = response.data.user.role_id.toString();
              this.activeUserRate = response.data.user.user_rate.toString();

              localStorage.setItem('userName', this.activeUserName);
              localStorage.setItem('userRole', this.activeUserRole);
              localStorage.setItem('userRate', this.activeUserRate);
            }).catch((error) => {
              console.log(error);
            });
          }
        },
        getUserLessons(){
          if (this.authUser !== null) {
            const body = {
              authorEmail: this.$root.authUser.email
            };
            //создаем json
            const jBody = JSON.stringify(body);
            axios.post('http://localhost:8080/getUserLessonsName', jBody).then((response) => {
              console.log(response.data);
              this.userLessons = response.data.lessons;
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      },

      mounted: function() {
        if (this.langsName === null){
          axios.get('http://localhost:8080/getLangsName').then(response => {
            this.langsName = response.data.langs_name
          })
        }
      },

      created: function () {
        firebase.auth().onAuthStateChanged(user => {this.authUser = user});
      },


    }).$mount('#app')
  }
});

