<template>
  <div id="app">
    <div class="header-container">
      <div class="left-container">
        <div class="logo-container">
          <img src="../src/assets/png/logo.png" class="logo">
        </div>
      </div>
      <div class="middle-container">
        <div class="tabs-container" v-if="this.$root.mainIsOn">
          <div class="tab l" v-bind:class="{active_tab: compilerTabIsActive}" @click="activeTab('compiler')">
            ОНЛАЙН-КОМПИЛЯТОР
          </div>
          <div class="tab waves-effect waves-dark" v-bind:class="{active_tab: articleTabIsActive}" @click="activeTab('article')">
            СТАТЬИ
          </div>
          <div class="tab waves-effect waves-dark" v-bind:class="{active_tab: lessonTabIsActive}" @click="activeTab('lesson')">
            УРОКИ
          </div>
          <div class="tab waves-effect waves-dark" v-bind:class="{active_tab: taskTabIsActive}" @click="activeTab('task')">
            ЗАДАЧИ
          </div>
          <div class="tab waves-effect waves-dark" v-bind:class="{active_tab: newsTabIsActive}" @click="activeTab('news')">
            НОВОСТИ
          </div>

        </div>
      </div>
      <div class="right-container">
        <div class="button-container">
          <div class="btn waves-effect waves-dark cu logged-in" v-if="this.$root.authUser" @click="logout">
            ВЫЙТИ
          </div>
          <div class="btn waves-effect waves-dark cu logged-out" v-else @click="openLoginWindow">
            ВОЙТИ
          </div>
          <div class="btn waves-effect waves-dark" v-if="!this.$root.authUser && !this.$root.signUpIsOn" @click="toSignUp">
            РЕГИСТРАЦИЯ
          </div>
          <div class="btn waves-effect waves-dark" v-if="this.$root.authUser && !this.$root.myCabIsOn" @click="toMyCabinet">
            ЛИЧНЫЙ КАБИНЕТ
          </div>
          <router-link to="/" v-if="this.$root.authUser && this.$root.myCabIsOn" class="btn waves-effect waves-dark rl">
            <div class="note-back">
              НА ГЛАВНУЮ
            </div>
            <img src="../src/assets/png/home.png" class="icon">
          </router-link>
        </div>
      </div>

    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <login :modalActive="modalActive" @close="closeLoginWindow" @logut="logout"></login>
    <chooseLang :windowChooseLangModalActive="windowChooseLangModalActive" @close="closeWindowChooseLang"></chooseLang>
  </div>
</template>

<script>
  import ChooseLangWindow from '../src/components/ModalWindows/WindowChooseLangComponent'
  import LoginWindow from '../src/components/ModalWindows/WindowLoginComponent'
  export default {

  name: 'app',
    components: {
      login: LoginWindow,
      chooseLang: ChooseLangWindow
    },
  data () {
    return {
      articleTabIsActive: false,
      lessonTabIsActive: false,
      taskTabIsActive: false,
      newsTabIsActive: false,
      compilerTabIsActive: false,

      signUpOn: false,

      msg: '',

      loggedIn: "logged-in",
      loggedOut: "logged-out",
      modalActive: false,
      windowChooseLangModalActive: false,
    }
  },

  methods: {
    activeTab(tab){
      if      (tab==='article') {
        this.articleTabIsActive   = true;
        this.lessonTabIsActive    = false;
        this.taskTabIsActive      = false;
        this.newsTabIsActive      = false;
        this.compilerTabIsActive  = false;
      }else if(tab==='lesson')  {
        this.articleTabIsActive   = false;
        this.lessonTabIsActive    = true;
        this.taskTabIsActive      = false;
        this.newsTabIsActive      = false;
        this.compilerTabIsActive  = false;
      }else if(tab==='task')    {
        this.articleTabIsActive   = false;
        this.lessonTabIsActive    = false;
        this.taskTabIsActive      = true;
        this.newsTabIsActive      = false;
        this.compilerTabIsActive  = false;
      }else if(tab==='news')    {
        this.articleTabIsActive   = false;
        this.lessonTabIsActive    = false;
        this.taskTabIsActive      = false;
        this.newsTabIsActive      = true;
        this.compilerTabIsActive  = false;
      }else if(tab==='compiler'){
        this.articleTabIsActive   = false;
        this.lessonTabIsActive    = false;
        this.taskTabIsActive      = false;
        this.newsTabIsActive      = false;
        this.compilerTabIsActive  = true;
        // if(this.compilerTabIsActive){
        //   this.compilerTabIsActive = !this.compilerTabIsActive
        // }
      }

    },

    logout(){
      firebase.auth().signOut();
      this.$root.authUser = null;
      this.$root.activeUserName = null;
      this.$root.activeUserRole = null;
      this.$root.activeUserRate =  null;

      this.userName = '';
      this.userRole = '';
      this.userRate = '';

      delete localStorage["userName"];
      delete localStorage["userRole"];
      delete localStorage["userRate"];
      this.$router.push('/')
      // delete localStorage["seenPosts"]
    },

    closeLoginWindow(){
      this.modalActive = false;
    },
    openLoginWindow(){
      this.modalActive = true;
    },

    openWindowChooseLang(){
      this.windowChooseLangModalActive = true;
    },
    closeWindowChooseLang(){
      this.windowChooseLangModalActive = false;
    },

    toSignUp(){
      this.$router.push('/register')
    },

    toMyCabinet(){
      if (this.$root.authUser === null){
        //TODO сделать модалку кастомную красивую с вызовом модалки логирования
        alert('Please log in in your account')
      }else{
        this.$router.push('/mycabinet')
      }
    },

  }
}
</script>

<style scoped lang="scss">
  .logo, .icon, .logo-container, .rl, .middle-container, .tabs-container, .tab{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .logo{
    margin: 0 auto;
    width: 70%;
    height: 90%;
  }

  .icon{
    /*margin: 0 auto;*/
    max-width: 70%;
    max-height: 70%;
  }

  .logo-container{
    height: 100%;
    width: 250px;
    justify-content: center;
    align-items: center;
    /*background: white;*/
  }

  .header-container{
    display: flex;
    z-index: 10000;
    background: rgb(155, 216, 213);
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 10px 10px 20px 20px;

  }

  .content{
    max-width: 100%;
    margin-top: 60px;
    /*width: 100%;*/
  }

  .button-container{
    height: 100%;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cu{
    /*margin: auto;*/
    margin-right: 20px;
  }
  .cu:hover{
    cursor: pointer;
  }

  .rl{
    /*justify-items: space-between;*/
    align-items: center;
  }

  .note-back{
    @media (max-width: 1200px) {
      display: none;
    }
  }

  .right-container, .left-container{
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right-container{
    justify-content: flex-start;
  }

  .left-container{
    justify-content: flex-end;
  }

  .middle-container{
    width: 50%;
    height: 100%;
    align-items: center;
    justify-items: center;
  }

  .tabs-container{
    width: 80%;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    flex-wrap: nowrap;
  }

  .tab{
    color: white;
    justify-content: center;
    align-items: center;
    width: 100px;
    margin: 0 1px 0 1px;
    height: 80%;
    background: #26a69a;
    border-radius: 5px;
  }

  .tab:hover{
    /*transform: scale(1.1);*/
    transition: .2s all;
    /*z-index: 1000;*/
    background: rgba(183, 180, 180, 0.51);
  }

  .active_tab{
    transform: scale(1.1);
    transition: .2s all;
    z-index: 1000;
    background: rgb(74, 205, 215);
    /*box-shadow: 0 2px 20px 2px rgb(68, 215, 205);*/
  }

  .active_tab:hover{
    background: rgb(74, 205, 215);
    /*box-shadow: 0 2px 20px 2px rgb(68, 215, 205);*/
  }

  .l{
    width: 250px;
  }

  .tab:hover{
    cursor: pointer;
  }

  .logged-in{
    /*background-color: white;*/
  }

  .logged-in:hover{
    /*box-shadow: 0 2px 20px 2px rgb(215, 85, 75);*/
    background: rgb(215, 116, 96);
  }

  .logged-out{
    /*background-color: white;*/
  }

  .logged-out:hover{
    /*box-shadow: 0 2px 20px 2px rgb(104, 215, 79);*/
    background: rgb(97, 209, 103);
  }

</style>
