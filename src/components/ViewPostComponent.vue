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
              Просмотрено: 0 раз
            </div>
            <div class="post-rate-block">
              Рейтинг: {{this.postRate}}
            </div>
            <div v-if="this.postType==='news'"
              class="news-importance-block">
              <div v-if="this.newsImportance      === 0">Важность новости: Не важно</div>
              <div v-else-if="this.newsImportance === 1">Важность новости: Важно</div>
              <div v-else-if="this.newsImportance === 2">Важность новости: Очень важно</div>
              <div v-else-if="this.newsImportance === 3">Важность новости: Критически важно</div>
            </div>
          </div>
          <div class="back-btn waves-effect waves-dark" @click="emitReturn">
            <img src="@/assets/png/back_arrow2.png" class="icon" @click="emitReturn">
          </div>
        </div>
        <div class="content-body">
          <div class="post-name-block">{{this.postName}}</div>
          <div class="post-description-block">{{this.postDescription}}</div>
          <div class="post-text-block"></div>
          <div v-if="this.postType==='task'">
            <code-editor-component v-if="this.haveLang"
                                   :place="this.postType"
                                   :lang="this.activeLang"
                                   :theme="this.theme"
            ></code-editor-component>
          </div>
        </div>
      </div>

      <div class="content-footer"></div>
    </div>
</template>

<script>
  // import ace from 'ace-builds/src-noconflict/ace.js'
  import axios from 'axios'
  // import "ace-builds/webpack-resolver"
  import CodeEditorComponent from './CodeEditorComponent'



    export default {
      components: {
        CodeEditorComponent
      },
      name: "view-post-component",
      props: {
        postId: {
          type: Number
        },
        postName: {
          type: String
        },
        postDescription: {
          type: String
        },
        // postText: {
        //   type: String
        // },
        postType: {
          type: String
        },
        postRate: {
          type: Number
        },
        newsImportance:{
          type: Number
        }
      },
      data(){
        return{
          activeLang: null,
          theme: 'eclipse',
          haveLang: false,

          userSeenPost: null,


        }
      },

      methods: {
        emitReturn() {
          this.$emit('returns')
        },

        isSeen(){
          // this.userSeenPost = localStorage
          // if()
        }
      },

      mounted: function () {
        this.activeLang = localStorage.getItem('activeLang');
        if(this.activeLang !== null){
          this.haveLang = true;
        }
        // console.log(this.postType);
        let body = {
            type: this.postType,
            id: this.postId,
          };
        const jBody = JSON.stringify(body);
        axios.post('http://localhost:8080/getPostText', jBody).then((response) => {
          this.postText = response.data.post_text;
          let parentElem = document.getElementsByClassName('post-text-block');
          parentElem[0].insertAdjacentHTML('afterbegin', this.postText);
          // console.log(parentElem);
          // console.log(response);
          }).catch((error) => {
            console.log(error);
        });

        // let postId = this.postId;
        // console.log(postId);
        // if(this.postType === 'task'){
        //   let tasks = JSON.parse(localStorage.getItem('seenTasks'));
        //   delete localStorage['seenTasks'];
          // console.log(tasks);
          // for(let i=0; i<tasks.length;i++){
          //   if(tasks[i].task_id === postId){
          //     console.log('true');
          //     break;
          //   }else{
          //     tasks[tasks.length] = {
          //       user_id: tasks[i].user_id,
          //       task_id: postId,
          //       isSeen: true,
          //       isDecided: false
          //     };
          //     localStorage['seenTasks'] = JSON.stringify(tasks);
          //   }
          // }
          // console.log(tasks);
        // }
        // console.log(tasks);
        // console.log(localStorage['seenTasks'])
      },


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
  .post-description-block, .code-editor-container, .left-panel, .line-number, .main-editor, .editor{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .body{
    height: 90vh;
    width: 87vw;
    justify-content: center;
    /*overflow-y: auto;*/
  }

  .content-container{
    height: 90vh;
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

  .post-seen-block, .post-rate-block, .news-importance-block{
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
