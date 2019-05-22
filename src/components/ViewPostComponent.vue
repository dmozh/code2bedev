<template>
    <div class="body">
      <div class="content-container">
        <div class="content-header">
          <div class="info-block">
            <div class="post-type-block">
              <div v-if="this.postType==='article'">Статья</div>
              <div v-if="this.postType==='news'">Новость</div>
              <div v-if="this.postType==='lesson'">Урок</div>
              <div v-if="this.postType==='task'">Задача</div>
            </div>
            <div class="post-seen-block">
              Просмотрено: {{posts_views}} раз
            </div>
            <div v-if="this.postType==='news'"
              class="news-importance-block">
              <div v-if="     this.newsImportance === 0">Важность новости: Не важно</div>
              <div v-else-if="this.newsImportance === 1">Важность новости: Важно</div>
              <div v-else-if="this.newsImportance === 2">Важность новости: Очень важно</div>
              <div v-else-if="this.newsImportance === 3">Важность новости: Критически важно</div>
            </div>
          </div>
          <div class="back-btn waves-effect waves-dark" @click="emitReturn">
            <img src="../assets/png/back_arrow2.png" class="icon" @click="emitReturn">
          </div>
        </div>
        <div class="content-body">
          <div class="post-name-block">{{this.postName}}</div>
          <div class="post-description-block">{{this.postDescription}}</div>
          <div class="post-text-block"></div>
          <div v-if="this.postType==='task'">
            <code-editor-component v-if="this.activeLang !== null"
                                   :place="this.postType"
                                   :lang="this.activeLang"
                                   :theme="this.theme"
                                   :testInput="this.testInput"
                                   :expectedOutput="this.expectedOutput"
                                   :taskId = "this.postId"
            ></code-editor-component>
          </div>
        </div>
        <div class="content-footer">
          <div class="post-rate-block">
            Рейтинг: {{this.postRate}}
            <div class="arrows-container">
              <img src="../assets/png/rate_vote_arrow.png" class="rate-btn" @click="postVote('up')">
              <img src="../assets/png/rate_vote_arrow.png" class="rate-btn rate-btn-reverse" @click="postVote('down')">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import regeneratorRuntime from "regenerator-runtime";
  import axios from 'axios'
  // import "ace-builds/webpack-resolver"
  import CodeEditorComponent from './CodeEditorComponent'



    export default {
      components: {
        CodeEditorComponent
      },
      name: "view-post-component",
      data(){
        return{
          activeLang: null,
          theme: 'eclipse',

          userSeenPost: null,

          posts: Object,



          postType: '',
          postId: null,
          postName: '',
          postDescription: '',
          postRate: null,
          postText: '',
          posts_views: '',
          postsTags: null,
          postLang: '',
          author: '',

          newsImportance: null,

          testInput: '',
          expectedOutput: '',
          lessonID: '',
          lessonName: ''
        }
      },

      methods: {
        emitReturn() {
          this.$emit('returns')
        },

        haveIs(arr, postId, postType){
          for(let i = 0; i<arr.length; i++){
            if      (postType==="task"){
              if(arr[i].task_id === postId){
                return arr[i].isSeen
              }
            }else if(postType==="lesson"){
              if(arr[i].lesson_id === postId){
                return arr[i].isSeen
              }
            }else if(postType==="news"){
              if(arr[i].news_id === postId){
                return arr[i].isSeen
              }
            }else if(postType==="article"){
              if(arr[i].article_id === postId){
                return arr[i].isSeen
              }
            }
          }
          return false
        },

        isVote(voteType, arr, postId, postType){
          if(voteType==='up'){
            for(let i = 0; i<arr.length; i++){
              if      (postType==="task"){
                if(arr[i].task_id === postId){
                  return arr[i].upVote
                }
              }else if(postType==="lesson"){
                if(arr[i].lesson_id === postId){
                  return arr[i].upVote
                }
              }else if(postType==="news"){
                if(arr[i].news_id === postId){
                  return arr[i].upVote
                }
              }else if(postType==="article"){
                if(arr[i].article_id === postId){
                  return arr[i].upVote
                }
              }
            }
            return false
          }else{
            for(let i = 0; i<arr.length; i++){
              if      (postType==="task"){
                if(arr[i].task_id === postId){
                  return arr[i].downVote
                }
              }else if(postType==="lesson"){
                if(arr[i].lesson_id === postId){
                  return arr[i].downVote
                }
              }else if(postType==="news"){
                if(arr[i].news_id === postId){
                  return arr[i].downVote
                }
              }else if(postType==="article"){
                if(arr[i].article_id === postId){
                  return arr[i].downVote
                }
              }
            }
            return false
          }
        },

        postVote(voteType){
          if (this.$root.authUser !== null) {
            let voteIs = this.isVote(voteType, this.posts, this.postId, this.postType);
            if (!voteIs){
              console.log('mogete');
              if(voteType==='up'){
                this.postRate = this.postRate+1
              }else{
                this.postRate = this.postRate-1
              }
              const userId = localStorage.getItem('userID');
              let body = {
                postType: this.postType,
                postId: this.postId,
                userId: userId,
                voteType: voteType,
              };
              const jBody = JSON.stringify(body);
              axios.post(this.$root.URL+'updatePostRate', jBody).then((response) => {
                console.log(response);
                if      (this.postType === "task") {
                  this.posts = response.data.tasks;
                  localStorage.setItem('seenTasks', JSON.stringify(response.data.tasks))
                }
                else if (this.postType === "lesson") {
                  this.posts = response.data.lessons;
                  localStorage.setItem('seenLessons', JSON.stringify(response.data.lessons))
                }
                else if (this.postType === "article") {
                  this.posts = response.data.articles;
                  localStorage.setItem('seenArticles', JSON.stringify(response.data.articles))
                }
                else if (this.postType === "news") {
                  this.posts = response.data.news;
                  localStorage.setItem('seenNews', JSON.stringify(response.data.news))
                }
              }).catch((error) => {
                console.log(error);
              });
            }else{
              alert('Накручивать не хорошо :)')
            }
          }else{
            //TODO кастомное высплывающие окно
            alert('Для голосования необходимо авторизироваться')
          }
        },

        decodeBase64Params(){
          const BASE64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
              encode: function (e) {
              let t = "";
              let n, r, i, s, o, u, a;
              let f = 0;
              e = BASE64._utf8_encode(e);
              while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                  u = a = 64
                }
                else if (isNaN(i)) {
                  a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
              } return t
            },
            decode: function (e) {
              let t = "";
              let n, r, i;
              let s, o, u, a;
              let f = 0;
              // e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
              e = e.replace(/[^A-Za-z0-9+\/=]/g, "");
              while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a; t = t + String.fromCharCode(n);
                if (u !== 64) {
                  t = t + String.fromCharCode(r)
                }
                if (a !== 64) {
                  t = t + String.fromCharCode(i)
                }
              }
              t = BASE64._utf8_decode(t); return t
            },
            _utf8_encode: function (e) {
              e = e.replace(/\r\n/g, "\n");
              let t = "";
              for (let n = 0; n < e.length; n++) {
                let r = e.charCodeAt(n);
                if (r < 128) {
                  t += String.fromCharCode(r)
                }
                else if (r > 127 && r < 2048) {
                  t += String.fromCharCode(r >> 6 | 192);
                  t += String.fromCharCode(r & 63 | 128)
                }
                else {
                  t += String.fromCharCode(r >> 12 | 224);
                  t += String.fromCharCode(r >> 6 & 63 | 128);
                  t += String.fromCharCode(r & 63 | 128)
                }
              } return t
            },
            _utf8_decode: function (e) {
              let t = "";
              let n = 0;
              let r, c1, c2 = 0;
              while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                  t += String.fromCharCode(r);
                  n++
                }
                else if (r > 191 && r < 224) {
                  c2 = e.charCodeAt(n + 1);
                  t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                  n += 2
                }
                else {
                  c2 = e.charCodeAt(n + 1);
                  c3 = e.charCodeAt(n + 2);
                  t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                  n += 3
                }
              } return t
            }
          };
          let params = JSON.parse(BASE64.decode(this.$route.params.params));
          return params
        }
      },

      mounted: function () {
        sessionStorage.setItem('currentRoute', this.$route.fullPath);
        // sessionStorage.setItem('activeRouteOnMain', this.$route.name);
        this.activeLang = sessionStorage.getItem('activeLang');
        const params = this.decodeBase64Params();
        this.postId = params.postId;
        this.postType = params.postType;


        let postId = this.postId;
        let postType = this.postType;


        // console.log(this.postType);
        let body = {
            type: postType,
            id: postId,
          };
        const jBody = JSON.stringify(body);
        axios.post(this.$root.URL+'getPostInfo', jBody).then((response) => {
          this.postText = response.data.post_text;
          this.posts_views = response.data.views;
          this.postName = response.data.post_name;
          this.postDescription = response.data.post_description;
          this.postRate = response.data.post_rate;
          this.postTags = response.data.post_tags;
          this.postLang = response.data.post_lang;
          this.author = response.data.author;
          if (postType === 'task'){
            this.testInput = response.data.test_input;
            this.expectedOutput = response.data.expected_output;
            this.lessonName = response.data.lesson_name;
            this.lessonID = response.data.lesson_id;
          }
          if (postType === 'news'){
            this.newsImportance = response.data.news_importance;
          }
          let parentElem = document.getElementsByClassName('post-text-block');
          parentElem[0].insertAdjacentHTML('afterbegin', this.postText);
          // console.log(parentElem);
          console.log(response);
          }).catch((error) => {
            console.log(error);
        });

        if (this.$root.authUser !== null) {
          const userId = localStorage.getItem('userID');
          // let posts = Object;
          let haveIs = Boolean;

          if(postType==="task"){
            this.posts = JSON.parse(localStorage.getItem('seenTasks'));
            haveIs = this.haveIs(this.posts, postId, postType);
          }else if(postType==="lesson"){
            this.posts = JSON.parse(localStorage.getItem('seenLessons'));
            haveIs = this.haveIs(this.posts, postId, postType);
          }else if(postType==="article"){
            this.posts = JSON.parse(localStorage.getItem('seenArticles'));
            haveIs = this.haveIs(this.posts, postId, postType);
          }else if(postType==="news"){
            this.posts = JSON.parse(localStorage.getItem('seenNews'));
            haveIs = this.haveIs(this.posts, postId, postType);
          }

          //если не просмотрена, просматриваем
          console.log('isSeen '+haveIs);
          if (!haveIs) {
            let body = {
              postType: postType,
              postId: postId,
              userId: userId,
              isSeen: true,
              isDecided: false
            };
            const jBody = JSON.stringify(body);
            axios.post(this.$root.URL+'addSeenPost', jBody).then((response) => {
              // console.log(response);
              if (postType === "task") {
                localStorage.setItem('seenTasks', JSON.stringify(response.data.tasks))
              }
              else if(postType === "lesson") {
                localStorage.setItem('seenLessons', JSON.stringify(response.data.lessons))
              }
              else if(postType === "article") {
                localStorage.setItem('seenArticles', JSON.stringify(response.data.articles))
              }
              else if(postType === "news") {
                localStorage.setItem('seenNews', JSON.stringify(response.data.news))
              }
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      },
      beforeMount: function(){
        this.$root.postIsOpen = true;
        let lastRoute = sessionStorage.getItem('currentRoute');
        sessionStorage.setItem('lastRoute', lastRoute);
      },
      destroyed: function () {
        this.$root.postIsOpen = false;
      }
    }
</script>

<style scoped lang="scss">
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

  .body, .content-container, .content-header, .content-body, .content-footer,
  .info-block, .post-seen-block, .post-rate-block, .news-importance-block, .post-name-block, .post-text-block,
  .post-description-block, .code-editor-container, .left-panel, .line-number, .main-editor, .editor, .arrows-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .body{
    /*height: 90vh;*/
    width: 87vw;
    justify-content: center;
    /*overflow-y: auto;*/
  }

  .content-container{
    /*height: 90vh;*/
    width: 85vw;
    align-content: baseline;
  }

  .content-header{
    width: 83vw;
    height: 8vh;
    justify-content: flex-end;
    align-items: center;
  }

  .back-btn{
    @media all{
      height: width/2;
    }
    /*margin-left: 50px;*/
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 5vh;
    width: 2.5vw;
    border-radius: 50%;
    background: #82858c;
  }

  .back-btn:hover{
    transform: scale(1.15);
    transition: .3s all;
    z-index: 10000000;
    cursor: pointer;
    background: rgba(126, 215, 118, 0.1);
    box-shadow: 0 2px 20px 2px rgb(140, 211, 215);
  }

  .icon{
    margin: auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 60%;
    max-height: 60%;
    transform: scale(-1, 1);
  }

  .info-block{
    width: 80vw;
    justify-content: space-between;
  }

  .post-type-block{
    font-size: 3rem;
    color: #9e9e9e;
    margin-right: 1vw;
  }

  .post-seen-block, .news-importance-block{
    height: 6vh;
    width: 10vw;
    justify-content: center;
    align-items: flex-end;
    font-size: 1rem;
    color: #9e9e9e;
    margin-right: 1vw;
  }

  .news-importance-block{
    width: 15vw;
  }

  .content-body{
    width: 85vw;
    min-height: 90vh;
    height: auto;
    /*height: 100%;*/
    /*justify-content: center;*/
    align-content: baseline;
  }

  .post-name-block{
    width: 80vw;
    /*height: 2em;*/
    font-size: 4rem;
    /*background: rgba(191, 191, 191, 0.27);*/
    background: white;
    align-items: center;
    /*border-bottom: solid 10px #bfbfbf;*/
  }

  .post-description-block{
    margin-top: 1vh;
    padding-right: 0.5vw;
    padding-left: 0.5vw;
    width: 71vw;
    /*height: 15vh;*/
    font-size: 0.9em;
    /*border-bottom: solid 10px #bfbfbf;*/
    /*justify-content: center;*/
    /*background: rgba(191, 191, 191, 0.27);*/
    background: white;
    align-items: center;
    /*background: aqua;*/
  }


  .post-text-block{
    margin-top: 1vh;
    padding-right: 0.5vw;
    padding-left: 0.5vw;
    width: 71vw;
    height: auto;
    font-size: 0.9rem;
    /*background: rgba(191, 191, 191, 0.27);*/
    background: white;
  }

  .content-footer{
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .post-rate-block{
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;

    height: 6vh;
    width: auto;
    justify-content: baseline;
    align-items: center;
    font-size: 1.7rem;
    color: #9e9e9e;
    margin-right: 1vw;

  }

  .arrows-container{
    margin-left: 0.7vw;
    max-height: 100%;
    max-width: 100%;
    /*justify-content: center;*/
    align-items: flex-end;
    height: 6vh;
    width: 2vw;
  }

  .rate-btn{
    width: 27px;
    height: 27px;
    border-radius: 50%;
  }

  .rate-btn-reverse{
    transform: scale(1, -1);
  }

  .rate-btn:hover{
    background: rgba(241, 255, 253, 0.18);
    transform: scale(1.3);
    transition: .3s all;
    z-index: 10000000;
    cursor: pointer;
  }

  .rate-btn-reverse:hover{
    transform: scale(1.3, -1);
  }

  .content-footer{
    width: 85vw;
  }

  .test{
    width: 10vw;
    height: 5vh;
  }


  .code-editor-container{
    margin-top: 10px;
    width: 71vw;
    height: 60vh;
    /*background: white;*/

    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
    /*overflow-y: auto;*/
  }
</style>
