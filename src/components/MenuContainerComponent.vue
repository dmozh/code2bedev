<template>
  <div class="left-panel-container">
    <div class="btns-container">
      <div class="btn-container">
        <div class="nav-bar-btns waves-effect waves-dark">
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
    <login :modalActive="modalActive" @close="closeLoginWindow" @logut="logout"></login>
    <main-menu-component></main-menu-component>

    </div>
</template>

<script>
    import MainMenuComponent from "./MainWinMenu/MainMenuComponent.vue"
    import auth from 'firebase'
    import LoginWindow from '@/components/ModalWindows/WindowLoginComponent'


    export default {
      components: {
        MainMenuComponent,
        login: LoginWindow,
      },
      name: "menu-container-component",
      data() {
        return {
          loggedIn: "logged-in",
          loggedOut: "logged-out",
          modalActive: false,
          email: ''
        }
      },
      methods:{
        logout(){
          auth.auth().signOut();
          this.$root.authUser = null
        },
        closeLoginWindow(){
          this.modalActive = false;
        },
        openLoginWindow(){
          this.modalActive = true;
        },
        toMyCabinet(){
          if (this.$root.authUser === null){
            //to do сделать модалку кастомную красивую с вызовом модалки логирования
            alert('Please log in in your account')
          }else{
            this.$router.push({path: '/mycabinet' })
          }
        }
      },
    }
</script>

<style scoped lang="scss">
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

  .nav-bar-btns{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 3vw;
    height: 6vh;
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }



  .nav-bar-btns:hover{
    transform: scale(1.15);
    transition: .2s all;
    z-index: 10000000;
    cursor: pointer;
    box-shadow: 0 2px 20px 2px rgb(140, 211, 215);
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
</style>
