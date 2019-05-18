<template>
  <div class="body">
    <div class="divider"></div>
    <div class="header">
      <router-link to="/" class="back-btn waves-effect waves-dark">
        <img src="../assets/png/back_arrow2.png" class="icon">
      </router-link>
    </div>
    <div class="form-container">
      <form @submit.prevent="signUp" class="form">
        <input type="text" v-model="name" placeholder="Type your name" class="custom-input">
        <input type="email" v-model="email" placeholder="Type your email" class="custom-input">
        <input type="password" v-model="password" placeholder="Type your password" class="custom-input">
        <input type="password" v-model="passwordRepeat" placeholder="Repeat your password" class="custom-input">
        <!--<div class="btn-container">-->
        <button class="button waves-effect waves-dark">submit</button>
        <!--</div>-->
      </form>
    </div>
  </div>
</template>

<script>
  // import auth from 'firebase/auth'
  // import 'firebase'
  import axios from 'axios'

    export default {
      name: "register-component",
      data() {
        return {
          // URL: "http://localhost:8080/api/v1/", //dev
          // URL: "http://code2be.dev/api/v1/",   //dep

          name: '',
          email: '',
          password: '',
          passwordRepeat: '',
          authUser: null,



          logi: '',
          valid: null
        }
      },
      methods:{
        goTo(){
          this.$router.replace('/main')
        },

        signUp () {
          //TO DO сделать проверку на имеющиеся имя в бд, отправку данных бд
          if (this.password !== this.passwordRepeat){
            alert('Passwords do not match');
          }else{
            if (this.password.length < 7){
              alert('Password is week')
            }else{
              //определяем переменные для запроса
              const userEmail = this.email, userName = this.name;
              const body = {
                userEmail: userEmail,
                userName: userName
              };
              const jBody = JSON.stringify(body);
              console.log(this.$root.URL);
              axios.post(this.$root.URL+'addUser', jBody).then((response) => {
                console.log(response);
                this.valid = response.data.valid;
                if(this.valid){
                  firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/weak-password') {
                      alert(errorMessage);
                    } else if (errorCode === 'auth/email-already-in-use'){
                      alert (errorMessage);
                    } else {
                    }
                    console.log(error);
                    // [END_EXCLUDE]
                  }).then(function () {
                    localStorage.setItem('userName', userName);
                    if (firebase.auth().currentUser.emailVerified === true){

                    }else{
                      firebase.auth().currentUser.sendEmailVerification();
                    }
                  });
                  this.$router.replace('/main')
                }else{
                  alert(response.data.msg)
                }
              }).catch((error) => {console.log(error);});
            }
          }
        },

        // created() {
        //   firebase.auth().onAuthStateChanged(user => { this.authUser = user;})
        // }
      },

      mounted: function () {
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);

        if (this.$router.currentRoute.name === 'register'){
          this.$root.signUpOn();
        }
        if (this.$root.authUser){
          this.$router.replace('/');
        }
      },
      beforeMount: function(){
        let lastRoute = sessionStorage.getItem('currentRoute');
        sessionStorage.setItem('lastRoute', lastRoute);
      },
    }
</script>

<style scoped lang="scss">

  .divider{
    height: 1vh;
    width: 100vw;
    background: aliceblue;
  }


  .back-btn{
    margin-left: 50px;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 10vh;
    width: 5vw;
    border-radius: 50%;
    background: #82858c;
  }

  .back-btn:hover{
    transform: scale(1.15);
    transition: .3s all;
    z-index: 10000000;
    cursor: pointer;
    background: rgba(126, 215, 118, 0.1);
    box-shadow: 0 2px 20px 2px rgb(140, 211, 215);
  }

  .icon{
    margin: auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 60%;
    max-height: 60%;
  }

  .header{
    width: 100vw;
    height: 10vh;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .custom-input{
    margin: 5vh 0 0 0;
  }

  .form{
    width: 22vw;
    margin: 0 auto;
    height: 100%;
  }


  .button{
    width: 100%;
    /*height: 100%;*/
    height: 4vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
    margin: 25vh 0 0 0;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .body{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    height: 100vh;
    background: aliceblue;
    justify-content: center;
    align-content: baseline;

  }

  .form-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    width: 25vw;
    height: 65vh;
    background: white;
    border-radius: 50px;
  }

</style>
