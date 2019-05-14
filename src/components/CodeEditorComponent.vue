<template>
  <div class="code-editor-container">
    <div class="main">
      <div class="header-editor-container">
        <div class="btn-container">
          <img id="exec-btn" @click="execute(false)" src="../assets/png/exec_btn.png"/>
        </div>
      </div>
      <div id="editor"></div>
      <div class="input-container">
        <textarea class="input-area" placeholder="Введите сюда stdin" v-model="inputData"></textarea>
      </div>
    </div>
    <div class="output-container">
      <div style="width: 21vw; height: 3vh; background: white; display: flex; justify-content: center; align-items: center;" >
        <button class="button" @click="validCheck">Проверить</button>
      </div>
      <textarea class="output-area" placeholder="Здесь отобразится stdout"
                disabled v-model="outputData"></textarea>
    </div>
  </div>
</template>

<script>
  import ace from 'ace-builds/src-noconflict/ace.js'
  import axios from 'axios'
  import "ace-builds/webpack-resolver"

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
      }
    },

    methods: {
      execute(isCheck){
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

        const jBody = JSON.stringify(body);
        if(!isCheck){
          axios.post(this.$root.URL+'executeCode', jBody)
            .then((response) => {
            this.outputData = response.data.output;
            console.log(response)
          }).catch((error) => {
            console.log(error);
          });
        }else{
          axios.post(this.$root.URL+'checkExecuteCode', jBody)
            .then((response) => {
            this.outputData = response.data.output;
            if (response.data.isDecided){
            //TODO создать кастомную модалку
              alert('Congratulations')
            }else {
              alert('Please try again')
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
    width: 71vw;
    height: 60vh;
    /*background: red;*/
    align-content: baseline;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }

  .header-editor-container{
    width: 50vw;
    height: 3vh;
    background: white;
    justify-content: flex-end;
  }

  .btn-container{
    height: 3vh;
    width: 1.5vw;
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
    width: 50vw;
    align-content: baseline;
  }

  .input-container{
    background: white;
    /*margin-left: 40px;*/
    width: 100%;
    height: 12vh;
  }

  .input-area{
    min-width: 100%;
    min-height: 12vh;
    max-width: 100%;
    max-height: 12vh;
    /*border: none;*/
  }

  .output-container{
    width: 21vw;
    height: 60vh;
    background: white;
  }

  .output-area{
    min-width: 21vw;
    min-height: 57vh;
    max-width: 21vw;
    max-height: 57vh;


  }

  #editor{
    width: 50vw;
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

</style>
