<template>
  <div class="code-editor-container">
    <div class="main">
      <div class="header-editor-container">
        <div class="btn-container">
          <img id="exec-btn" @click="execute(false)" src="../assets/png/exec_btn.png" v-if="!isExecute">
          <div class="cen" v-else>
            <div class="preloader-wrapper big active">
              <div class="spinner-layer spinner-blue">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
              </div>

              <div class="spinner-layer spinner-red">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
              </div>

              <div class="spinner-layer spinner-yellow">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
              </div>

              <div class="spinner-layer spinner-green">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="editor"></div>
      <div class="input-container">
        <textarea class="input-area" placeholder="Введите сюда stdin" v-model="inputData"></textarea>
        <textarea class="output-area" placeholder="Здесь отобразится stdout" disabled v-model="outputData"></textarea>
      </div>
    </div>
    <button class="btn s" @click="validCheck" v-if="this.place==='task' && !isExecute">Проверить</button>
    <!--<div class="output-container">-->
      <!--<div style="width: 21vw; height: 3vh; background: white; display: flex; justify-content: center; align-items: center;" >-->
        <!--<button class="button" @click="validCheck" v-if="this.place==='task'">Проверить</button>-->
      <!--</div>-->
      <!--<textarea class="output-area" placeholder="Здесь отобразится stdout"-->
                <!--disabled v-model="outputData"></textarea>-->
    <!--</div>-->
  </div>
</template>

<script>
  import ace from 'ace-builds/src-noconflict/ace.js'
  import axios from 'axios'
  import "ace-builds/webpack-resolver"
  import regeneratorRuntime from "regenerator-runtime";

  export default {
    name: "code-editor-component",
    props: {
      place: {
        type: String
      },
      theme: {
        type: String
      },
      lang: {
        type: String
      },

      taskId: {
        type: Number
      },
      testInput: {
        type: String
      },
      expectedOutput: {
        type: String
      },
    },
    data(){
      return{
        mode: '',
        baseValue: '',
        editor: Object,

        code: '',
        inputData: '',

        outputData: '',

        isExecute: false,

        executing: false,
      }
    },

    methods: {
      async execute(isCheck){
        this.outputData = '';

        this.isExecute = true;
        this.code = this.editor.getValue();

        let body = {};
        if(isCheck) {
          const userId = localStorage.getItem('userID');
          const postId = this.taskId;

          body = {
            code: this.code,
            lang: this.lang,
            input: this.inputData,
            expectedOutput: this.expectedOutput,
            userId: userId,
            postId: postId
          };
        }else{
          body = {
            code: this.code,
            lang: this.lang,
            input: this.inputData
          };
        }
        let self = this;
        const jBody = JSON.stringify(body);
        if(!isCheck){
          await axios.post(this.$root.URL+'executeCode', jBody).then((response) => {
            this.outputData = response.data.output;
            self.isExecute = false;
            console.log(response)
          }).catch((error) => {
            console.log(error);
          });
        }else{

          await axios.post(this.$root.URL+'checkExecuteCode', jBody).then((response) => {
            this.outputData = response.data.output;
            self.isExecute = false;
            if (response.data.isDecided){
              let toastText = '<span>Поздравляю, тестовые данные и ожидаемые выходные данные сошлись</span>';
              M.toast({html: toastText, classes: 'rounded success'});
            }else {
              let toastText = '<span>Сожалею :(<br>Данные не сошлись, попробуйте еще раз</span>';
              M.toast({html: toastText, classes: 'rounded warning'});
            }
            console.log(response)
          }).catch((error) => {
            console.log(error);
          });
        }

      },

      validCheck(){
        this.inputData = this.testInput;
        this.execute(true)
      }
    },

    mounted: function(){
      // console.log(this.expectedOutput);
      // console.log(this.lang, this.place, this.theme);
      if(this.lang === "Python3"){
        this.mode = 'python'
      }else if(this.lang === "Java"){
        this.mode = 'java';
        this.baseValue = '/* package whatever; // don\'t place package name! */\n' +
          '\n' +
          'import java.util.*;\n' +
          'import java.lang.*;\n' +
          'import java.io.*;\n' +
          '\n' +
          '/* Name of the class has to be "Main" only if the class is public. */\n' +
          'public class ' +'Ltl '+'\n' +
          '{\n' +
          '\tpublic static void main (String[] args) throws java.lang.Exception\n' +
          '\t{\n' +
          '\t\t// your code goes here\n' +
          '\t}\n' +
          '}'
      }

      this.editor = ace.edit("editor");
      this.editor.setTheme("ace/theme/"+this.theme);
      this.editor.session.setMode("ace/mode/"+this.mode);
      this.editor.setValue(this.baseValue)
    },

    updated: function () {

    },

    destroyed: function () {
      this.$root.compilerIsOpen = false;
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

  .code-editor-container, .input-container, .input-area, .header-editor-container, .btn-container, .main{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .code-editor-container{
    width: 100%;
    /*height: 60vh;*/
    /*background: red;*/
    align-content: baseline;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }

  .header-editor-container{
    width: 100%;
    height: 50px;
    background: white;
    justify-content: flex-end;
  }

  .btn-container{
    height: 40px;
    /*width: 30px;*/
    background: rgba(199, 199, 199, 0.41);

    align-items: center;
    justify-content: center;
  }

  #exec-btn{
    max-width: 80%;
    max-height: 80%;
  }
  #exec-btn:hover{
    cursor: pointer;
    transform: scale(1.15);
    transition: .2s all;
  }

  .main{
    width: 85%;
    align-content: baseline;
  }

  .input-container{
    background: white;
    /*margin-left: 40px;*/
    width: 100%;
    /*height: 12vh;*/
  }

  .input-area{
    min-width: 50%;
    min-height: 12vh;
    max-width: 50%;
    /*max-height: 12vh;*/
    /*border: none;*/
  }

  .output-container{
    width: 21vw;
    height: 60vh;
    background: white;
  }

  .output-area{
    min-width: 50%;
    min-height: 12vh;
    max-width: 50%;
    /*max-height: 12vh;*/


  }

  #editor{
    width: 100%;
    height: 45vh;
  }

  .button{
    width: 50%;
    /*height: 100%;*/
    height: 2vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .cen{
    max-height: 100%;
    max-width: 100%;
    > div{
      width: 29px;
      height: 29px;
    }
  }

</style>
