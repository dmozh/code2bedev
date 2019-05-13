<template>
  <div class="body">
    <div class="left-panel-container">
      <div class="back-btn-container">
        <router-link to="/main" class="nav-bar-btns menuitem waves-effect waves-dark">
            <p class="note-back-to-main">НА ГЛАВНУЮ</p>
            <img src="../assets/png/home.png" class="icon">
        </router-link>
      </div>
      <div class="menu">
        <div class="menuitem-container">
          <div class="nav-bar-btns waves-effect waves-dark" @click="showProfileComponent">
            <p>МОЙ ПРОФИЛЬ</p>
          </div>
        </div>
        <div class="menuitem-container ">
          <div class="nav-bar-btns waves-effect waves-dark " @click="showPostsComponent">
            <p>МОИ ПОСТЫ</p>
          </div>
        </div>
        <div class="menuitem-container">
          <div class="nav-bar-btns waves-effect waves-dark" @click="showSeenComponent">
            <p>ПРОСМОТРЕНО</p>
          </div>
        </div>
        <div class="menuitem-container">
          <div class="nav-bar-btns waves-effect waves-dark" @click="showCreateComponent">
            <p>СОЗДАТЬ</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-container">
      <profile-component  v-if="this.showProfile"></profile-component>
      <posts-component    v-if="this.showPosts"></posts-component>
      <seen-component     v-if="this.showSeen"></seen-component>
      <create-component   v-if="this.showCreate"></create-component>
    </div>
    <!--check-->
    <!--<div v-if="this.$root.authUser">-->
    <!--  <h5>Signed in as {{this.$root.authUser.email}}</h5>-->
    <!--</div>-->
  </div>
</template>

<script>
    import ProfileComponent from '../components/MyCabinetsComponents/ProfileComponent'
    import PostsComponent from '../components/MyCabinetsComponents/PostsComponent'
    import CreateComponent from '../components/MyCabinetsComponents/CreateComponent'
    import SeenComponent from '../components/MyCabinetsComponents/SeenComponent'

    export default {
      name: "my-cabinet-component",
      components: {
        ProfileComponent,
        PostsComponent,
        CreateComponent,
        SeenComponent
      },
      data() {
        return {
          showProfile: false,
          showPosts: false,
          showSeen: false,
          showCreate: false,
        }
      },
      methods: {
      //TODO сделать по красоте а не костылем, хотя я не знаю как ?????????
        showProfileComponent(){
          this.showPosts = false;
          this.showSeen = false;
          this.showCreate = false;
          this.showProfile = !this.showProfile
        },
        showPostsComponent(){
          this.showProfile = false;
          this.showSeen = false;
          this.showCreate = false;
          this.showPosts = !this.showPosts
        },
        showSeenComponent(){
          this.showProfile = false;
          this.showPosts = false;
          this.showCreate = false;
          this.showSeen = !this.showSeen
        },
        showCreateComponent() {
          this.showPosts = false;
          this.showSeen= false;
          this.showProfile = false;
          this.showCreate = !this.showCreate
        }
      },

      //my lovely crutches
      mounted: function() {
        if (this.$root.authUser === null){
          this.$router.replace('/main')
        }

        //TODO при добавление нового урока нужно чтобы массив обновлялся,
        //TODO можно делать каждый раз запрос на сервер, но если будет много пользователей, сервер умрет от такого
        if(this.$root.userLessons === null){
          this.$root.getUserLessons();
        }
      },

    }
</script>

<style scoped lang="scss">
  .note-back-to-main{
    @media (max-width: 1200px) {
      display: none;
    }
    margin: 0 auto;
    font-size: 18px;
    color: black;
  }
  .body{
    width: 100vw;
    height: 100vh;
    background: aliceblue;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .left-panel-container{
    min-width: 100px;
    width: 13vw;
    height: 100vh;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    background: rgba(0,0,0,.05)
  }

  .left-panel-container > div{
    min-width: 100px;
  }

  .back-btn-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 13vw;
    height: 10vh;
    align-items: center;
    border-bottom: 1px solid rgb(205, 198, 207);
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

  .menu{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 13vw;
    height: 90vh;
    align-content: baseline;
    justify-content: center;
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


  .icon{
    margin: 0 auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 60%;
    max-height: 60%;
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
    /*background: rgba(0, 0, 0, 0.36);*/
    background: aliceblue;
    overflow-x: hidden!important;
  }
</style>
