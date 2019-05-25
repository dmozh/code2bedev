<template>
  <div class="body">
    <transition name="slide-fade">
      <div class="inner-container" v-if="onHide">
        <div class="header">
          <label for="postsType">Выберите какие посты показать: </label>
          <select id="postsType" class="custom-select" @change="change()">
            <!--тут определяются языки программировпния в селекте-->
            <option v-for="type in postsType" :key="type.id" :value="type.type">{{type.type}}</option>
          </select>
        </div>
        <div class="content-container">
          <div class="post-block articles" v-if="showArticles">
            <div class="post-block-header">
              <h5>СТАТЬИ</h5>
            </div>
            <div class="post-block-content-container">
              <div class="post-block-content-types"
                   v-for="(item) in progLanguages"
                   :key="item.id">
                <div class="post-block-content-types-header">{{item.lang}}</div>
                <div class="posts-container">
                  <div class="wrapper-container">
                    <div class="post-card"
                         v-for="elem in response.articles"
                         :key="elem.article_id"
                         v-if="elem.lang_name === item.lang">
                      <div class="left-container-post-card">
                        <div class="post-logo">Картинки нет</div>
                        <div class="btns-container">
                          <div class="functional-btn update-btn"
                               @click="showCreateComponentArticles(elem.article_id, elem.article_name, elem.article_description,
                                                            elem.article_text, elem.article_tags, elem.lang_id, elem.lang_name)">
                            <img src="../../assets/png/change_button.png" class="icon">
                          </div>
                          <div class="functional-btn delete-btn"
                               @click="deleteArticle(elem.article_id, $event)">
                            <img src="../../assets/png/delete_button.png" class="icon">
                          </div>
                        </div>
                      </div>
                      <div class="right-container-post-card">
                        <div class="right-container-post-card-header">{{elem.article_name}}</div>
                        <div class="right-container-post-card-body">{{elem.article_description}}</div>
                        <div class="right-container-post-card-footer">Рейтинг статьи: {{elem.article_rate}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="post-block lessons" v-if="showLessons">
            <div class="post-block-header">
              <h5>УРОКИ</h5>
            </div>
            <div class="post-block-content-container">
              <div class="post-block-content-types"
                   v-for="(item) in progLanguages"
                   :key="item.id">
                <div class="post-block-content-types-header">{{item.lang}}</div>
                <div class="posts-container">
                  <div class="wrapper-container">
                    <div class="post-card"
                         v-for="elem in response.lessons"
                         :key="elem.lesson_id"
                         v-if="elem.lang_name === item.lang">
                      <div class="left-container-post-card">
                        <div class="post-logo">Картинки нет</div>
                        <div class="btns-container">
                          <div class="functional-btn update-btn"
                               @click="showCreateComponentLessons(elem.lesson_id, elem.lesson_name, elem.lesson_description,
                                                                  elem.lesson_text, elem.lesson_tags, elem.lang_id, elem.lang_name)">
                            <img src="../../assets/png/change_button.png" class="icon">
                          </div>
                          <div class="functional-btn delete-btn"
                               @click="deleteLesson(elem.lesson_id, $event)">
                            <img src="../../assets/png/delete_button.png" class="icon">
                          </div>
                        </div>
                      </div>
                      <div class="right-container-post-card">
                        <div class="right-container-post-card-header">{{elem.lesson_name}}</div>
                        <div class="right-container-post-card-body">{{elem.lesson_description}}</div>
                        <div class="right-container-post-card-footer">Рейтинг урока: {{elem.lesson_rate}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="post-block tasks" v-if="showTasks">
            <div class="post-block-header">
              <h5>ЗАДАЧИ</h5>
            </div>
            <div class="post-block-content-container">
              <div class="post-block-content-types"
                   v-for="(item) in progLanguages"
                   :key="item.id">
                <div class="post-block-content-types-header">{{item.lang}}</div>
                <div class="posts-container">
                  <div class="wrapper-container">
                    <div class="post-card"
                         v-for="elem in response.tasks"
                         :key="elem.task_id"
                         v-if="elem.lang_name === item.lang">
                      <div class="left-container-post-card">
                        <div class="post-logo">Картинки нет</div>
                        <div class="btns-container">
                          <div class="functional-btn update-btn"
                               @click="showCreateComponentTasks(elem.task_id, elem.task_name, elem.task_description,
                                            elem.task_text, elem.lang_id, elem.lang_name, elem.task_difficulty, elem.test_input, elem.expected_output, elem.lessons)">
                            <img src="../../assets/png/change_button.png" class="icon">
                          </div>
                          <div class="functional-btn delete-btn"
                               @click="deleteTask(elem.task_id, $event)">
                            <img src="../../assets/png/delete_button.png" class="icon">
                          </div>
                        </div>
                      </div>
                      <div class="right-container-post-card">
                        <div class="right-container-post-card-header">{{elem.task_name}}</div>
                        <div class="right-container-post-card-body">{{elem.task_description}}</div>
                        <div class="right-container-post-card-footer">Рейтинг задачи: {{elem.task_rate}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="post-block news" v-if="showNews && this.$root.activeUserRole === '666' ">
            <div class="post-block-header">
              <h5>НОВОСТИ</h5>
            </div>
            <div class="post-block-content-container">
              <div class="post-block-content-types">
                <div class="posts-container">
                  <div class="wrapper-container">
                    <div class="post-card"
                         v-for="elem in response.news"
                         :key="elem.news_id">
                      <div class="left-container-post-card">
                        <div class="post-logo">Картинки нет</div>
                        <div class="btns-container">
                          <div class="functional-btn update-btn"
                               @click="showCreateComponentNews(elem.news_id, elem.news_name, elem.news_description,
                                                     elem.news_text, elem.news_tags, elem.news_importance)">
                            <img src="../../assets/png/change_button.png" class="icon">
                          </div>
                          <div class="functional-btn delete-btn"
                               @click="deleteNews(elem.news_id, $event)">
                            <img src="../../assets/png/delete_button.png" class="icon">
                          </div>
                        </div>
                      </div>
                      <div class="right-container-post-card">
                        <div class="right-container-post-card-header">{{elem.news_name}}</div>
                        <div class="right-container-post-card-body">{{elem.news_description}}</div>
                        <div class="right-container-post-card-footer">
                          <div v-if="elem.news_importance === 0">Важность новости: Не важно</div>
                          <div v-else-if="elem.news_importance === 1">Важность новости: Важно</div>
                          <div v-else-if="elem.news_importance === 2">Важность новости: Очень важно</div>
                          <div v-else-if="elem.news_importance === 3">Важность новости: Критически важно</div>
                          <div class="splitter-footer-card"></div>
                          <div>Рейтинг новости: {{elem.news_rate}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <create-post-component v-bind:is-article="this.isOpenArticles"
                             v-bind:is-news="this.isOpenNews"
                             :isUpdate="isUpdate"
                             :reqPostId="this.postId"
                             :reqPostName="this.postName"
                             :reqPostDescription="this.postDescription"
                             :reqPostText="this.postText"
                             :reqPostTags="this.postTags"
                             :reqNextPostTag="this.nextPostTag"
                             :reqLangId = "this.postLangId"
                             :reqLangName = "this.postLangName"
                             v-if="this.isOpenArticles"
                             @returns="toReturn">

      </create-post-component>
    </transition>

    <transition name="slide-fade">
      <create-post-component v-bind:is-article="this.isOpenArticles"
                             v-bind:is-news="this.isOpenNews"
                             :isUpdate="isUpdate"
                             :reqPostId="this.postId"
                             :reqPostName="this.postName"
                             :reqPostDescription="this.postDescription"
                             :reqPostText="this.postText"
                             :reqPostTags="this.postTags"
                             :reqNextPostTag="this.nextPostTag"
                             :reqNewsImportance = "this.newsImportance"
                             v-if="this.isOpenNews"
                             @returns="toReturn">
      </create-post-component>
    </transition>

    <transition name="slide-fade">
      <create-tasks-component v-if="this.isOpenTasks"
                              :isUpdate = "this.isUpdate"
                              :reqTaskId = "this.postId"
                              :reqTaskName = "this.postName"
                              :reqTaskDescription = "this.postDescription"
                              :reqTaskText = "this.postText"
                              :reqTaskDiff = "this.taskDiff"
                              :reqLangId = "this.postLangId"
                              :reqLangName = "this.postLangName"
                              :reqTestInput = "this.taskTestInput"
                              :reqExpectedOutput = "this.taskExpectedOutput"
                              :reqLinkedLessons ="this.linkedLessons"
                              @returns="toReturn">

      </create-tasks-component>
    </transition>

    <transition name="slide-fade">
      <create-lesson-component v-if="this.isOpenLessons"
                               :isUpdate="isUpdate"
                               :reqLessonId="this.postId"
                               :reqLessonName="this.postName"
                               :reqLessonDescription="this.postDescription"
                               :reqLessonText="this.postText"
                               :reqLessonTags="this.postTags"
                               :reqNextLessonTag="this.nextPostTag"
                               :reqLangId = "this.postLangId"
                               :reqLangName = "this.postLangName"
                               @returns="toReturn">
      </create-lesson-component>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'

  import CreatePostComponent from '../MyCabinetsComponents/CreateComponents/CreatePostComponent'
  import CreateLessonComponent from '../MyCabinetsComponents/CreateComponents/CreateLessonComponent'
  import CreateTasksComponent from '../MyCabinetsComponents/CreateComponents/CreateTasksComponent'

    export default {
      name: "posts-component",
      components: {
        CreatePostComponent,
        CreateLessonComponent,
        CreateTasksComponent,
      },
      data(){
        return{
          postsType: [
            {id: 1, type: 'Статьи'},
            {id: 2, type: 'Уроки'},
            {id: 3, type: 'Задачи'},
            {id: 4, type: 'Новости'}
          ],

          showArticles: false,
          showLessons: false,
          showTasks: false,
          showNews: false,

          response: '',

          progLanguages: [],
          lessonsForTasks: [],
          tasks: [],

          //for update
          isUpdate: false,

          //переменные передаваеммые в пропсы post component
          postId: null,
          postName: null,
          postDescription: null,
          postText: null,
          postTags: [],
          nextPostTag: '',
          postLangId: null,
          postLangName: null,

          taskTestInput: '',
          taskExpectedOutput: '',
          linkedLessons: null,

          newsImportance: null,


          //переменные передаваеммые в пропсы task component
          lessonName: null,
          lessonId: null,
          taskDiff: null,

          onHide: true,
          isOpenArticles: false,
          isOpenTasks: false,
          isOpenNews: false,
          isOpenLessons: false,

        }
      },
      methods: {
        change() {
          //получение значения селекта
          const selectedIndex = document.getElementById("postsType").options.selectedIndex;

          if(selectedIndex === 0){
            this.showArticles = true;
            this.showLessons = false;
            this.showTasks = false;
            this.showNews = false;
            sessionStorage.setItem('activeIndexOnPostsSelect', 0);
          }else if(selectedIndex === 1){
            this.showArticles = false;
            this.showLessons = true;
            this.showTasks = false;
            this.showNews = false;
            sessionStorage.setItem('activeIndexOnPostsSelect', 1);
          }else if(selectedIndex === 2){
            this.showArticles = false;
            this.showLessons = false;
            this.showTasks = true;
            this.showNews = false;
            sessionStorage.setItem('activeIndexOnPostsSelect', 2);
          }else if(selectedIndex === 3){
            this.showArticles = false;
            this.showLessons = false;
            this.showTasks = false;
            this.showNews = true;
            sessionStorage.setItem('activeIndexOnPostsSelect', 3);
          }
        },

        contains(arr, elem, type){
          if (type === "lesson_name"){
            for(let i = 0; i<arr.length; i++){
              if(arr[i].lesson_name===elem){
                return true
              }
            }
          }else if(type==="lang"){
            for(let i = 0; i<arr.length; i++){
              if(arr[i].lang===elem){
                return true
              }
            }
          }

          return false
        },

        pushParamsForPosts(id, name, desc, text, tags){
          //определение передаваеммых переменых в модалку
          this.isUpdate = true;
          this.postId = id;
          this.postName = name;
          this.postDescription = desc;
          this.postText = text;
          for(let i=0; i < tags.length; i++){
            this.nextPostTag++;
            this.postTags.push(
              { id: this.nextPostTag,
                name: tags[i]
              });
          }
        },

        pushLangParams(langId, langName){
          this.postLangId = langId;
          this.postLangName = langName;
        },

        pushParamsForTasks(taskId, name, desc, text, langId, langName, taskDiff, testInput, expectedOutput, lessons){
          //определение передаваеммых переменых в модалку
          this.isUpdate = true;
          this.postId = taskId;
          this.postName = name;
          this.postDescription = desc;
          this.postText = text;
          this.postLangId = langId;
          this.postLangName=langName;
          this.taskDiff = taskDiff;
          this.taskTestInput = testInput;
          this.taskExpectedOutput = expectedOutput;
          this.linkedLessons = lessons;
        },

        showCreateComponentArticles(id, name, desc, text, tags, langId, langName) {
          this.pushParamsForPosts(id, name, desc, text, tags);
          this.pushLangParams(langId, langName);

          this.onHide = false;
          this.isOpenArticles = true;
          this.isOpenTasks = false;
          this.isOpenNews = false;
          this.isOpenLessons = false;
        },

        showCreateComponentNews(id, name, desc, text, tags, newsImportance) {

          this.pushParamsForPosts(id, name, desc, text, tags);
          this.newsImportance = newsImportance;
          this.onHide = false;
          this.isOpenArticles = false;
          this.isOpenTasks = false;
          this.isOpenNews = true;
          this.isOpenLessons = false;
        },

        showCreateComponentTasks(taskId, name, desc, text, langId, langName, taskDiff, testInput, expectedOutput, lessons) {

          this.pushParamsForTasks(taskId, name, desc, text, langId, langName, taskDiff, testInput, expectedOutput, lessons);

          this.onHide = false;
          this.isOpenArticles = false;
          this.isOpenTasks = true;
          this.isOpenNews = false;
          this.isOpenLessons = false;
        },

        showCreateComponentLessons(id, name, desc, text, tags, langId, langName) {
          this.pushParamsForPosts(id, name, desc, text, tags);
          this.pushLangParams(langId, langName);

          this.onHide = false;
          this.isOpenArticles = false;
          this.isOpenTasks = false;
          this.isOpenNews = false;
          this.isOpenLessons = true;
        },

        getUserAllPosts(){
          const body = {
            authorEmail: this.$root.authUser.email
          };
          //создаем json
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'getUserAllPosts', jBody).then((response) => {
            this.response = response.data.posts;
            this.tasks = this.response.tasks;
            // console.log(response.data.posts.articles);
            console.log(response.data.posts.tasks);

            for(let i=0; i < response.data.posts.lessons.length; i++){
              if (this.contains(this.progLanguages, response.data.posts.lessons[i].lang_name, "lang") === true){
              }else {
                this.progLanguages.push({id: this.progLanguages.length, lang: response.data.posts.lessons[i].lang_name})
              }
            }

            for(let i=0; i < response.data.posts.articles.length; i++){
              if (this.contains(this.progLanguages, response.data.posts.articles[i].lang_name, "lang") === true){
              }else {
                this.progLanguages.push({id: this.progLanguages.length, lang: response.data.posts.articles[i].lang_name})
              }
            }

            for(let i=0; i < response.data.posts.tasks.length; i++){
              if (this.contains(this.progLanguages, response.data.posts.tasks[i].lang_name, "lang") === true){
              }else {
                this.progLanguages.push({id: this.progLanguages.length, lang: response.data.posts.tasks[i].lang_name})
              }
            }
          }).catch((error) => {
            console.log(error);
          });
        },

        toReturn() {
          //обнуление переменных
          this.postTags = [];
          this.nextPostTag = '';

          //TODO при добавление нового урока нужно чтобы массив обновлялся,
          //TODO можно делать каждый раз запрос на сервер, но если будет много пользователей, сервер умрет от такого
          // this.$root.getUserLessons();
          this.getUserAllPosts();

          this.onHide = true;
          this.isOpenArticles = false;
          this.isOpenTasks = false;
          this.isOpenNews = false;
          this.isOpenLessons = false;
        },

        deleteArticle: function(articleId, event){
          // получаем элемент для удаления
          let elem = event.target.parentElement.parentElement.parentElement.parentElement;
          // если элемент совпадает с классом удаляем
          if (elem.className==="post-card"){
            elem.parentNode.removeChild(elem);
            //если клик пользователь был не рядом с нужным элементом, берем на класс ниже
          }else if (elem.className === "wrapper-container"){
            elem = event.target.parentElement.parentElement.parentElement;
            elem.parentNode.removeChild(elem);
          }

          let body = {
            articleId: articleId,
            authorName: localStorage.getItem('userName')
          };
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'deleteUserArticle', jBody).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);});
        },

        deleteNews: function(newsId, event){
          let elem = event.target.parentElement.parentElement.parentElement.parentElement;
          if (elem.className==="post-card"){
            elem.parentNode.removeChild(elem);
          }else if (elem.className === "wrapper-container"){
            elem = event.target.parentElement.parentElement.parentElement;
            elem.parentNode.removeChild(elem);
          }

          let body = {
            newsId: newsId,
            authorName: localStorage.getItem('userName')
          };
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'deleteUserNews', jBody).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);});
        },
        deleteTask: function(taskId, event){
          let elem = event.target.parentElement.parentElement.parentElement.parentElement;
          if (elem.className==="post-card"){
            elem.parentNode.removeChild(elem);
          }else if (elem.className === "wrapper-container"){
            elem = event.target.parentElement.parentElement.parentElement;
            elem.parentNode.removeChild(elem);
          }

          let body = {
            taskId: taskId,
            authorName: localStorage.getItem('userName')
          };
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'deleteUserTask', jBody).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);});
        },
        deleteLesson: function(lessonId, event){
          let elem = event.target.parentElement.parentElement.parentElement.parentElement;
          if (elem.className==="post-card"){
            elem.parentNode.removeChild(elem);
          }else if (elem.className === "wrapper-container"){
            elem = event.target.parentElement.parentElement.parentElement;
            elem.parentNode.removeChild(elem);
          }

          let body = {
            lessonId: lessonId,
            authorName: localStorage.getItem('userName')
          };
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'deleteUserLesson', jBody).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);});
        }
      },

      mounted(){
        this.$root.myCabOn();
        if(sessionStorage.getItem('activeIndexOnPostsSelect')){
          document.getElementById("postsType").options[sessionStorage.getItem('activeIndexOnPostsSelect')].selected=true;
        }
        this.change();
        this.getUserAllPosts()
      }
    }
</script>

<style scoped lang="scss">

  .articles{
    background: rgba(255, 171, 172, 0.2);
  }
  .lessons{
    background: rgba(85, 202, 215, 0.18);
  }
  .tasks{
    background: rgba(155, 255, 155, 0.2);
  }
  .news{
    background: rgba(255, 248, 145, 0.23);
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


  .post-block-content-types-header{
    width: 60vw;
    border-bottom: 5px solid #bfbfbf;
  }
  h5{
    font-size: 4.5vw;
    color: #606060;
    width: 70vw;
    border-bottom: 5px solid #bfbfbf;
  }
  label{
    font-size: large;
    margin: 1vh 2px 0 0;
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

  .body, .header, .custom-select, .content-container, .post-block,
  .post-block-content-container, .post-block-content-types, .post-block-header, .posts-container, .post-card,
  .left-container-post-card, .right-container-post-card,
  .right-container-post-card-body, .right-container-post-card-footer, .right-container-post-card-header,
  .inner-container, .post-logo, .functional-btn{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .body, .inner-container{
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background: aliceblue;
  }

  .header{

    width: 100%;
    height: 10%;
    align-items: center;

  }

  .custom-select{
  @media screen and (max-width: 900px){
    /*width: 20vw;*/
    height: 3vh !important;
    font-size: 1.5vh;
  }
  display: -webkit-flex !important;
  -webkit-flex-wrap: wrap !important;
  display: flex !important;
  flex-wrap: wrap !important;
  width: 20vw !important;
  height: 5vh;

  font-size: 2vh;
  }

  .content-container {

    width: 100%;
    height: 90%;

  }

  .post-block{
    /*background: aliceblue;*/
    width: 100vw;
    height: 100%;

    overflow-y: auto;
    overflow-x: hidden;
  }
  .post-block-header{

    width: 100vw;
    height: 10vh;
    align-items: center;
    /*margin-bottom: vh;*/
  }
  .post-block-content-container{

    width: 100vw;
    height: 80vh;
  }

  .post-block-content-types{
    width: 100vw;
    height: 40vh;
    font-size: 2.5vw;
    color: #b8b8b8;
    align-items: center;

  }
  .posts-container{
    width: 100vw;
    height: 30vh;
    align-items: center;

    overflow-y: auto;
  }

  .wrapper-container{
    display: -webkit-flex;
    -webkit-flex-wrap: nowrap;
    display: flex;
    flex-wrap: nowrap;

    width: 85vw;

    align-items: center;

    overflow-y: hidden;
    overflow-x: auto;

    height: 30vh;

  }

  .post-card{
    margin: 0 15px 0 15px;
    min-width: 600px;
    width: 30vw;
    height: 25vh;

    background: rgba(193, 196, 202, 0.63);
    border-radius: 15px;
  }

  /*.post-card:hover{*/
    /*transform: scale(1.05);*/
    /*transition: .2s all;*/
    /*z-index: 10000000;*/
    /*cursor: pointer;*/
    /*box-shadow: 0 2px 20px 2px rgba(0, 0, 0, 0.2);*/
  /*}*/

  .left-container-post-card{
    width: 33%;
    height: 100%;
  }

  .post-logo{
    width: 100%;
    /*background: firebrick;*/
    height: 80%;
  }

  .btns-container{
    display: -webkit-flex;
    -webkit-flex-wrap: nowrap;
    display: flex;
    flex-wrap: nowrap;

    align-items: center;

    width: 100%;
    /*background: white;*/
    height: 20%;
  }

  .functional-btn, .update-btn, .delete-btn{
    margin-left: 1vw;
    width: 20%;
    height: 80%;
    align-items: center;
    justify-content: center;
    border-radius: 50%
  }

  .update-btn{

  }

  .delete-btn{

  }

  .update-btn:hover{
    transition: .2s all;
    background: rgba(136, 224, 138, 0.61);
  }

  .delete-btn:hover{
    transition: .2s all;
    background: rgba(224, 73, 74, 0.61);
  }

  .functional-btn:hover{
    transform: scale(1.05);
    transition: .2s all;
    z-index: 10000000;
    cursor: pointer;
    box-shadow: 0 2px 20px 2px rgba(0, 0, 0, 0.2);
  }

  .icon{
    max-width: 70%;
    max-height: 70%;
  }

  .right-container-post-card{
    width: 66%;
    height: 100%;
  }

  .right-container-post-card-header{
    width: 100%;
    height: 6vh;
    font-size: 0.4em;
    color: #000;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-overflow: ellipsis
  }

  .right-container-post-card-body{
    width: 100%;
    height: 14vh;
    font-size: 0.3em;
    color: #000;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .right-container-post-card-footer{
    width: 100%;
    height: 5vh;
    justify-content: flex-end;
    margin-right: 15px;
    font-size: 0.3em;
    color: #eff8ff;
    word-break: break-all;
    text-overflow: ellipsis
  }

  .splitter-footer-card{
    width: 10%;
    height: 5vh;
  }
</style>
