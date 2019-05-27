<template>
  <div class="body">
    <!--<header-component></header-component>-->
    <div class="header"></div>
    <div class="form-container" v-if="this.register">
      <form @submit.prevent="signUp" class="form" v-if="this.openForm">
        <input type="text" v-model="name" placeholder="Введите отображаемое имя" class="custom-input">
        <input type="email" v-model="email" placeholder="Введите ваш Email" class="custom-input">
        <input type="password" v-model="password" placeholder="Введите ваш пароль" class="custom-input">
        <input type="password" v-model="passwordRepeat" placeholder="Повторите введенный вами пароль" class="custom-input">
        <!--<div class="btn-container">-->
        <button class="button waves-effect waves-dark">ЗАРЕГИСТРИРОВАТЬСЯ</button>
        <!--</div>-->
      </form>
      <div class="cen" v-else>
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
          </div>

          <div class="spinner-layer spinner-red">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
          </div>

          <div class="spinner-layer spinner-yellow">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
          </div>

          <div class="spinner-layer spinner-green">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!this.register && !this.openForm">
      <div class="label">Регистрация прошла успешно, вы автоматически прошли авторизацию, но для получения полного доступа на сайте
        подтвердите свой Email. Письмо с подтверждением было выслано вам на почту
      </div>
      <div class="cont">
        <router-link to="/" class="">
          <div class="btn">Я понял, вернутся на главную</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  // import auth from 'firebase/auth'
  // import 'firebase'
  import axios from 'axios'
  import HeaderComponent from "./HeaderComponent";
  import regeneratorRuntime from "regenerator-runtime";

    export default {
      components: {HeaderComponent},
      name: "register-component",
      data() {
        return {
          toastText: '',

          name: '',
          email: '',
          password: '',
          passwordRepeat: '',
          authUser: null,

          register: true,
          openForm: true,

          logi: '',
          valid: null
        }
      },
      methods:{
        regOff(){
          this.register = false;
        },

        async signUp () {
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
              let self = this;
              await axios.post(this.$root.URL+'addUser', jBody).then((response) => {
                // console.log(response);
                this.valid = response.data.valid;
                if(this.valid){
                  self.openForm = false;
                  firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(async function (error) {
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
                    // console.log(error);
                    // [END_EXCLUDE]
                  }).then(async function () {
                    if (firebase.auth().currentUser.emailVerified === true){

                    }else{
                      await firebase.auth().currentUser.sendEmailVerification();
                    }
                    self.regOff();
                  });
                }else{
                  alert(response.data.msg)
                }
              }).catch((error) => {console.log(error);}).then(function () {

              });
            }
            // this.regOff()
          }
        },
      },

      mounted: function () {
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);

        if (this.$router.currentRoute.name === 'register'){
          this.$root.signUpOn();
        }
        if (this.$root.authUser){
          // this.toastText = '<span>Вы уже авторизированы.</span>';
          // M.toast({html: self.toastText, classes: 'rounded'});
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
  .label{
    display: inline-flex;
    font-size: 3em;
    color: #919191;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }

  .cont{
    display: flex;
    width: 100%;
    margin-top: 25px;
    justify-content: center;
  }
  .button{
    color: black!important;
    width: 100%;
    /*height: 100%;*/
    height: 4vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
    margin: 25vh 0 0 0;
    letter-spacing: .5px;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }
  .cen{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    > div{
      width: 300px;
      height: 300px;
    }
  }
  .body{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
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
    width: 500px;
    height: 700px;
    background: white;
    border-radius: 50px;
  }

</style>
