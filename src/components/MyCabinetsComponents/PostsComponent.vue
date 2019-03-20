<template>
  <div class="body">
    <div class="header">
      <label for="postsType">Выберите какие посты показать: </label>
      <select id="postsType" class="custom-select" @change="change($event)">
        <!--тут определяются языки программировпния в селекте-->
        <option v-for="type in postsType" :key="type.id" :value="type.type">{{type.type}}</option>
      </select>
    </div>
    <div class="content-container">
      <div class="post-block" v-if="showArticles">
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
                    Картинки нет
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
      <div class="post-block" v-if="showLessons">
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
                    Картинки нет
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
      <div class="post-block" v-if="showTasks">
        <div class="post-block-header">
          <h5>ЗАДАЧИ</h5>
        </div>
        <div class="post-block-content-container">
          <div class="post-block-content-types"
               v-for="(item) in lessonsForTasks"
               :key="item.id">
            <div class="post-block-content-types-header">{{item.lesson_name}}</div>
            <div class="posts-container">
              <div class="wrapper-container">
                <div class="post-card"
                     v-for="elem in response.tasks"
                     :key="elem.task_id"
                     v-if="elem.lesson_name === item.lesson_name">
                  <div class="left-container-post-card">
                    Картинки нет
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
      <div class="post-block" v-if="showNews && this.$root.activeUserRole === 666">
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
                    Картинки нет
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
</template>

<script>
  import axios from 'axios'

    export default {
      name: "posts-component",
      data(){
        return{
          postsType: [
            {id: 1, type: 'Все посты'},
            {id: 2, type: 'Статьи'},
            {id: 3, type: 'Уроки'},
            {id: 4, type: 'Задачи'},
            {id: 5, type: 'Новости'}
          ],

          showArticles: true,
          showLessons: true,
          showTasks: true,
          showNews: true,

          response: '',

          progLanguages: [],
          lessonsForTasks: [],
          tasks: []
        }
      },
      methods: {
        change(event) {
          //получение значения селекта
          const selectedIndex = document.getElementById("postsType").options.selectedIndex;
          const item = document.getElementById("postsType").options[selectedIndex].value;
          console.log(selectedIndex + " " +event.target.value);

          if (selectedIndex === 0) {
            this.showArticles = true;
            this.showLessons = true;
            this.showTasks = true;
            this.showNews = true;
          }else if(selectedIndex === 1){
            this.showArticles = true;
            this.showLessons = false;
            this.showTasks = false;
            this.showNews = false;
          }else if(selectedIndex === 2){
            this.showArticles = false;
            this.showLessons = true;
            this.showTasks = false;
            this.showNews = false;
          }else if(selectedIndex === 3){
            this.showArticles = false;
            this.showLessons = false;
            this.showTasks = true;
            this.showNews = false;
          }else if(selectedIndex === 4){
            this.showArticles = false;
            this.showLessons = false;
            this.showTasks = false;
            this.showNews = true;
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
        }
      },

      mounted(){
        const body = {
          authorEmail: this.$root.authUser.email
        };
        //создаем json
        const jBody = JSON.stringify(body);
        axios.post('http://localhost:8080/getUserAllPosts', jBody).then((response) => {
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
            if (this.contains(this.lessonsForTasks, response.data.posts.tasks[i].lesson_name, "lesson_name") === true){
            }else {
              this.lessonsForTasks.push({id: this.lessonsForTasks.length, lesson_name: response.data.posts.tasks[i].lesson_name})
            }
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    }
</script>

<style scoped lang="scss">
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
  .right-container-post-card-body, .right-container-post-card-footer, .right-container-post-card-header{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .body{

    width: 100%;
    height: 100%;
    background: aliceblue;
  }

  .header{

    width: 100%;
    height: 10vh;
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
    height: 90vh;

  }

  .post-block{
    background: aliceblue;
    width: 100vw;
    height: 90vh;

    overflow-y: auto;
    overflow-x: hidden;
  }
  .post-block-header{

    width: 100vw;
    height: 10vh;

    align-items: center;
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

  .post-card:hover{
    transform: scale(1.05);
    transition: .2s all;
    z-index: 10000000;
    cursor: pointer;
    box-shadow: 0 2px 20px 2px rgb(140, 215, 189);
  }

  .left-container-post-card{
    width: 33%;
    height: 100%;
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
    text-overflow: ellipsis
  }

  .right-container-post-card-footer{
    width: 100%;
    height: 5vh;
    justify-content: flex-end;
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
