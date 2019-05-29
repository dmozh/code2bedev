<template>
  <div class="body">
    <div class="create-header">
      <div class="label">СОЗДАТЬ</div>
      <div class="create-tab-container">
        <div class="create-tab btn" @click="showCreateComponentArticles" v-bind:class="{active_tab: isOpenArticles}">СТАТЬЮ</div>
        <div class="create-tab btn" @click="showCreateComponentLessons" v-bind:class="{active_tab: isOpenLessons}">УРОК</div>
        <div class="create-tab btn" @click="showCreateComponentTasks" v-bind:class="{active_tab: isOpenTasks}">ЗАДАЧУ</div>
        <div class="create-tab btn" @click="showCreateComponentNews" v-bind:class="{active_tab: isOpenNews}" v-if="this.userRole===666">НОВОСТЬ</div>
      </div>
    </div>
    <div class="container">
      <transition name="slide-fade">
        <create-post-component v-bind:is-article="this.isOpenArticles"
                               v-bind:is-news="this.isOpenNews"
                               v-if="this.isOpenArticles"
                               @returns="toReturn">
          <!--v-on:returns:returnMsg="this.returnMsg = toReturn"-->

        </create-post-component>
      </transition>

      <transition name="slide-fade">
        <create-tasks-component v-if="this.isOpenTasks" @returns="toReturn"></create-tasks-component>
      </transition>

      <transition name="slide-fade">
        <create-lesson-component v-if="this.isOpenLessons" @returns="toReturn"></create-lesson-component>
      </transition>

      <transition name="slide-fade">
        <create-post-component v-bind:is-article="this.isOpenArticles"
                               v-bind:is-news="this.isOpenNews"
                               v-if="this.isOpenNews" @returns="toReturn">
        </create-post-component>
      </transition>
    </div>
  </div>
</template>

<script>
  import CreatePostComponent from '../MyCabinetsComponents/CreateComponents/CreatePostComponent'
  import CreateLessonComponent from '../MyCabinetsComponents/CreateComponents/CreateLessonComponent'
  import CreateTasksComponent from '../MyCabinetsComponents/CreateComponents/CreateTasksComponent'

  import axios from 'axios'

    export default {
      name: "create-component",
      components: {
        CreatePostComponent,
        CreateLessonComponent,
        CreateTasksComponent,
      },
      data() {
        return {
          // returnMsg: '',
          toastText: '',

          onHide: true,
          isOpenArticles: false,
          isOpenTasks: false,
          isOpenNews: false,
          isOpenLessons: false,

          userRole: '',
        }
      },
      methods: {
        showCreateComponentArticles() {
          if (this.$root.authUser.emailVerified){
            this.onHide = false;
            this.isOpenArticles = true;
            this.isOpenTasks = false;
            this.isOpenNews = false;
            this.isOpenLessons = false;
          }else{
            this.toastText = '<span>Вы не можете создать статью, пока не подтвердите регистрацию.<br>' +
              'Письмо с подтверждением было отправлено вам на почту.</span>';
            M.toast({html: this.toastText, classes: 'rounded warning', displayLength: 4000});
          }
        },

        showCreateComponentTasks() {
          if (this.$root.authUser.emailVerified){
            this.onHide = false;
            this.isOpenArticles = false;
            this.isOpenTasks = true;
            this.isOpenNews = false;
            this.isOpenLessons = false;
          }else{
            this.toastText = '<span>Вы не можете создать статью, пока не подтвердите регистрацию.<br>' +
              'Письмо с подтверждением было отправлено вам на почту.</span>';
            M.toast({html: this.toastText, classes: 'rounded warning', displayLength: 4000});
          }

        },

        showCreateComponentNews() {
            if (this.$root.authUser.emailVerified){
              this.onHide = false;
              this.isOpenArticles = false;
              this.isOpenTasks = false;
              this.isOpenNews = true;
              this.isOpenLessons = false;
          }else{
              this.toastText = '<span>Вы не можете создать статью, пока не подтвердите регистрацию.<br>' +
                'Письмо с подтверждением было отправлено вам на почту.</span>';
              M.toast({html: this.toastText, classes: 'rounded warning', displayLength: 4000});
            }

        },

        showCreateComponentLessons() {
          if (this.$root.authUser.emailVerified){
            this.onHide = false;
            this.isOpenArticles = false;
            this.isOpenTasks = false;
            this.isOpenNews = false;
            this.isOpenLessons = true;
          }else{
            this.toastText = '<span>Вы не можете создать статью, пока не подтвердите регистрацию.<br>' +
              'Письмо с подтверждением было отправлено вам на почту.</span>';
            M.toast({html: this.toastText, classes: 'rounded warning', displayLength: 4000});
          }

        },

        toReturn() {
          this.onHide = true;
          this.isOpenArticles = false;
          this.isOpenTasks = false;
          this.isOpenNews = false;
          this.isOpenLessons = false;
          console.log('11 '+this.returnMsg)
        },
      },

      mounted: function () {
        if (this.$root.getAuthUser === null ){
          let toastText = '<span>Пожалуйста авторизируйтесь</span>';
          M.toast({html: toastText, classes: 'rounded warning', displayLength: 6000});
          this.$router.go(-1)
        }else{
          this.$root.myCabOn();
          this.userRole = Number(localStorage.getItem('userRole'));
        }
      }
    }
</script>

<style scoped lang="scss">
  p{
    margin: auto;
  }

  .desc{
    text-align: center;
  }

  .create-header, .create-tab-container, .create-tab, .label{
    display: flex;
    flex-wrap: nowrap;
  }

  .body{
    display: flex;
    flex-wrap: wrap!important;
    justify-content: center;
  }
  .col-container{

    @media (max-width: 1200px) {
      /*width: 1vw;*/
      height: 60vh;
    }
    @media (max-width: 900px) {
      /*width: 19vw;*/
      height: 50vh;
    }

    position: relative;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 80vw;
    height: 80vh;
    justify-content: center;
    align-items: center;
    /*background: aqua;*/
    /*z-index: 1000;*/
  }

  .icon{
    @media screen and (max-width: 1200px) {
      max-width: 60%;
      max-height: 60%;
    }
    @media screen and (max-width: 700px) {
      max-width: 40%;
      max-height: 40%;
    }
    @media screen and (max-width: 375px) {
      max-width: 20%;
      max-height: 20%;
    }
    margin-left: auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 80%;
    max-height: 80%;
    border-radius: 50%;
    /*background: #ffffff;*/
  }

  .icon:hover{
    transform: scale(1.15);
    transition: .2s all;
    z-index: 10000000;
    cursor: pointer;
    box-shadow: 0 2px 20px 2px rgb(140, 215, 189);
  }


  .nav-bar-btns{
    display: -webkit-flex;
    display: flex;
    margin: 0 auto;
    width: 10vw;
    height: 5vh;
    background-color: white;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    text-align: left;

  }

  .nav-bar-btns:hover{
    transform: scale(1.15);
    transition: .2s all;
    z-index: 10000000;
    cursor: pointer;
    box-shadow: 0 2px 20px 2px rgb(140, 215, 189);
  }


  /*css animate*/
  .slide-fade-enter-active {
    transition: all .3s ease;
    z-index: 10000;
    position: fixed;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    z-index: 1000;
    position: fixed;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(1005px);
    opacity: 0;
  }

  .label{
    justify-content: center;
    align-items: center;
    color: #93989f;
    font-size: 2em;
  }

  .create-header{
    background: rgba(155, 216, 213, 0.43);
    justify-content: center;
    width: 90%;
    height: 7vh;
    border-radius: 0 0 20px 20px;
  }

  .create-tab-container{
    margin-right: 20px;
    align-items: center;
    /*width: 30%;*/
    justify-content: baseline;
  }

  .create-tab{
    margin: 0 10px 0 10px;
    font-size: 1.5em;
    align-items: center;
    height: 60%;
  }

  .create-tab:hover{
    transform: scale(1.05);
    transition: .15s;
    cursor: pointer;
  }

  .active_tab{
    transform: scale(1.1);
    transition: .2s all;
    /*z-index: 1000;*/
    background: rgb(74, 205, 215);
    /*box-shadow: 0 2px 20px 2px rgb(68, 215, 205);*/
  }

  .active_tab:hover{
    transform: scale(1.1);
  }

</style>
