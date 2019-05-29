<template>
  <div class="create-components-form-container">
  <!--<div class="container">-->
    <div class="header">
      <div class="back-btn waves-effect waves-dark" v-if="isUpdate">
        <img src="../../../assets/png/back_arrow2.png" class="icon" @click="emitReturn">
      </div>
      <!--ARTICLES-->
      <div class="optional-container" v-if="isArticle">
        <!--<p>Выберите язык программирования</p>-->
        <label for="sel1">Выберите язык программирования: </label>
        <select id="sel1" class="custom-select">
          <!--тут определяются языки программировпния в селекте-->
          <option v-for="lang in this.$root.langsName" :key="lang.lang_id" :value="lang.lang_name">
            {{lang.lang_name}}
          </option>
        </select>
        <label v-if="isUpdate">Текущий язык: {{reqLangName}}</label>
        <div class="quest-mark-icon tooltip">
          <img src="../../../assets/png/question_mark.png" class="icon qm">
          <span class="tooltiptext">Этот параметр обязателен.</span>
        </div>
      </div>

      <!--NEWS-->
      <div class="optional-container" v-else>
        <label for="sel2">Выберите уровень важности: </label>
        <select id="sel2" class="custom-select">
          <option v-for="item in importance" :key="item.id" :value="item.name">
            {{item.name}}
          </option>
        </select>
        <label v-if="isUpdate">Текущая важность новости: {{this.importance[reqNewsImportance].name}}</label>
        <div class="quest-mark-icon tooltip">
          <img src="../../../assets/png/question_mark.png" class="icon qm">
          <span class="tooltiptext">Этот параметр опционален. В зависимости от выбора важности, новость будет по разному отображаться.
          К примеру если выбрать "Критически важно", новость будет подсвечиваться красным цветом в блоке новостей.
          </span>
        </div>
      </div>
    </div>
    <div class="main-content-container">
      <form @submit.prevent="sendPost" class="custom-form">
        <!--Names-->
        <label v-if="isUpdate">Введите название</label>
        <input type="text" v-if="isArticle" v-model="postName" placeholder="Введите название статьи" class="custom-input-name-field">
        <input type="text" v-else v-model="postName" placeholder="Введите название новости" class="custom-input-name-field">

        <!--tags-->
        <div class="tags-input-container">
          <input type="text" placeholder="Введите тег" class="tags-input" id="tagInput" v-model="tag">
          <div class="plus-btn-container">
            <div class="plus-btn" @click="addTag">
              <img src="../../../assets/png/plus.png" class="plus-btn-icon"/>
            </div>
          </div>
         <div class="tags-container">
           <span v-for="(tag, index) in postTags"
                 :key="tag.id" class="tag"
                 v-on:click="postTags.splice(index, 1)">{{'#'+tag.name}}&nbsp;
           </span>
         </div>
        </div>

        <!--Contents-->
        <div class="limiter">
          <div class="desc-textarea-container">
            <label v-if="isUpdate">Введите описание</label>
            <textarea v-if="isArticle" v-model="postDescription" placeholder="Введите описание статьи" class="desc-textarea"></textarea>
            <textarea v-else v-model="postDescription" placeholder="Введите описание новости" class="desc-textarea"></textarea>
          </div>

          <div class="article-text-textarea-container">
            <div class="article-text-textarea-container-header">

            </div>
            <label v-if="isUpdate">Введите текст</label>
            <textarea v-if="isArticle" v-model="postText" placeholder="Введите текст вашей статьи" class="article-text-textarea"></textarea>
            <textarea v-else v-model="postText" placeholder="Введите текст вашей новости" class="article-text-textarea"></textarea>
          </div>

          <button class="button waves-effect waves-dark" v-if="!isUpdate">Создать</button>
          <button class="button waves-effect waves-dark" v-else-if="isUpdate">Обновить</button>
          <!--<button @click="this.test"> fff</button>-->
        </div>
      </form>
    </div>
    <create-error-modal-component :isArticle = "isArticle"
                                  :isNews = "isNews"

                                  :namePost="emptyName"
                                  :descPost="emptyDesc"
                                  :textPost="emptyText"
                                  :langPost="emptyLang"

                                  :errorModalActive="errorModalActive"
                                  @close="closeError">
    </create-error-modal-component>
  </div>
</template>

<script>
  import axios from 'axios'
  import CreateErrorModalComponent from "../../ModalWindows/CreateErrorModalComponent";
  import regeneratorRuntime from "regenerator-runtime";

    export default {
        name: "create-post-component",
        components:{
          CreateErrorModalComponent
        },
        props: {
          isArticle: Boolean,
          isNews: Boolean,

          isUpdate: {
            type: Boolean
          },

          reqPostId:{
            type: Number
          },
          reqPostName: {
            type: String
          },
          reqPostDescription: {
            type: String
          },
          reqPostText: {
            type: String
          },
          reqPostTags: {
            type: Array
          },
          reqNextPostTag: {

          },

          reqLangId:{
            type: Number
          },
          reqLangName:{
            type: String
          },

          reqNewsImportance: {
            type: Number
          },
        },
      data() {
        return {
          toastText: '',
          //response

          errorModalActive: false,
          emptyName: true,
          emptyDesc: true,
          emptyText: true,
          emptyLang: true,

          //название статьи/новости
          postName: '',
          //переменные для тэгов
          tag: '',
          nextTag: '',
          postTags: [],
          //описание статьи/новости
          postDescription: '',
          //text сама статья/новость
          postText: '',

          //for news
          importance: [
            {id: 1, name: "Не важно"},
            {id: 2, name: "Важно"},
            {id: 3, name: "Очень важно"},
            {id: 4, name: "Критически важно"},
          ],
        }
          },
      methods: {
        emitReturn() {
          this.$emit('returns')
        },

        test(){
          console.log(this.postText)
        },

        closeError() {
          this.errorModalActive = false;
          this.emptyName = true;
          this.emptyDesc = true;
          this.emptyText = true;
          this.emptyLang = true;
        },

        async sendPost() {
          //debug
          if (this.isArticle) {
            console.log('article')
          } else if (this.isNews) {
            console.log('news')
          }
          if (this.postName.length === 0 || this.postDescription.length === 0 ||
            this.postText.length === 0) {
            if (this.postName.length !== 0) {
              this.emptyName = false
            }
            if (this.postDescription.length !== 0) {
              this.emptyDesc = false
            }
            if (this.postText.length !== 0) {
              this.emptyText = false
            }
            // if (this.isArticle && document.getElementById("sel1").options.selectedIndex !== 0) {
            //   this.emptyLang = false
            // }
            //show modal with error
            this.errorModalActive = true;
          } else {
            let body = {};
            //составляем тело ответа
            //определяем значение параметров lang and userName
            // let selectedIndexSel1 = document.getElementById("sel1").options.selectedIndex;
            let lang = '';
            let selectedIndex ='';

            if (this.isArticle){
              lang = document.getElementById("sel1").value;
            }
            if (this.isNews){
              selectedIndex = document.getElementById("sel2").options.selectedIndex;
            }
            // const importance = document.getElementById("sel2").options[selectedIndex].value;
            if (this.isArticle && !this.isUpdate) {
              body = {
                lang: lang,
                authorEmail: this.$root.authUser.email,
                articleName: this.postName,
                articleDescription: this.postDescription,
                articleText: this.postText,
                articleTags: this.postTags
              };
            } else if(this.isNews && !this.isUpdate) {
              body = {
                importance: selectedIndex,
                authorEmail: this.$root.authUser.email,
                newsName: this.postName,
                newsDescription: this.postDescription,
                newsText: this.postText,
                newsTags: this.postTags
              };
            } else if (this.isArticle && this.isUpdate){
              body = {
                lang: lang,
                // authorEmail: this.$root.authUser.email,
                articleId: this.reqPostId,
                articleName: this.postName,
                articleDescription: this.postDescription,
                articleText: this.postText,
                articleTags: this.postTags
              };
            }else if(this.isNews && this.isUpdate){
              body = {
                importance: selectedIndex,
                // authorEmail: this.$root.authUser.email,
                newsId: this.reqPostId,
                newsName: this.postName,
                newsDescription: this.postDescription,
                newsText: this.postText,
                newsTags: this.postTags
              };
            }
            //создаем json
            let self = this;
            const jBody = JSON.stringify(body);
            //TODO сделать оповещание о том успешно/неуспешно создана/обновлена/удалена пост
            if (this.isArticle && !this.isUpdate) {
              await axios.post(this.$root.URL+'addArticle', jBody).then((response) => {
                console.log(response);
                let resp = response.data.msg;

                if (resp === true){
                  self.toastText = '<span>Статья была успешно добавлена</span>';
                  M.toast({html: self.toastText, classes: 'rounded success'});
                  self.emitReturn()
                } else if (resp.err_code === '23505') {
                  console.log(resp.err_code);
                  self.toastText = '<span>Статья не была добавлена.&nbsp;</span>'+resp.err_info;
                  M.toast({html: self.toastText, classes: 'rounded warning'});
                }
                // M.toast({html: self.toastText, classes: 'rounded'});
              }).catch((error) => {
                console.log(error);
              });
            } else if (this.isNews && !this.isUpdate) {
              await axios.post(this.$root.URL+'addNews', jBody).then((response) => {
                let resp = response.data.msg;
                console.log(response);
                if (resp === true){
                  self.toastText = '<span>Новость была успешно добавлена</span>';
                  M.toast({html: self.toastText, classes: 'rounded success'});
                  self.emitReturn()
                } else if (resp.err_code === '23505') {
                  console.log(resp.err_code);
                  self.toastText = '<span>Новость не была добавлена.&nbsp;</span>'+resp.err_info;
                  M.toast({html: self.toastText, classes: 'rounded warning'});
                }
              }).catch((error) => {
                console.log(error);
              });
            } else if (this.isArticle && this.isUpdate){
              await axios.post(this.$root.URL+'updateUserArticle', jBody).then((response) => {
                let resp = response.data.msg;
                console.log(response);
                if (resp === true){
                  self.toastText = '<span>Статья была успешно обновлена</span>';
                  M.toast({html: self.toastText, classes: 'rounded success'});
                  self.emitReturn()
                } else if (resp.err_code === '23505') {
                  console.log(resp.err_code);
                  self.toastText = '<span>Статья не была обновлена.&nbsp;</span>'+resp.err_info;
                  M.toast({html: self.toastText, classes: 'rounded warning'});
                } else if (resp === 'identical'){
                  self.toastText = '<span>Статья идентичная</span>';
                  M.toast({html: self.toastText, classes: 'rounded success'});
                  self.emitReturn()
                }
              }).catch((error) => {
                console.log(error);
              });
            }else if(this.isNews && this.isUpdate){
              await axios.post(this.$root.URL+'updateUserNews', jBody).then((response) => {
                let resp = response.data.msg;
                console.log(response);
                if (resp === true){
                  self.toastText = '<span>Новость была успешно обновлена</span>';
                  M.toast({html: self.toastText, classes: 'rounded success'});
                  self.emitReturn()
                } else if (resp.err_code === '23505') {
                  console.log(resp.err_code);
                  self.toastText = '<span>Новость не была обновлена.&nbsp;</span>'+resp.err_info;
                  M.toast({html: self.toastText, classes: 'rounded warning'});
                }
              }).catch((error) => {
                console.log(error);
              });
            }
          }
        },

        addTag() {
          if (this.tag.length === 0) {
            alert("Невозможно добавить пустой тэг")
          } else {
            if (this.checkTags()) {
              this.postTags.push(
                {
                  id: this.nextTag++,
                  name: this.tag
                });
              this.tag = ''
            }
          }
        },

        checkTags() {
          let check = true;
          for (let curTag in this.postTags) {
            if (this.postTags[curTag].name === this.tag) {
              check = false;
              break;
            }
          }
          return check;
        },
      },

      mounted(){
        //  если это обновление поста, то получаю данные из переданных переменных
        if(this.isUpdate){
          this.postName = this.reqPostName;
          this.postDescription = this.reqPostDescription;
          this.postText = this.reqPostText;
          this.postTags = this.reqPostTags;
          this.nextTag = this.reqNextPostTag+1;
        }
        if(this.isArticle && this.isUpdate){
          document.getElementById("sel1").value = this.reqLangName;
        }
        if(this.isNews && this.isUpdate){
          document.getElementById("sel2").value = this.importance[this.reqNewsImportance].name;
        }
      }
    }
</script>

<style scoped lang="scss">

  .desc-textarea-container, .article-text-textarea-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .article-text-textarea-container-header{
    display: -webkit-flex;
    -webkit-flex-wrap: nowrap;
    display: flex;
    flex-wrap: nowrap;
    height: 5vh;
    width: 100%;
    border: solid 1px rgb(169, 169, 169);
    margin-bottom: 0.4px;
    /*background: red;*/
  }

  .article-text-textarea-container{
    padding: 5px;
    background: rgba(145, 145, 145, 0.16);
    /*height: 40vh;*/
    align-content: baseline;
  }

  .desc-textarea-container{
    margin-bottom: 1rem;
  }

  .article-text-textarea{
    max-width: 100%;
    /*max-height: 34vh;*/
    min-width: 100%;
    min-height: 34vh;
    padding: 0.9rem;
  }

  .desc-textarea{
    max-width: 100%;
    /*max-height: 10vh;*/
    min-width: 100%;
    min-height: 10vh;
    padding: 0.9rem;
  }

  label{
    font-size: large;
    margin: 1vh 2px 0 0;
  }
  .create-components-form-container{
    @media (max-width: 1200px) {
      /*width: 1vw;*/
      /*height: 60vh;*/
    }
    @media (max-width: 900px) {
      /*width: 19vw;*/
      /*height: 50vh;*/
    }
    position: relative;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    /*height: 80vh;*/
    justify-content: center;
    align-items: center;
    /*background: aqua;*/
    /*z-index: 100000;*/
  }

  .main-content-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    /*height: 70vh;*/
    width: 100%;
    justify-content: center;
    /*padding: 0 115px 0 115px !important;*/
  }

  .custom-form{
    width: 100%!important;
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
    height: 50px;
    width: 50px;
    transform: rotate(-180deg);
    border-radius: 50%;
    background: #82858c;
    margin-right: 50px;
  }

  .back-btn:hover{
    transition: .3s all;
    z-index: 10000000;
    cursor: pointer;
    transform: rotate(-180deg);
    background: rgba(126, 215, 118, 0.1);
    box-shadow: 0 2px 10px 2px rgb(140, 211, 215);
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

  .header{
    margin-top: 50px;
    width: 100%;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    /*justify-content: flex-end;*/
  }

  .button{
    width: 10vw;
    /*height: 100%;*/
    height: 4vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
    margin: 2.5vh 0 30px 0;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .custom-input-name-field{
    width: 100% !important;
    height: auto !important;
    font-size: 3vw !important;
  }

  .limiter{
    /*max-width: 70vw;*/
    margin: 15px 0 0 0;
  }


  /*scrollbar*/
  ::-webkit-scrollbar {
    width: 1em;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px 0 rgba(0,0,0,0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .optional-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    /*width: 100%;*/
    height: 100%;

    justify-content: flex-start;
  }

  .custom-select{
    /*@media screen and (max-width: 900px){*/
      /*width: 20vw;*/
      /*height: 3vh !important;*/
      /*font-size: 1.5vh;*/
    /*}*/
    display: -webkit-flex !important;
    -webkit-flex-wrap: wrap !important;
    display: flex !important;
    flex-wrap: wrap !important;
    width: 20vw !important;
    font-size: 1.5rem;
  }

  .quest-mark-icon{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    width: 1vw;
    height: 2vh;
    border-radius: 50%;
  }

  .quest-mark-icon:hover{
    background: rgba(0, 0, 0, 0.31);
    cursor: pointer;
    /*box-shadow: 0 2px 20px 2px rgb(140, 211, 215);*/
  }

  .qm{
    margin: auto;
    transform: scale(1, 1) !important;
  }

  .tooltip .tooltiptext {
    @media screen and (max-width: 1200px){
      width: 20vw;
      height: 7vh;
    }
    visibility: hidden;
    width: 30vw;
    height: 5.4vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 5px 0;
    font-size: 10px;
    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .tooltiptext::after {
    @media screen and (max-width: 1200px){
      left: -20px; bottom: 41px; /* Положение треугольника */
    }
    content: '';
    position: absolute; /* Абсолютное позиционирование */
    left: -20px; bottom: 31px; /* Положение треугольника */
    border: 10px solid transparent; /* Прозрачные границы */
    border-right: 10px solid rgba(0, 0, 0, 0.5); /* Добавляем треугольник */
  }

  .tooltip:hover .tooltiptext {
    transition: all .3s ease;
    opacity: 1;
    transform: translateX(30px);
    visibility: visible;
  }

  .tags-input-container{
    width: 100%;
    height: 5vh;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .tags-input{
    width: 21vw !important;
  }

  .plus-btn-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 3vw;
    height: 5vh;

    justify-content: center;
    align-items: center;
  }

  .plus-btn{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    width: 1.5vw;
    height: 3vh;
    border-radius: 50%;
  }

  .plus-btn:hover{
    transition: .3s all;
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    /*box-shadow: 0 2px 20px 2px rgb(140, 211, 215);*/
    transform: scale(1.25);
  }

  .plus-btn-icon{
    margin: auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    max-height: 100%;
  }

  .tags-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    height: 5vh;
    max-width: 46vw;
    word-break: break-all;
    overflow-y: auto;

    align-items: center;
  }

  .tag{
    height: 1.5vh;
    color: #006dff;
  }

  .tag:hover{
    cursor: pointer;
  }
</style>
