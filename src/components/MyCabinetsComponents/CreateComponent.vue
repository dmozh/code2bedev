<template>
  <div class="body">
    <transition name="slide-fade">
      <div class="col-container" v-if="onHide">

          <div class="column">
            <div class="col-header">
              <img src="@/assets/png/plus.png" class="icon pulse" @click="showCreateComponentArticles">
              <p>СТАТЬЮ</p>
            </div>
            <div class="col-body">
              <p class="desc">
                Описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
              </p>
            </div>
            <div class="col-footer">
              <div class="nav-bar-btns waves-effect waves-dark " >
                <p>МОИ СТАТЬИ</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="col-header">
              <img src="@/assets/png/plus.png" class="icon pulse" @click="showCreateComponentLessons">
              <p>УРОК</p>
            </div>
            <div class="col-body">
              <p class="desc">
                Описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
              </p>
            </div>
            <div class="col-footer">
              <div class="nav-bar-btns waves-effect waves-dark " >
                <p>МОИ УРОКИ</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="col-header">
              <img src="@/assets/png/plus.png" class="icon pulse" @click="showCreateComponentTasks">
              <p>ЗАДАЧУ</p>
            </div>
            <div class="col-body">
              <p class="desc">
                Описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
              </p>
            </div>
            <div class="col-footer">
              <div class="nav-bar-btns waves-effect waves-dark " >
                <p>МОИ ЗАДАЧИ</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="col-header">
              <img src="@/assets/png/plus.png" class="icon pulse" @click="showCreateComponentNews">
              <p>НОВОСТЬ</p>
            </div>
            <div class="col-body">
              <p class="desc">
                Описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
                описание описание описание описание описание
              </p>
            </div>
            <div class="col-footer">
              <div class="nav-bar-btns waves-effect waves-dark " >
                <p>МОИ НОВОСТИ</p>
              </div>
            </div>
          </div>

      </div>
    </transition>

    <transition name="slide-fade">
      <create-post-component v-bind:is-article="this.isOpenArticles"
                                 v-bind:is-news="this.isOpenNews"
                                 v-if="this.isOpenArticles" @returns="toReturn">

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
</template>

<script>
  import CreatePostComponent from '@/components/MyCabinetsComponents/CreateComponents/CreatePostComponent'
  import CreateLessonComponent from '@/components/MyCabinetsComponents/CreateComponents/CreateLessonComponent'
  import CreateTasksComponent from '@/components/MyCabinetsComponents/CreateComponents/CreateTasksComponent'

    export default {
      name: "create-component",
      components: {
        CreatePostComponent,
        CreateLessonComponent,
        CreateTasksComponent,
      },
      data() {
        return {
          onHide: true,
          isOpenArticles: false,
          isOpenTasks: false,
          isOpenNews: false,
          isOpenLessons: false,
        }
      },
      methods: {
        showCreateComponentArticles(){
          this.onHide         = false;
          this.isOpenArticles = true;
          this.isOpenTasks    = false;
          this.isOpenNews     = false;
          this.isOpenLessons  = false;
        },

        showCreateComponentTasks(){
          this.onHide         = false;
          this.isOpenArticles = false;
          this.isOpenTasks    = true;
          this.isOpenNews     = false;
          this.isOpenLessons  = false;
        },

        showCreateComponentNews(){
          this.onHide         = false;
          this.isOpenArticles = false;
          this.isOpenTasks    = false;
          this.isOpenNews     = true;
          this.isOpenLessons  = false;
        },

        showCreateComponentLessons(){
          this.onHide         = false;
          this.isOpenArticles = false;
          this.isOpenTasks    = false;
          this.isOpenNews     = false;
          this.isOpenLessons  = true;
        },

        toReturn(){
          this.onHide         = true;
          this.isOpenArticles = false;
          this.isOpenTasks    = false;
          this.isOpenNews     = false;
          this.isOpenLessons  = false;
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

  .body{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
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

  .column{

    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 19vw;
    margin-right: auto;
    background: rgba(0,0,0,.05);
    height: 100%;
  }

  .col-header{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 10vh;
    border-bottom: 2px solid rgb(163, 157, 165);
    justify-content: flex-start;
    align-items: center;
    font-size: 2.5vw;
  }

  .col-footer{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 10vh;
    align-items: center;
    border-top: 2px solid rgb(163, 157, 165);
  }

  .col-body{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 60%;
    font-size: 1.2vw;
    margin: auto;
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

  /*.slide-fade-leave-to{*/
    /*transform: translateX(1005px);*/
    /*opacity: 0;*/
  /*}*/

  .pulse {
    /*margin:100px;*/
    /*display: block;*/
    /*width: 22px;*/
    /*height: 22px;*/
    /*border-radius: 50%;*/
    /*background: #cca92c;*/
    /*cursor: pointer;*/
    /*box-shadow: 0 0 0 rgba(204,169,44, 0.4);*/
    animation: pulse 2s infinite;
  }
  .pulse:hover {
    animation: none;
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 #f0f8ff;
    }
    70% {
      -webkit-box-shadow: 0 0 0 10px #d6dee5;
    }
    100% {
      -webkit-box-shadow: 0 0 0 0 #93989f;
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 #93989f;
      box-shadow: 0 0 0 0 #93989f;
    }
    70% {
      -moz-box-shadow: 0 0 0 10px #d6dee5;
      box-shadow: 0 0 0 10px #d6dee5;
    }
    100% {
      -moz-box-shadow: 0 0 0 0 #f0f8ff;
      box-shadow: 0 0 0 0 #f0f8ff;
    }
  }
</style>
