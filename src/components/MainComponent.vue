<template>
    <div class="body">
      <!--<header-component>-->
<!---->
      <!--</header-component>-->
      <div class="content-container ">
        <div class="content-header">
          <div class="top-panel" >
            <div class="signed-in" v-if="this.$root.authUser">
              <div v-if="this.$root.activeUserName !== null">Signed in as {{this.$root.activeUserName}}</div>
              <div v-if="!this.$root.authUser.emailVerified" class="warning">Email verified is {{this.$root.authUser.emailVerified}}</div>
              <div v-if="this.$root.activeLang !== null">Current lang {{this.$root.activeLang}}</div>
            </div>
            <div class="bottom-panel">

            </div>
          </div>
        </div>
        <div class="content-body" >
        </div>
      </div>
    </div>
</template>

<script>
  import LoginWindow from '../components/ModalWindows/WindowLoginComponent'
  import ChooseLangWindow from '../components/ModalWindows/WindowChooseLangComponent'
  import axios from 'axios'
  import ViewPostComponent from "./ViewPostComponent";


    export default {
      name: "main-component",
      components: {
        ViewPostComponent,
      },
      data() {
        return {
          isOpenCompiler: false,

          activeLang: '',

          userName: '',
          userRole: '',
          userRate: '',
          email: '',

          response: '',
          // activeUserName: '',

          activeArticles: false,
          activeNews: false,
          activeLessons: false,
          activeTasks: false,

          isOpenPost: false,

          postId: null,
          postName: '',
          postDescription: '',
          // postText: '',
          postType: '',
          postRate: null,
          newsImportance: null,

          taskTestInput: '',
          taskExpectedOutput: '',
        }
      },
      methods:{

        toReturn(){
          this.isOpenPost = false;
          this.isOpenCompiler = false;

          this.postId = null;
          this.postName = "";
          // this.postText = "";
          this.postDescription="";
          this.postType = "";
          this.postRate = null;
          this.newsImportance = null;

          this.taskTestInput = '';
          this.taskExpectedOutput = '';
        },
      },

      mounted: function () {
        this.$root.mainOn();
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);
        if(this.$root.getAuthUser()!==null){
          this.$root.getUserName();
        }
        if(sessionStorage.getItem('activeLang')!==null && this.$root.activeLang===null){
          this.$root.activeLang = sessionStorage.getItem('activeLang');
        }
        if(sessionStorage.getItem('activeLangId')!==null && this.$root.activeLangId===null){
          this.$root.activeLangId = sessionStorage.getItem('activeLangId');
        }

      },

      beforeMount: function(){
        let lastRoute = sessionStorage.getItem('currentRoute');
        sessionStorage.setItem('lastRoute', lastRoute);
      },

      created: function () {

      },

      updated: function () {
        // if (this.$route.name==='posts'){
        //   if(this.$route.params.postsType==='articles'){
        //     this.getArticles();
        //   }else if(this.$route.params.postsType==='lessons'){
        //     this.getLessons();
        //   }else if(this.$route.params.postsType==='tasks'){
        //     this.getTasks();
        //   }else if(this.$route.params.postsType==='news'){
        //     this.getNews();
        //   }
        // }
      }
    }
</script>

<style scoped lang="scss">

  /*css animate*/
  .slide-fade-enter-active {
    transition: all .3s ease;
    /*z-index: 10000;*/
    position: fixed;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    /*z-index: 1000;*/
    position: fixed;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(1005px);
    opacity: 0;
  }

  /*scrollbar*/
  ::-webkit-scrollbar {
    width: 0.5em;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px 0 rgba(0,0,0,0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }


  .content-container, .content-header, .content-body, .body, .menu,
  .logo, .menuitem-container, .nav-bar-btns, .left-panel-container, .btns-container,
  .btn-container, .icon, .top-panel, .cards-container, .card-basic, .card-basic-content, .card-basic-header, .card-basic-body{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .body{
    /*position: fixed;*/
    width: 100%;

    min-height: 93vh;
    background: aliceblue;
  }

  .menu{
    width: 100%;
    height: 90vh;
    align-content: baseline;

  }

  .logo{
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .menuitem-container{
    width: 13vw;
    height: 6vh;
    align-items: center;
    margin: 5px 0 0 0;
  }

  .nav-bar-btns{
    margin: 0 auto;
    width: 3vw;
    height: 6vh;
    background-color: white;
    border-radius: 20%;
    align-items: center;
    justify-content: center;
  }



  .nav-bar-btns:hover{
    transform: scale(1.15);
    transition: .2s all;
    z-index: 10000000;
    cursor: pointer;
    box-shadow: 0 2px 20px 2px rgb(140, 215, 189);
  }

  .menuitem{
    border-radius: 10px 10px 10px 10px;
    width: 9.8vw;
    height: 6vh;
    align-items: center;
    justify-content: center;
  }


  .left-panel-container{
    width: 13vw;
    height: 100vh;
    background: rgba(0,0,0,.05)
  }

  .btns-container{
    width: 13vw;
    height: 10vh;
    justify-content: center;
  }
  .btn-container{

    width: 4.1vw;
    height: 10vh;
    align-items: center;
  }

  .logged-in{
    background-color: white;
  }

  .logged-in:hover{
    box-shadow: 0 2px 20px 2px rgb(215, 108, 119);
  }

  .logged-out{
    background-color: white;
  }

  .logged-out:hover{
    box-shadow: 0 2px 20px 2px rgb(126, 215, 118);
  }


  .icon{
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .warning{
    color: red;
  }


  .content-container{
    width: 85vw;
    /*margin-top: 60px;*/
    margin: 0 auto;
    height: 100%;

    /*align-content: center;*/
    /*overflow: auto;*/
    /*overflow-x: hidden!important;*/
  }

  .content-header{
    width: 87vw;
    height: 10vh;
  }

  .content-body{
    height: 100%;
    width: 87vw;
    justify-content: center;
  }

  .bottom-panel, .card-basic-footer{
    display: -webkit-flex;
    -webkit-flex-wrap: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }

  .top-panel{
    justify-content: flex-start;
  }

  .top-panel, .bottom-panel{
    width: 87vw;
    height: 5vh;
  }

  .cards-container{
    width: 70vw;
    height: 90%;
    align-content: baseline;
    /*justify-content: space-evenly;*/

    overflow-y: auto;
  }

  .card-basic{
    width: 30vw;
    height: 22vh;

    margin: 1vh 0.5vw 1vh 0.5vw;
    background: rgba(193, 196, 202, 0.63);
    border-radius: 2px;

    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.49);
  }

  .card-basic-content{
    width: 100%;
  }

  .card-basic-header{
    width: 100%;
    height: 6vh;

    font-size: 1.5rem;
    padding-left: 5px;
    /*TODO если текст не помещается в заданную область необходимо обрезать и добавлять многоточие доделать
      TODO
    */
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*word-break: break-all;*/
  }

  .card-basic-body{
    width: 100%;
    height: 10vh;
    font-size: 1rem;
    /*margin: 0 auto;*/
    padding-left: 5px;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
  }

  .card-basic-footer{
    width: 100%;
    height: 6vh;
    align-items: center;
    justify-content: space-around;
    font-size: 0.6rem;
  }

  .button{
    font-size: 15px !important;
    width: 40%;
    /*height: 100%;*/
    height: 3vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }


</style>
