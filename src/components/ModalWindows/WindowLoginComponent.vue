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
          <div class="login-container">
            <div class="limiter">
              <form @submit.prevent="logIn">
                <input type="email" v-model="email" placeholder="Type your email" class="custom-input">
                <input type="password" v-model="password" placeholder="Type your password" class="custom-input">
                <button class="button waves-effect waves-dark"> Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  // import auth from 'firebase/auth'
  import axios from 'axios'

    export default {
        name: "login-window",
        data() {
          return {
            email: '',
            password: '',
            authUser: null,
          }
        },
        props: {
          modalActive: {
          type: Boolean
          },
        },
        methods:{
          return(){
            this.getUserName();
            this.$emit('close');
            this.$router.push({path: '/'})
          },
          emitClose () {
            this.getUserName();
            this.$emit('close');
          },
          logIn() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( user => {
              this.return()
            })
          },

          getUserName(){
            //если пользователь авторизован, получаем из бд его данные
            const body = {email: this.email};
            const jBody = JSON.stringify(body);

            axios.post(this.$root.URL+'getUser', jBody).then((response) => {
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
    height: 60vh;
    width: 30vw;
    margin: 0 auto;
    /*padding: 20px 30px;*/
    background-color: #fff;
    border-radius: 35px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    justify-content: center;

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
    margin: 25vh 0 0 0;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .limiter{
    max-width: 320px;
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
</style>
