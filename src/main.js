import Vue from 'vue'
// import f_app from 'firebase/app'
// import auth from 'firebase/firebase-auth'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";

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
        mainIsOn: false,
        signUpIsOn: false,
        myCabIsOn: false,
        welcomeIsOn: false,

        URL: "http://localhost:8080/api/v1/", //dev
        // URL: "https://code2be.dev/api/v1/",   //dep

        authUser: null,
        activeUserName: null,
        activeUserRole: null,
        activeUserRate: null,
        // userSeenPosts: null,

        activeLang: null,
        activeLangId: null,

        postIsOpen: false,

        langsName: null,

        userLessons: null,

        compilerIsOpen: false,
      },

      methods: {
        mainOn(){
          this.mainIsOn = true;
          this.signUpIsOn = false;
          this.myCabIsOn = false;
          this.welcomeIsOn = false;
        },
        signUpOn(){
          this.mainIsOn = false;
          this.signUpIsOn = true;
          this.myCabIsOn = false;
          this.welcomeIsOn = false;
        },
        myCabOn(){
          this.mainIsOn = false;
          this.signUpIsOn = false;
          this.myCabIsOn = true;
          this.welcomeIsOn = false;
        },
        welcomeOn(){
          this.mainIsOn = false;
          this.signUpIsOn = false;
          this.myCabIsOn = false;
          this.welcomeIsOn = true;
        },
        offAll(){
          this.mainIsOn = false;
          this.signUpIsOn = false;
          this.myCabIsOn = false;
          this.welcomeIsOn = false;
        },
        changeTab(tab){
          //так делать очень-очень плохо
          // console.log(tab);
          this.$children[0]._vnode.children[0].child.activeTab(tab)
        },
        async getAuthUser(){
          if(this.authUser){
            return this.authUser;
          }else{
            await firebase.auth().onAuthStateChanged(user => {this.authUser = user});
          }
          return this.authUser;
        },

        async getUserName(){
          await this.getAuthUser();
          //если пользователь авторизован, получаем из бд его данные
          if (this.authUser !== null) {
            // console.log(1111111);
            const body = {email: this.authUser.email};
            const jBody = JSON.stringify(body);
            try {
              await axios.post(this.URL+'getUser', jBody).then((response) => {
                // console.log(response);
                //     получаем имая пользователя из ответа и назначаем переменнst
                this.activeUserName = response.data.user.user_name;
                this.activeUserRole = response.data.user.role_id.toString();
                this.activeUserRate = response.data.user.user_rate.toString();

                localStorage.setItem('userName', this.activeUserName);
                localStorage.setItem('userRole', this.activeUserRole);
                localStorage.setItem('userRate', this.activeUserRate);
                localStorage.setItem('userID', response.data.user.id);

                localStorage.setItem('seenTasks', JSON.stringify(response.data.user.seenPosts.tasks));
                localStorage.setItem('seenLessons', JSON.stringify(response.data.user.seenPosts.lessons));
                localStorage.setItem('seenArticles', JSON.stringify(response.data.user.seenPosts.articles));
                localStorage.setItem('seenNews', JSON.stringify(response.data.user.seenPosts.news));
              }).catch((error) => {
                console.log(error);
              });
            } catch (e) {
              throw new Error(e)
            }
          }
        },
        getUserLessons(){
          if (this.authUser !== null) {
            const body = {
              authorEmail: this.$root.authUser.email
            };
            //создаем json
            const jBody = JSON.stringify(body);
            axios.post(this.URL+'getUserLessonsName', jBody).then((response) => {
              // console.log(response.data);
              this.userLessons = response.data.lessons;
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      },

      mounted: function() {
        // if (this.$router.currentRoute.name !== 'register'){
        //   this.signUpOn = false;
        // }
        // console.log('mounted main js');
        this.getUserName();
        if (this.langsName === null){
          axios.get(this.URL+'getLangsName').then(response => {
            this.langsName = response.data.langs_name
          })
        }
      },

      created: function () {
      },


    }).$mount('#app')
  }
});

