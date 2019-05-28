<template>
    <div class="body">
      <div class="mod-header">
        <div class="label">ПОКАЗАТЬ</div>
        <div class="mod-tab-container">
          <div class="mod-tab btn" @click="showArticles" v-bind:class="{active_tab: articlesOpen}">СТАТЬИ</div>
          <div class="mod-tab btn" @click="showLessons" v-bind:class="{active_tab: lessonsOpen}">УРОКИ</div>
          <div class="mod-tab btn" @click="showTasks" v-bind:class="{active_tab: tasksOpen}">ЗАДАЧИ</div>
        </div>
      </div>
      <div class="container">
        <div class="card blue-grey darken-1"
             v-if="lessonsOpen"
             v-for="elem in this.lessons"
             :key="elem.lesson_id">
          <div class="card-content white-text">
            <span class="card-title">Название урока: {{elem.lesson_name}}</span>
            <p class="txt">Описание урока: {{elem.lesson_description}}</p>
            <div class="splitter"></div>
            <p class="txt">Текст урока: {{elem.lesson_text}}</p>
            <div class="splitter"></div>
            <p class="txt">Тэги: {{elem.lesson_tags}}</p>
            <div class="splitter"></div>
            <p class="txt">Автор: {{elem.author}}</p>
          </div>
          <div class="card-action">
            <div class="btn" @click="isModerated(true,true,false, elem.lesson_id, elem.author_id, 'lesson', $event)">ОДОБРИТь</div>
            <div class="btn" @click="isModerated(true,false,true,  elem.lesson_id, elem.author_id, 'lesson', $event)">Отказать</div>
          </div>
        </div>
        <div class="card blue-grey darken-1"
             v-if="articlesOpen"
             v-for="elem in this.articles"
             :key="elem.article_id">
          <div class="card-content white-text">
            <span class="card-title">Название статьи: {{elem.article_name}}</span>
            <div class="splitter"></div>
            <p class="txt">Описание статьи: {{elem.article_description}}</p>
            <div class="splitter"></div>
            <p class="txt">Текст статьи: {{elem.article_text}}</p>
            <div class="splitter"></div>
            <p class="txt">Тэги: {{elem.article_tags}}</p>
            <div class="splitter"></div>
            <p class="txt">Автор: {{elem.author}}</p>
          </div>
          <div class="card-action">
            <div class="btn" @click="isModerated(true,true,false, elem.article_id, elem.author_id, 'article', $event)">ОДОБРИТь</div>
            <div class="btn" @click="isModerated(true,false,true,  elem.article_id, elem.author_id, 'article', $event)">Отказать</div>
          </div>
        </div>
        <div class="card blue-grey darken-1"
             v-if="tasksOpen"
             v-for="elem in this.tasks"
             :key="elem.task_id">
          <div class="card-content white-text">
            <span class="card-title">Название задачи: {{elem.task_name}}</span>
            <p class="txt">Описание задачи: {{elem.task_description}}</p>
            <div class="splitter"></div>
            <p class="txt">Текст задачи: {{elem.task_text}}</p>
            <div class="splitter"></div>
            <p class="txt">Сложноть задачи: {{elem.task_difficulty}}</p>
            <div class="splitter"></div>
            <p class="txt">Автор: {{elem.author}}</p>
          </div>
          <div class="card-action">
            <div class="btn" @click="isModerated(true,true,false, elem.task_id, elem.author_id, 'task', $event)">ОДОБРИТь</div>
            <div class="btn" @click="isModerated(true,false,true, elem.task_id, elem.author_id, 'task', $event)">Отказать</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import regeneratorRuntime from "regenerator-runtime";
  import axios from 'axios'

    export default {
      name: "moderator-component",
      data(){
        return{
          allUnModerPosts: [],
          articles: [],
          lessons: [],
          tasks: [],

          lessonsOpen: false,
          articlesOpen: false,
          tasksOpen: false
        }
      },
      methods: {
        async isModerated(moder,approved,denied, postId, authorId, postType, event){
          let body = {
            moder: true,
            denied: denied,
            approved: approved,
            postId: postId,
            authorId: authorId,
            postType: postType
          };
          const jBody = JSON.stringify(body);
          await axios.post(this.$root.URL+'updateIsModerated', jBody).then((response) => {
            console.log(response);
            if(response.data.msg===true && approved){
              let toastText = '<span>Одобрено</span>';
              M.toast({html: toastText, classes: 'rounded success'});
            }else if(response.data.msg===true && denied){
              let toastText = '<span>Отказано</span>';
              M.toast({html: toastText, classes: 'rounded success'});
            }
          }).catch((error) => {
            console.log(error);});

          // получаем элемент для удаления
          // console.log(event.target.parentElement.parentElement);
          let elem = event.target.parentElement.parentElement;
          // если элемент совпадает с классом удаляем
          if (elem.className==="card blue-grey darken-1"){
            elem.classList.add('hidden')
           }
        },

        showArticles(){
          if(!this.articlesOpen){
            this.articlesOpen = true;
            this.lessonsOpen = false;
            this.tasksOpen = false;
            this.sendQuery('article')
          }
        },
        showLessons(){
          if(!this.lessonsOpen) {
            this.articlesOpen = false;
            this.lessonsOpen = true;
            this.tasksOpen = false;
            this.sendQuery('lesson')
          }
        },
        showTasks(){
          if(!this.tasksOpen) {
            this.articlesOpen = false;
            this.lessonsOpen = false;
            this.tasksOpen = true;
            this.sendQuery('task')
          }
        },
        async sendQuery(type){
          let body = {
            moderName: await localStorage.getItem('userName'),
            role: await localStorage.getItem('userRole'),
            postsType: type
          };
          const jBody = JSON.stringify(body);
          await axios.post(this.$root.URL+'getUnModeratedPosts', jBody).then((response) => {
            console.log(response);
            if(type==='article'){
              this.articles = response.data.posts.articles;
            } else if(type==='lesson'){
              this.lessons = response.data.posts.lessons;
            }else if(type==='task'){
              this.tasks = response.data.posts.tasks;
            }
          }).catch((error) => {
            console.log(error);});
        },
      },
      mounted: function () {
        if (this.$root.getAuthUser === null){
          let toastText = '<span>Пожалуйста авторизируйтесь</span>';
          M.toast({html: toastText, classes: 'rounded warning', displayLength: 6000});
          this.$router.go(-1)
        }else {
          this.$root.myCabOn();
          if ((localStorage.getItem('userRole') === '666') || (localStorage.getItem('userRole') === '333')) {

          } else {
            let toastText = '<span>Нет доступа</span>';
            M.toast({html: toastText, classes: 'rounded warning'});
            this.$router.replace('/profile/me');
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .label{
    justify-content: center;
    align-items: center;
    color: #93989f;
    font-size: 2em;
  }

  .body{
    flex-wrap: wrap!important;
    justify-content: center;
  }

  .mod-header, .mod-tab, .mod-tab-container, .label, .body{
    display: flex;
    flex-wrap: nowrap;
  }

  .mod-header{
    background: rgba(155, 216, 213, 0.43);
    justify-content: center;
    width: 90%;
    height: 7vh;
    border-radius: 0 0 20px 20px;
  }

  .mod-tab-container{
    margin-right: 20px;
    align-items: center;
    /*width: 30%;*/
    justify-content: baseline;
  }

  .mod-tab{
    margin: 0 10px 0 10px;
    font-size: 1.5em;
    align-items: center;
    height: 60%;
  }

  .mod-tab:hover{
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
  .splitter{
    margin: 3px 0 3px 0;
    border-bottom: 1px solid grey;
  }

  .hidden{
    display: none;
  }

  .txt{
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
</style>
