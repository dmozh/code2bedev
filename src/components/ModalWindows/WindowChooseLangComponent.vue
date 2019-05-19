<template>
  <transition name="modal">
    <div class="modal-mask" v-if="windowChooseLangModalActive">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="close-btn">
              <img src="../../assets/png/close-btn.png" class="pic" @click="emitClose">
            </div>
            <div class="content-container">
              <div class="left-container">
                <div class="lang-block"
                     v-if="langs"
                     v-for="(lang) in langs"
                     v-bind:key="lang.lang_id"
                     @click="showInfo(lang.lang_id, lang.lang_name)">
                  <div class="inner" v-if="lang.lang_name==='Python3'"
                  v-bind:class="{active_tab: activePythonTab}">
                    {{lang.lang_name}}
                  </div>

                  <div class="inner" v-else-if="lang.lang_name==='Java'"
                       v-bind:class="{active_tab: activeJavaTab}">
                    {{lang.lang_name}}
                  </div>

                </div>
              </div>
              <div class="right-container">
                <div class="lang-info" v-if="this.activeDesc">{{this.activeDesc}}
                  <div class="btn-container">
                    <button class="button" @click="chooseLang">Выбрать</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios';
  import regeneratorRuntime from "regenerator-runtime";
    export default {
      name: "window-choose-langs-component",

      data() {
        return {
          activePythonTab: false,
          activeJavaTab: false,

          langs: null,
          activeDesc: '',
        }
      },
      props: {
        windowChooseLangModalActive: {
          type: Boolean
        },
      },
      methods: {

        emitClose() {
          // this.$root.activeLang = null;
          this.$emit('close')
        },
        async getLangsInfo(){
          await axios.get(this.$root.URL+'getLangs').then(response=>{
            this.langs = response.data.langs;
          });
          if(sessionStorage.getItem('activeLang') && sessionStorage.getItem('activeLangId')){
            if      (sessionStorage.getItem('activeLang') === 'Python3'){
              this.activePythonTab = true;
              this.activeJavaTab = false;
            }else if(sessionStorage.getItem('activeLang') === 'Java')   {
              this.activePythonTab = false;
              this.activeJavaTab = true;
            }
            this.activeDesc = this.langs[sessionStorage.getItem('activeLangId')-1].lang_description;
          }
        },

        showInfo: function(id, name){
          this.$root.activeLangId = id;
          this.activeDesc = this.langs[id-1].lang_description;
          if      (name === 'Python3'){
            this.activePythonTab = true;
            this.activeJavaTab = false;
          }else if(name === 'Java')   {
            this.activePythonTab = false;
            this.activeJavaTab = true;
          }
          // event.target.classList += ' active_tab';
        },

        chooseLang(){
          this.$root.activeLang = this.langs[this.$root.activeLangId-1].lang_name;
          sessionStorage.setItem('activeLang', this.$root.activeLang);
          sessionStorage.setItem('activeLangId', this.$root.activeLangId);
          this.$emit('close')
        }
      },

      mounted: function(){
        if (this.langs === null){
          this.getLangsInfo()
        }
      }
    }
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    transition: opacity .3s ease;
    justify-content: center;
  }

  .modal-wrapper {
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    vertical-align: middle;
    margin: auto;
    border-radius: 35px;
  }

  .modal-container {
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 70vh;
    width: 80vw;
    margin: 0 auto;
    /*padding: 20px 30px;*/
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    justify-content: center;

  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }


  .pic{
    margin: auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 60%;
    max-height: 60%;
  }

  .modal-header{
    width: 95%;
    height: 5vh;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .close-btn{
    border-radius: 50%;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 5vh;
    width: 2.5vw;
  }
  .close-btn:hover{
    transform: scale(1.15);
    transition: .3s all;
    z-index: 10001;
    cursor: pointer;
    /*background: rgba(152, 152, 152, 0.61);*/
    /*box-shadow: 0 2px 20px 2px rgb(140, 211, 215);*/
  }


  .content-container, .left-container, .right-container{
    display: -webkit-flex;
    display: flex;
    height: 65vh;
  }

  .content-container{
    width: 100vw;
  }

  .left-container{
    width: 40vw;
    /*background: aqua;*/
    flex-wrap: wrap;
  }

  .right-container{
    width: 30vw;
    /*background: blue;*/
  }

  .lang-block, .inner{
    display: flex;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: aliceblue;
  }

  .lang-block{
    margin: 1vw;
  }

  .inner{
    width: 100%;
    height: 100%;
  }

  .lang-block:hover{
    transform: scale(1.15);
    transition: .2s all;
    z-index: 10000000;
    cursor: pointer;
    box-shadow: 0 2px 20px 2px rgb(140, 215, 189);
  }

  .lang-info{
    display: flex;
    flex-wrap: wrap;
    width: 30vw;
    height: 40vh;
    text-align: center;
  }

  .btn-container{
    display: flex;

    width: 30vw;
    justify-content: center;
    align-items: center;
  }

  .button{
    width: 100%;
    /*height: 100%;*/
    height: 4vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
    margin: 25vh 0 0 0;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .active_tab{
    width: 115%;
    height: 105%;
    transform: scale(1.1);
    transition: .2s all;
    z-index: 1000;
    background: rgb(174, 255, 218);
    box-shadow: 0 2px 20px 2px rgb(134, 255, 158);
  }

</style>
