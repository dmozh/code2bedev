<template>
  <div class="create-components-form-container">
    <div class="header">
      <div class="back-btn waves-effect waves-dark" v-if="isUpdate">
        <img src="../../../assets/png/back_arrow2.png" class="icon" @click="emitReturn">
      </div>
      <div class="optional-container">
        <label for="langSelect">Выберите язык программирования</label>
        <select id="langSelect" class="custom-select">
          <!--тут определяются языки программировпния в селекте-->
          <option v-for="lang in this.$root.langsName" :key="lang.lang_id" :value="lang.lang_name" @click="click">
            {{lang.lang_name}}
          </option>
        </select>
        <div class="quest-mark-icon tooltip">
          <img src="../../../assets/png/question_mark.png" class="icon qm">
          <span class="tooltiptext">Этот параметр обязателен</span>
        </div>
        <label v-if="isUpdate">Сейчас задача относится к: {{reqLangName}}</label>
      </div>
    </div>
    <div class="main-content-container">
      <form @submit.prevent="sendTask" class="custom-form">
        <!--Names-->
        <label v-if="isUpdate">Введите название</label>
        <input type="text" v-model="taskName" placeholder="Введите название задачи" class="custom-input-name-field">
        <!--Contents-->
        <div class="contents">
          <div class="top-block">
            <div class="optional-container in-contents">
              <label for="difficultlySelect">Укажите уровень сложность задачи:</label>
              <select id="difficultlySelect" class="custom-select">
                <!--тут определяются языки программировпния в селекте-->
                <option v-for="item in difficultly" :key="item.id" :value="item.diff">
                  {{item.diff}}
                </option>
              </select>
              <label v-if="isUpdate">Сейчас уровень задачи: {{reqTaskDiff}}</label>
              <div class="quest-mark-icon tooltip">
                <img src="../../../assets/png/question_mark.png" class="icon qm">
                <span class="tooltiptext diff">Этот параметр показывает уровень сложности задачи в блоке задач</span>
              </div>
            </div>

          </div>
          <div class="bottom-block">
            <!--<div class="splitter"></div>-->
            <label v-if="isUpdate">Введите описание</label>
            <div class="middle">
              <textarea v-model="taskDescription" placeholder="Введите описание задачи" class="desc-textarea"></textarea>
              <div class="lessons-container">
                <div class="plus-btn-container">
                  <div class="plus-btn" @click="openLessonsChoose">
                    <img src="../../../assets/png/plus.png" class="plus-btn-icon"/>
                  </div>
                </div>
                <div class="lessons">
                  <label v-if="this.selectedLessons.length===0">Добавьте связанные уроки с этой задачей</label>
                  <div>
                    <span v-for="(lesson, index) in selectedLessons"
                          :key="lesson.lesson_id" class="les"
                          v-on:click="selectedLessons.splice(index, 1)">Урок: {{lesson.lesson_name}}&nbsp;</span>
                  </div>
                </div>
              </div>
            </div>


            <div class="text-block">
              <label v-if="isUpdate">Введите текст</label>
              <textarea v-model="taskText" placeholder="Введите текст вашей задачи" class="article-text-textarea"></textarea>
            </div>


            <div class="input-output-block">
              <label v-if="isUpdate">Введите входные данные</label>
                <textarea v-model="taskTestInput" placeholder="Введите тестовые данные для проверки решения (каждый новый stdin вводится через Enter)
                Пример:
                1
                2
                3"
                          id="input-textarea"></textarea>
              <label v-if="isUpdate">Введите выходные данные</label>
              <textarea v-model="taskExpectedOutput" placeholder="Введите данные ожидаеммые после выполнения (каждый новый stdout вводится через Enter)
                Пример:
                3
                6
                9"
                        id="output-textarea"></textarea>
            </div>


            <button class="button waves-effect waves-dark" v-if="!isUpdate">Создать</button>
            <button class="button waves-effect waves-dark" v-else-if="isUpdate">Обновить</button>
          </div>
        </div>
      </form>
    </div>
    <window-choose-lessons-for-task v-if="this.lessonsChooseActive"
                                    :lessonsChooseActive="lessonsChooseActive"
                                    :lessons="lessons"
                                    @close="closeLessonsChoose">

    </window-choose-lessons-for-task>
    <create-error-modal-component :isTask="true"
                                  :namePost="emptyName"
                                  :descPost="emptyDesc"
                                  :textPost="emptyText"
                                  :testInput="emptyTestInput"
                                  :expectedOutput="emptyExpectedOutput"
                                  :errorModalActive="errorModalActive"
                                  @close="closeError">
    </create-error-modal-component>
  </div>
</template>

<script>
  import axios from 'axios'
  import CreateErrorModalComponent from "../../ModalWindows/CreateErrorModalComponent";
  import WindowChooseLessonsForTask from "../../ModalWindows/WindowChooseLessonsForTask";
  import regeneratorRuntime from "regenerator-runtime";
    export default {
      name: "create-tasks-component",
      components:{
        WindowChooseLessonsForTask,
        CreateErrorModalComponent
      },
      props: {
        isUpdate: {
          type: Boolean
        },

        reqTaskId:{
          type: Number
        },
        reqTaskName: {
          type: String
        },
        reqTaskDescription: {
          type: String
        },
        reqTaskText: {
          type: String
        },
        reqTaskDiff:{
          type: Number
        },
        reqLangId: {
          type: Number
        },
        reqLangName: {
          type: String
        },
        reqTestInput: {
          type: String
        },
        reqExpectedOutput: {
          type: String
        },
        reqLinkedLessons: {
          type: Array
        }

      },
      data(){
        return{
          toastText: '',

          lessonsChooseActive: false,

          errorModalActive: false,
          emptyName: true,
          emptyDesc: true,
          emptyText: true,
          emptyLang: true,
          emptyTestInput: true,
          emptyExpectedOutput: true,

          //название task
          taskName: '',
          //описание статьи/новости
          taskDescription: '',
          //сама статья/новость
          taskText: '',

          taskTestInput: '',
          taskExpectedOutput: '',

          lessons: null,
          selectedLessons: [],
          //for difficultly (for a while)
          difficultly: [
            {id: 1, diff: 1},
            {id: 2, diff: 2},
            {id: 3, diff: 3},
            {id: 4, diff: 4},
          ],
        }
      },
      methods: {
        checkLesson(name){
          let check = true;
          for (let curLess in this.selectedLessons){
            if(this.selectedLessons[curLess].lesson_name === name){
              check = false;
              break;
            }
          }
          return check;
        },
        closeLessonsChoose() {
          this.lessonsChooseActive = false;

        },
        openLessonsChoose() {
          let lang = document.getElementById("langSelect").value;
          console.log(lang);
          // if(this.lessons === null){
          const body = {
            authorEmail: this.$root.authUser.email,
            lang: lang
          };
          //создаем json
          let api = 'getLangLessonsName';
          // let api = 'getUserLessonsName';
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+api, jBody).then((response) => {
            console.log(response.data);
            this.lessons = response.data.lessons;
          }).catch((error) => {
            console.log(error);
          });
          // }
          this.lessonsChooseActive = true;
        },

        emitReturn() {
          this.$emit('returns')
        },

        closeError(){
          this.errorModalActive = false;
          this.emptyName = true;
          this.emptyDesc = true;
          this.emptyText = true;
          this.emptyLang = true;
          this.emptyTestInput = true;
          this.emptyExpectedOutput = true;
        },

        async sendTask() {
          if (this.taskName.length === 0 || this.taskDescription.length === 0 || this.taskText.length === 0
            || this.taskExpectedOutput.length === 0 || this.taskTestInput.length === 0){
            if (this.taskName.length !== 0){
              this.emptyName = false
            }
            if (this.taskDescription.length !== 0){
              this.emptyDesc = false
            }
            if (this.taskText.length !== 0){
              this.emptyText = false
            }
            if (this.taskExpectedOutput.length !== 0){
              this.emptyExpectedOutput = false;
            }
            if (this.taskTestInput.length !== 0){
              this.emptyTestInput = false
            }
            this.errorModalActive = true;
          }else{
            let lang = document.getElementById("langSelect").value;
            console.log(lang);
            const selectedIndexDifficultlySelect = document.getElementById("difficultlySelect").options.selectedIndex;
            const difficultly = document.getElementById("difficultlySelect").options[selectedIndexDifficultlySelect].value;
            let body = {};
            if(!this.isUpdate){
              body = {
                lang_id: lang,
                authorEmail: this.$root.authUser.email,
                taskName: this.taskName,
                taskDescription: this.taskDescription,
                taskText: this.taskText,
                difficulty: difficultly,
                testInput: this.taskTestInput,
                expectedOutput: this.taskExpectedOutput,
                linkedLessons: this.selectedLessons
              };
            }else{
              body = {
                lang_name: lang,
                // lessonId: this.reqLessonId,
                // authorEmail: this.$root.authUser.email,
                taskId: this.reqTaskId,
                taskName: this.taskName,
                taskDescription: this.taskDescription,
                taskText: this.taskText,
                difficulty: difficultly,
                testInput: this.taskTestInput,
                expectedOutput: this.taskExpectedOutput,
                linkedLessons: this.selectedLessons
              };
            }
            let self = this;
            const jBody = JSON.stringify(body);
            if(!this.isUpdate){
              await axios.post(this.$root.URL+'addTask', jBody).then((response) => {
                // console.log(response);
                let resp = response.data.msg;
                if (resp === true){
                  self.toastText = '<span>Задача была успешно добавлена</span>';
                  M.toast({html: self.toastText, classes: 'rounded success'});
                  self.emitReturn()
                } else if (resp.err_code === '23505') {
                  console.log(resp.err_code);
                  self.toastText = '<span>Задача не была добавлена.&nbsp;</span>' + resp.err_info;
                  M.toast({html: self.toastText, classes: 'rounded warning'});
                }
              }).catch((error) => {
                console.log(error);});
            }else{
              await axios.post(this.$root.URL+'updateUserTask', jBody).then((response) => {
                let resp = response.data.msg;
                if (resp === true){
                  self.toastText = '<span>Задача была успешно обновлена</span>';
                  M.toast({html: self.toastText, classes: 'rounded success'});
                  self.emitReturn()
                } else if (resp.err_code === '23505') {
                  console.log(resp.err_code);
                  self.toastText = '<span>Задача не была обновлена.&nbsp;</span>' + resp.err_info;
                  M.toast({html: self.toastText, classes: 'rounded warning'});
                } else if (resp === 'identical'){
                  self.toastText = '<span>Задача идентичная</span>';
                  M.toast({html: self.toastText, classes: 'rounded success'});
                  self.emitReturn();
                }
                // console.log(response);
              }).catch((error) => {
                console.log(error);});
            }
          }
        },

        click() {
          //получение значения селекта
          const selectedIndex = document.getElementById("langSelect").options.selectedIndex;
          const item = document.getElementById("langSelect").options[selectedIndex].value;
          alert(selectedIndex + item)
        },
      },

      mounted: function () {

        if (this.isUpdate) {
          this.taskName = this.reqTaskName;
          this.taskDescription = this.reqTaskDescription;
          this.taskText = this.reqTaskText;
          this.taskTestInput = this.reqTestInput;
          this.taskExpectedOutput = this.reqExpectedOutput;
          this.selectedLessons = this.reqLinkedLessons;
          document.getElementById("langSelect").value = this.reqLangName;
          document.getElementById("difficultlySelect").value = this.reqTaskDiff;
        }
      },
      updated: function () {

      }
    }
</script>

<style scoped lang="scss">
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
    height: auto;
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
    height: auto;
    width: 100%;
    justify-content: center;
  }

  .contents{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    width: 100%;

    /*height: 65vh;*/
    height: auto;
    /*background: blue;*/
  }

  .middle, .top-block, .lessons-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }

  .middle{
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
  }

  .lessons-container{
    justify-content: inherit;
    width: 55.3%;
    flex-wrap: nowrap;
  }

  .lessons{
    padding: 5px 2px 5px 2px;
    border: solid 1px rgba(0, 0, 0, 0.31);
    width: 91%;
  }

  .top-block{
    height: 13vh;
    width: 100%;
    align-content: center;
  }

  .bottom-block{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    height: auto;

    align-items: center;
    justify-content: space-between;
  }

  .splitter{
    width: 100%;
    height: 6.9vh;
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
    background: rgba(126, 215, 118, 0.1);
    transform: rotate(-180deg);
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

  .header{
    margin-top: 50px;
    width: 100%;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
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
    /*width: 80vw !important;*/
    height: auto !important;
    font-size: 3vw !important;
  }

  .text-block, .input-output-block{
    display: -webkit-flex;
    -webkit-flex-wrap: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }

  .text-block{
    width: 100%;
    flex-wrap: wrap!important;
    /*justify-content: space-between;*/
  }

  .input-output-block{
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }

  .article-text-textarea{
    max-width: 100%;
    /*max-height: 30vh;*/
    width: 100%;
    min-height: 30vh;
  }

  .desc-textarea{
    max-width: 42%;
    /*max-height: 17vh;*/
    min-width: 42%;
    min-height: 17vh;
  }

  #input-textarea{
    max-width: 42%;
    /*max-height: 30vh;*/
    min-width: 42%;
    min-height: 30vh;
    margin-right: 20px;
  }

  #output-textarea{
    max-width: 42%;
    /*max-height: 30vh;*/
    min-width: 42%;
    min-height: 30vh;
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
  .in-contents{
    width: auto !important;
    height: 10vh !important;
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

  .diff{
    width: 12vw !important;
    height: 5.4vh;
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
    transform: translateX(40px);
    visibility: visible;
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

  .les{
    padding: 2px;
    border-radius: 10px;
    background: aqua;
    margin: 0 5px 2px 0;
  }

  .les:hover{
    cursor: pointer;
    transition: .2s;

    transform: scale(2);
  }
</style>
