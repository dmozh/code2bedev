<template>
    <div class="body">
      <div class="left-panel-container">
        <div class="btns-container">
          <div class="btn-container">
            <div class="nav-bar-btns waves-effect waves-dark" @click="openWindowChooseLang">
              langs
            </div>
          </div>
          <div class="btn-container">
            <div to="/mycabinet" class="nav-bar-btns waves-effect waves-dark" @click="toMyCabinet">
              lk
            </div>
          </div>
          <div class="btn-container">
            <div class="nav-bar-btns logged-in waves-effect waves-dark" v-if="this.$root.authUser" @click="logout">
              <img src="@/assets/png/pic_for_login_btn.png" class="icon">
            </div>
            <div class="nav-bar-btns logged-out waves-effect waves-dark" v-else @click="openLoginWindow">
              <img src="@/assets/png/pic_for_login_btn.png" class="icon">
            </div>
          </div>
        </div>
        <div class="menu">
          <div class="menuitem-container">
            <div class="nav-bar-btns menuitem waves-effect waves-dark">
              lessons
            </div>
          </div>
          <div class="menuitem-container ">
            <div class="nav-bar-btns menuitem waves-effect waves-dark">
              articles
            </div>
          </div>
          <div class="menuitem-container">
            <div class="nav-bar-btns menuitem waves-effect waves-dark">
              tasks
            </div>
          </div>
          <div class="menuitem-container">
            <div class="nav-bar-btns menuitem waves-effect waves-dark">
              news
            </div>
          </div>
        </div>
      </div>
      <login :modalActive="modalActive" @close="closeLoginWindow" @logut="logout"></login>
      <choose-lang :windowChooseLangModalActive="windowChooseLangModalActive" @close="closeWindowChooseLang"></choose-lang>
      <div class="content-container ">
        <div class="container">
          <div class="col s12 m7">
            <div v-if="this.response">{{this.response.data.langs[0].lang_name}}</div>
            <div class="signed-in" v-if="this.$root.authUser">
              <h5>Signed in as {{this.$root.activeUserName}} {{this.$root.authUser.emailVerified}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import auth from 'firebase'
  import LoginWindow from '@/components/ModalWindows/WindowLoginComponent'
  import ChooseLangWindow from '@/components/ModalWindows/WindowChooseLangComponent'
  import axios from 'axios'

    export default {
      name: "main-component",
      components: {
        login: LoginWindow,
        chooseLang: ChooseLangWindow
      },
      data() {
        return {
          loggedIn: "logged-in",
          loggedOut: "logged-out",
          modalActive: false,
          windowChooseLangModalActive: false,
          email: '',

          response: '',
          // activeUserName: '',

        }
      },
      methods:{
        logout(){
          auth.auth().signOut();
          this.$root.authUser = null;
          this.$root.activeUserName = null;
          this.$root.activeUserRole = null;
          this.$root.activeUserRate =  null;
        },
        closeLoginWindow(){
          this.modalActive = false;
        },
        openLoginWindow(){
          this.modalActive = true;
        },
        toMyCabinet(){
          if (this.$root.authUser === null){
            //TODO сделать модалку кастомную красивую с вызовом модалки логирования
            alert('Please log in in your account')
          }else{
            this.$router.push({path: '/mycabinet'})
          }
        },

        openWindowChooseLang(){
          this.windowChooseLangModalActive = true;
        },
        closeWindowChooseLang(){
          this.windowChooseLangModalActive = false;
        },

      },

      mounted: function () {
        //TODO есть баг, при обновлении страницы имя пользователя пропадает, пока будет костыль чтобы не тратить на это время,
        //TODO но необходимо найти способ решение данной проблемы.
        this.$root.getUserName()
      },

      created: function () {

      },


    }
</script>

<style scoped lang="scss">
  .body{
    /*position: fixed;*/
    width: 100vw;
    height: 100vh;
    background: aliceblue;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .menu{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 90vh;
    align-content: baseline;

  }

  .logo{
    margin: auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    max-height: 100%;
  }

  .menuitem-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 13vw;
    height: 6vh;
    align-items: center;
    margin: 5px 0 0 0;
  }

  .nav-bar-btns{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
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
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    background: rgba(0,0,0,.05)
  }

  .btns-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 13vw;
    height: 10vh;
    justify-content: center;
  }
  .btn-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
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
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    max-height: 100%;
  }


  .content-container{
    width: 85vw;
    margin: 0 auto;
    height: 100%;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    overflow: auto;
    overflow-x: hidden!important;
  }

</style>
