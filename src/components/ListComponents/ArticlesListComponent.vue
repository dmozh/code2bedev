<template>
    <div>
      <div class="cards-container">
        <div class="card-basic"
             v-for="elem in response"
             :key="elem.article_id">
          <div class="card-basic-content">
            <div class="card-basic-header">
              {{elem.article_name}}
            </div>
            <div class="card-basic-body">
              {{elem.article_description}}
            </div>
            <div class="card-basic-footer">
              <button class="button"
                      @click="openPost('article', elem.article_id)">
                Открыть статью</button>
              <div>Рейтинг статьи: {{elem.article_rate}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import regeneratorRuntime from "regenerator-runtime";
    export default {
      name: "articles-list-component",
      data () {
        return {
          isOpenPost: false,
          response: '',
        }
      },
      methods: {
        openPost(postType, postId){
          let body = {
            postId: postId,
            postType: postType,
          };
          const jBody = JSON.stringify(body);
          const base64 = Buffer.from(jBody).toString("base64");
          this.$router.push({name: 'post',
            params:{postsType: this.$route.name, type: postType, params: base64}});
        },

        getPosts(){

          let body = {
            lang: this.$root.activeLang,
          };
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'getArticles', jBody).then((response) => {
            this.response = response.data.articles;
            // console.log(response);
          }).catch((error) => {
            console.log(error);});
        },
      },
      mounted: function () {
        this.$root.offAll();
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);
        this.getPosts()
      },
      beforeMount: function(){
        let lastRoute = sessionStorage.getItem('currentRoute');
        sessionStorage.setItem('lastRoute', lastRoute);
      },
    }
</script>

<style scoped>
  .cards-container, .card-basic, .card-basic-content, .card-basic-header, .card-basic-body{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }
  /*TODO Сделать уникальный дизайн*/
  .cards-container{
    width: 70vw;
    height: 90%;
    align-content: baseline;
    /*justify-content: space-evenly;*/

    overflow-y: auto;
  }

  .card-basic{
    width: 30vw;
    height: 22vh;

    margin: 1vh 0.5vw 1vh 0.5vw;
    background: rgba(193, 196, 202, 0.63);
    border-radius: 2px;

    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.49);
  }

  .card-basic-content{
    width: 100%;
  }

  .card-basic-header{
    width: 100%;
    height: 6vh;

    font-size: 1.5rem;
    padding-left: 5px;
    /*TODO если текст не помещается в заданную область необходимо обрезать и добавлять многоточие доделать
      TODO
    */
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*word-break: break-all;*/
  }

  .card-basic-body{
    width: 100%;
    height: 10vh;
    font-size: 1rem;
    /*margin: 0 auto;*/
    padding-left: 5px;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
  }

  .card-basic-footer{
    width: 100%;
    height: 6vh;
    align-items: center;
    justify-content: space-around;
    font-size: 0.6rem;
  }

  .button{
    font-size: 15px !important;
    width: 40%;
    /*height: 100%;*/
    height: 3vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }
</style>
