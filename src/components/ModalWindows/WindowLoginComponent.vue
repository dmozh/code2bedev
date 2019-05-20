<template>
  <transition name="modal">
    <div class="modal-mask" v-if="modalActive">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="close-btn">
              <img src="../../assets/png/close-btn.png" class="pic" @click="emitClose">
            </div>
          </div>
          <div class="login-container" v-if="this.openLogCont">
            <div class="limiter">
              <form @submit.prevent="logIn" v-if="this.isLogIn">
                <input type="email" v-model="email" placeholder="Введите ваш Email" class="custom-input">
                <input type="password" v-model="password" placeholder="Введите ваш пароль" class="custom-input">
                <button class="button waves-effect waves-dark">Авторизироваться</button>
              </form>
              <form @submit.prevent="resetPassword" v-else-if="!this.isLogIn && !this.sendingResPass && !this.isSent">
                <input type="email" v-model="email" placeholder="Введите ваш Email" class="custom-input">
                <button class="button waves-effect waves-dark">Восстановить пароль</button>
              </form>
              <div class="label" v-if="this.isSent">Ссылка для восстановления пароля была отправлена на вашу почту.</div>
              <div class="links-container" v-if="!this.sendingResPass">
                <div class="link" @click="switchMode" v-if="this.isLogIn">Забыли пароль?</div>
                <div class="link" @click="switchMode" v-else-if="!this.isLogIn && !this.isSent">Вспомнили?</div>
                <div class="link" @click="switchMode" v-else-if="!this.isLogIn && this.isSent">Вернутся и ввести новый пароль</div>
                <div class="link" @click="goToRegister">Нет аккаунта?</div>
              </div>
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
          </div>
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
      </div>
    </div>
  </transition>
</template>

<script>
  // import auth from 'firebase/auth'
  import axios from 'axios';
  import regeneratorRuntime from "regenerator-runtime";

    export default {
        name: "login-window",
        data() {
          return {
            email: '',
            password: '',
            authUser: null,

            isLogIn: true,

            openLogCont: true,
            sendingResPass: false,
            isSent: false,
          }
        },
        props: {
          modalActive: {
          type: Boolean
          },
        },
        methods:{
          switchMode(){
            this.isLogIn = !this.isLogIn;
            this.isSent = false;
          },
          goToRegister(){
            this.$router.push('/register');
            this.$emit('close')
          },
          resetPassword(){
            let self = this;
            self.sendingResPass = true;
            firebase.auth().sendPasswordResetEmail(this.email).then(function() {
              self.sendingResPass = false;
              self.isSent = true;
            }).catch(function(error) {
              // An error happened.
            });
          },

          async return(){
            await this.getUserName();
            this.$emit('close');
            this.$router.push({path: '/'})
          },
          emitClose () {
            this.getUserName();
            this.$emit('close');
          },
          logIn() {
            this.openLogCont = false;
            let self = this;

            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (){
              self.return()
            }).catch(async function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/user-not-found') {
                  alert(errorMessage);
                }});
          },

          async getUserName(){
            //если пользователь авторизован, получаем из бд его данные
            const body = {email: this.email};
            const jBody = JSON.stringify(body);

            await axios.post(this.$root.URL+'getUser', jBody).then((response) => {
              console.log(response);
              //     получаем имая пользователя из ответа и назначаем переменную
              this.$root.activeUserName = response.data.user.user_name;
              this.$root.activeUserRole = response.data.user.role_id;
              this.$root.activeUserRate = response.data.user.user_rate;

              this.$parent.userName = response.data.user.user_name;
              console.log(this.$parent.userName);
              this.$parent.userRole = response.data.user.role_id;
              this.$parent.userRate = response.data.user.user_rate;

              localStorage.setItem('userName', this.$parent.userName);
              localStorage.setItem('userRole', String(this.$parent.userRole));
              localStorage.setItem('userRate', String(this.$parent.userRate));
              localStorage.setItem('userID', response.data.user.id);

              localStorage.setItem('seenTasks', JSON.stringify(response.data.user.seenPosts.tasks));
              localStorage.setItem('seenLessons', JSON.stringify(response.data.user.seenPosts.lessons));
              localStorage.setItem('seenArticles', JSON.stringify(response.data.user.seenPosts.articles));
              localStorage.setItem('seenNews', JSON.stringify(response.data.user.seenPosts.news));
            }).catch((error) => {
              console.log(error);
            });
          }
    }
  }
</script>

<style scoped>
  .label{
    display: inline-flex;
    font-size: 1.3em;
    color: #919191;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 60px;
  }

  .modal-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    transition: opacity .3s ease;
    justify-content: center;
  }

  .modal-wrapper {
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    vertical-align: middle;
    margin: auto;
    border-radius: 35px;
  }

  .modal-container {
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 600px;
    width: 500px;
    margin: 0 auto;
    /*padding: 20px 30px;*/
    background-color: #fff;
    border-radius: 35px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    justify-content: center;
    align-items: baseline;

  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }


  .button{
    width: 100%;
    /*height: 100%;*/
    height: 4vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
    margin: 50px 0 0 0;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .limiter{
    max-width: 400px;
    margin: auto;
  }

  .login-container{
    display: flex;
    justify-content: center;
  }

  .pic{
    margin: auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 60%;
    max-height: 60%;
  }

  .modal-header{
    width: 95%;
    height: 5vh;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .close-btn{
    border-radius: 50%;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 5vh;
    width: 2.5vw;
  }
  .close-btn:hover{
    transform: scale(1.15);
    transition: .3s all;
    z-index: 10000000;
    cursor: pointer;
    /*background: rgba(152, 152, 152, 0.61);*/
    /*box-shadow: 0 2px 20px 2px rgb(140, 211, 215);*/
  }
  .links-container{
    display: flex;
    margin-top: 15px;
    flex-wrap: nowrap;
    justify-content: space-around;
    min-width: 400px;
  }
  .link{
    display: inline-flex;
    color: #039be5
  }

  .link:hover{
    cursor: pointer;
    transform: scale(1.02);
    transition: .1s;
  }
</style>
