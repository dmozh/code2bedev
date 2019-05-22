<template>
  <div class="body">
    <!--<header-component></header-component>-->
    <div class="container content">
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
    import HeaderComponent from "./HeaderComponent";

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
          this.showProfile = true;
        },
        showPostsComponent(){
          this.showProfile = false;
          this.showSeen = false;
          this.showCreate = false;
          this.showPosts = true;
        },
        showSeenComponent(){
          this.showProfile = false;
          this.showPosts = false;
          this.showCreate = false;
          this.showSeen = true;
        },
        showCreateComponent() {
          this.showPosts = false;
          this.showSeen= false;
          this.showProfile = false;
          this.showCreate = true;
        }
      },

      //my lovely crutches
      mounted: function() {
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);

        if (this.$root.getAuthUser() === null){
          this.$router.replace('/')
        }
        this.$root.myCabOn();
        if (this.$router.currentRoute.name === 'profile'){
          this.$root.myCabOn();
        }

        //TODO при добавление нового урока нужно чтобы массив обновлялся,
        //TODO можно делать каждый раз запрос на сервер, но если будет много пользователей, сервер умрет от такого
        // if(this.$root.userLessons === null){
        //   this.$root.getUserLessons();
        // }
      },
      beforeMount: function(){
        let lastRoute = sessionStorage.getItem('currentRoute');
        sessionStorage.setItem('lastRoute', lastRoute);
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
    margin-top: 60px;
    width: 100%;
    height: 93.8vh;
    background: aliceblue;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .left-panel-container{
    /*margin-top: 60px;*/
    min-width: 100px;
    width: 13%;
    height: 100%;
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
    width: 100%;
    height: 10vh;
    align-items: center;
    border-bottom: 1px solid rgb(205, 198, 207);
  }

  .nav-bar-btns{
    display: -webkit-flex;
    display: flex;
    margin: 0 auto;
    width: 100%;
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
    width: 100%;
    height: 90vh;
    align-content: baseline;
    justify-content: center;
  }

  .menuitem-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
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


  .content{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    height: 100%;
    /*background: red;*/
    /*overflow: auto;*/
    /*background: rgba(0, 0, 0, 0.36);*/
    /*background: aliceblue;*/
    /*overflow-x: hidden!important;*/
  }
</style>
