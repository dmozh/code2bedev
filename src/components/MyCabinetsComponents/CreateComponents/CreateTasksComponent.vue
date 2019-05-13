<template>
  <div class="create-components-form-container">
    <div class="header">
      <!--ARTICLES-->
      <div class="optional-container">
        <label for="lessonSelect">Выберите урок к задаче</label>
        <select id="lessonSelect" class="custom-select">
          <!--тут определяются языки программировпния в селекте-->
          <option v-for="item in this.$root.userLessons" :key="item.id" :value="item.lesson_name">
            {{item.lesson_name}}
          </option>
        </select>
        <div class="quest-mark-icon tooltip">
          <img src="../../../assets/png/question_mark.png" class="icon qm">
          <span class="tooltiptext">Этот параметр обязателен</span>
        </div>
        <label v-if="isUpdate">Сейчас задача относится к уроку: {{reqLessonName}}</label>
      </div>
      <div class="back-btn waves-effect waves-dark">
        <img src="../../../assets/png/back_arrow2.png" class="icon" @click="emitReturn">
      </div>
    </div>
    <div class="main-content-container">
      <form @submit.prevent="sendTask" class="custom-form">
        <!--Names-->
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
            <div>
              <textarea v-model="taskDescription" placeholder="Введите описание задачи" class="desc-textarea"></textarea>
            </div>
            <div class="text-block">
              <textarea v-model="taskText" placeholder="Введите текст вашей задачи" class="article-text-textarea"></textarea>
              <div class="input-output-block">
                <textarea v-model="taskTestInput" placeholder="Введите тестовые данные для проверки решения (каждый новый stdin вводится через Enter)
                Пример:
                1
                2
                3"
                          id="input-textarea"></textarea>
                <textarea v-model="taskExpectedOutput" placeholder="Введите данные ожидаеммые после выполнения (каждый новый stdout вводится через Enter)
                Пример:
                3
                6
                9"
                          id="output-textarea"></textarea>
              </div>
            </div>


            <button class="button waves-effect waves-dark" v-if="!isUpdate">Создать</button>
            <button class="button waves-effect waves-dark" v-else-if="isUpdate">Обновить</button>
          </div>
        </div>
      </form>
    </div>
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

    export default {
      name: "create-tasks-component",
      components:{
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
        reqLessonId: {
          type: Number
        },
        reqLessonName: {
          type: String
        },
        reqTestInput: {
          type: String
        },
        reqExpectedOutput: {
          type: String
        }

      },
      data(){
        return{
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

          //for a while (artciles)
          lessons: [],

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

        sendTask() {
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
            // if (document.getElementById("lessonSelect").options.selectedIndex !== 0){
            //   this.emptyLang = false
            // }
            //show modal with error
            this.errorModalActive = true;
          }else{
            //определяем значение параметров lesson and difficultly
            // const selectedIndex = document.getElementById("lessonSelect").options.selectedIndex;
            // if(this.isUpdate && document.getElementById("lessonSelect").options.selectedIndex === 0){
            //   document.getElementById("lessonSelect").value = this.reqLessonName;
            // }
            let lesson = document.getElementById("lessonSelect").value;
            console.log(lesson);
            const selectedIndexDifficultlySelect = document.getElementById("difficultlySelect").options.selectedIndex;
            const difficultly = document.getElementById("difficultlySelect").options[selectedIndexDifficultlySelect].value;
            let body = {};
            if(!this.isUpdate){
              body = {
                lesson_name: lesson,
                authorEmail: this.$root.authUser.email,
                taskName: this.taskName,
                taskDescription: this.taskDescription,
                taskText: this.taskText,
                difficulty: difficultly,
                testInput: this.taskTestInput,
                expectedOutput: this.taskExpectedOutput
              };
            }else{

              body = {
                lesson_name: lesson,
                // lessonId: this.reqLessonId,
                // authorEmail: this.$root.authUser.email,
                taskId: this.reqTaskId,
                taskName: this.taskName,
                taskDescription: this.taskDescription,
                taskText: this.taskText,
                difficulty: difficultly,
                testInput: this.taskTestInput,
                expectedOutput: this.taskExpectedOutput
              };
            }

            const jBody = JSON.stringify(body);
            if(!this.isUpdate){
              axios.post('http://localhost:8080/addTask', jBody).then((response) => {
                console.log(response);
              }).catch((error) => {
                console.log(error);});
            }else{
              axios.post('http://localhost:8080/updateUserTask', jBody).then((response) => {
                console.log(response);
              }).catch((error) => {
                console.log(error);});
            }

            this.emitReturn()
          }
        },

        click() {
          //получение значения селекта
          const selectedIndex = document.getElementById("lessonSelect").options.selectedIndex;
          const item = document.getElementById("lessonSelect").options[selectedIndex].value;
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
          document.getElementById("lessonSelect").value = this.reqLessonName;
          document.getElementById("difficultlySelect").value = this.reqTaskDiff;
        }
      },

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
      height: 60vh;
    }
    @media (max-width: 900px) {
      /*width: 19vw;*/
      height: 50vh;
    }
    position: relative;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 80vw;
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

  .top-block{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    height: 13vh;
    width: 80vw;
    align-content: center;
  }

  .bottom-block{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    height: auto;

    align-items: center;
    justify-content: center;
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

  .header{
    width: 100%;
    height: 5vh;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .button{
    width: 10vw;
    /*height: 100%;*/
    height: 4vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
    margin: 2.5vh 0 0 0;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .custom-input-name-field{
    width: 80vw !important;
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
    width: 80vw;
    justify-content: space-between;
  }

  .input-output-block{
    width: 35vw;
    justify-content: space-evenly;
  }

  .article-text-textarea{
    max-width: 45vw;
    max-height: 30vh;
    min-width: 45vw;
    min-height: 30vh;
  }

  .desc-textarea{
    max-width: 80vw;
    max-height: 17vh;
    min-width: 80vw;
    min-height: 17vh;
  }

  #input-textarea{
    max-width: 15vw;
    max-height: 30vh;
    min-width: 15vw;
    min-height: 30vh;
  }

  #output-textarea{
    max-width: 15vw;
    max-height: 30vh;
    min-width: 15vw;
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

    width: 77.5vw;
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

</style>
