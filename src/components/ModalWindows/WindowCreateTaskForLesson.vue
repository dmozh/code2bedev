<template>
  <transition name="modal">
    <div class="modal-mask" v-if="modalActive">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="close-btn">
              <img src="../../assets/png/close-btn.png" class="pic" @click="emitClose">
            </div>
          </div>
          <div class="main-content-container">
            <form @submit.prevent="addTask('add')" class="custom-form" v-if="!isEdit">
              <!--Names-->
              <input type="text" v-model="taskName" placeholder="Введите название задачи" class="custom-input-name-field">
              <!--Contents-->
              <div class="contents">
                <div class="left-block">
                  <div class="optional-container in-contents">
                    <label for="difficultlySelect">Укажите уровень сложность задачи:</label>
                    <select id="difficultlySelect" class="custom-select">
                      <!--тут определяются языки программировпния в селекте-->
                      <option v-for="item in difficultly" :key="item.id" :value="item.diff">
                        {{item.diff}}
                      </option>
                    </select>
                    <div class="quest-mark-icon tooltip">
                      <img src="../../assets/png/question_mark.png" class="icon qm">
                      <span class="tooltiptext diff">Этот параметр показывает уровень сложности задачи в блоке задач</span>
                    </div>
                  </div>

                  <textarea v-model="taskDescription" placeholder="Введите описание задачи" class="desc-textarea"></textarea>
                </div>
                <div class="right-block">
                  <textarea v-model="taskText" placeholder="Введите текст вашей задачи" class="article-text-textarea"></textarea>
                  <!--<div class="splitter"></div>-->
                  <div class="input-output-block">
                    <textarea v-model="taskTestInput" placeholder="Введите тестовые данные для проверки решения (каждый новый stdin вводится через Enter)
                      Пример:
                      1
                      2
                      3" class="input-textarea"></textarea>
                    <textarea v-model="taskExpectedOutput" placeholder="Введите данные ожидаеммые после выполнения (каждый новый stdout вводится через Enter)
                      Пример:
                      3
                      6
                      9" class="output-textarea"></textarea>
                    </div>
                  <button class="button waves-effect waves-dark">Создать</button>
                  <button class="button waves-effect waves-dark" v-if="isEdit">Обновить</button>
                  <button class="button waves-effect waves-dark" v-if="isEdit">Удалить</button>
                </div>
              </div>
            </form>
            <form @submit.prevent="addTask('upd')" class="custom-form" v-else>
              <!--Names-->
              <input type="text" v-model="taskName" placeholder="Введите название задачи" class="custom-input-name-field">
              <!--Contents-->
              <div class="contents">
                <div class="left-block">
                  <div class="optional-container in-contents">
                    <label for="difficultlySelect2">Укажите уровень сложность задачи:</label>
                    <select id="difficultlySelect2" class="custom-select">
                      <!--тут определяются языки программировпния в селекте-->
                      <option v-for="item in difficultly" :key="item.id" :value="item.diff">
                        {{item.diff}}
                      </option>
                    </select>
                    <div class="quest-mark-icon tooltip">
                      <img src="../../assets/png/question_mark.png" class="icon qm">
                      <span class="tooltiptext diff">Этот параметр показывает уровень сложности задачи в блоке задач</span>
                    </div>
                  </div>

                  <textarea v-model="taskDescription" placeholder="Введите описание задачи" class="desc-textarea"></textarea>
                </div>
                <div class="right-block">
                  <textarea v-model="taskText" placeholder="Введите текст вашей задачи" class="article-text-textarea"></textarea>
                  <!--<div class="splitter"></div>-->
                  <div class="input-output-block">
                    <textarea v-model="taskTestInput" placeholder="Введите тестовые данные для проверки решения (каждый новый stdin вводится через Enter)
                      Пример:
                      1
                      2
                      3" class="input-textarea"></textarea>
                    <textarea v-model="taskExpectedOutput" placeholder="Введите данные ожидаеммые после выполнения (каждый новый stdout вводится через Enter)
                      Пример:
                      3
                      6
                      9" class="output-textarea"></textarea>
                  </div>
                  <button class="button waves-effect waves-dark" v-if="isEdit">Обновить</button>
                </div>
              </div>
            </form>
            <button class="button waves-effect waves-dark" v-if="isEdit" @click="remTask">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
      name: "window-create-task-for-lesson",
      data() {
        return {
          //название task
          taskName: '',
          //описание статьи/новости
          taskDescription: '',
          //сама статья/новость
          taskText: '',
          taskTestInput: '',
          taskExpectedOutput: '',
          taskIndex: null,
          //for difficultly (for a while)
          difficultly: [
            {id: 1, diff: 1},
            {id: 2, diff: 2},
            {id: 3, diff: 3},
            {id: 4, diff: 4},
          ],
          seq: 0,
        }
      },
      props: {
        modalActive: {
          type: Boolean
        },
        isEdit: {
          type: Boolean
        },
        curTaskId: {
          type: Number
        },
        curTaskName: {
          type: String
        },
        curTaskDesc: {
          type: String
        },
        curTaskTxt: {
          type: String
        },
        curTaskInp: {
          type: String
        },
        curTaskOut: {
          type: String
        },
        index:{
          type: Number
        }
      },
      methods: {
        remTask(){
          let isConfirm = confirm('Вы точно хотите удалить задачу из списка?');
          if (isConfirm) {
            this.$parent.lessonTasks.splice(this.taskIndex, 1);
            this.taskName = '';
            this.taskDescription = '';
            this.taskText = '';
            this.taskTestInput = '';
            this.taskExpectedOutput = '';
            this.taskIndex = null;
            this.$emit('close')
          }
        },

        emitClose() {
          this.$emit('close')
        },

        emReturn(){
          this.taskName = '';
          this.taskDescription = '';
          this.taskText = '';
          this.taskTestInput = '';
          this.taskExpectedOutput = '';
          this.seq=0;
          this.$emit('close')
        },

        addTask(key){
          let curTaskId = null;
          let selectedIndex = null;
          let diffValue = null;
          if (key==='add'){
            curTaskId = this.$parent.lessonTasks.length+1;
            selectedIndex = document.getElementById("difficultlySelect").options.selectedIndex;
            diffValue = document.getElementById("difficultlySelect").options[selectedIndex].value;
          }else{
            curTaskId = this.curTaskId;
            selectedIndex = document.getElementById("difficultlySelect2").options.selectedIndex;
            diffValue = document.getElementById("difficultlySelect2").options[selectedIndex].value;
            this.$parent.lessonTasks.splice(this.taskIndex, 1);
          }
          this.$parent.lessonTasks.push(
            {
              taskId: curTaskId,
              taskName: this.taskName,
              taskDifficulty: diffValue,
              taskDescription: this.taskDescription,
              taskText: this.taskText,
              taskTestInput: this.taskTestInput,
              taskExpectedOutput: this.taskExpectedOutput
            }
          );
          console.log(this.$parent.lessonTasks);
          this.emReturn()
        }
      },
      mounted: function () {
        console.log('mount')
      },
      updated: function () {
        console.log('upd'+this.index )
        if(this.isEdit && this.seq===0){
          this.taskName = this.curTaskName;
          this.taskDescription = this.curTaskDesc;
          this.taskText = this.curTaskTxt;
          this.taskTestInput = this.curTaskInp;
          this.taskExpectedOutput = this.curTaskOut;
          this.taskName = this.curTaskName;
          this.taskIndex = this.index;
          this.seq += 1
        }
      },
    }
</script>

<style scoped lang="scss">
  .input-output-block{
    display: flex;
    flex-wrap: wrap;
    width: 40vw;
    justify-content: space-between;
  }

  .input-textarea{
    max-width: 18vw;
    max-height: 23vh;
    min-width: 18vw;
    min-height: 23vh;
  }

  .output-textarea{
    max-width: 18vw;
    max-height: 23vh;
    min-width: 18vw;
    min-height: 23vh;
  }
  label{
    font-size: large;
    margin: 1vh 2px 0 0;
  }
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
    height: 90vh;
    width: 80vw;
    margin: 0 auto;
    /*padding: 20px 30px;*/
    background-color: aliceblue;
    border-radius: 35px;
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


  .button{
    width: 15vw;
    /*height: 100%;*/
    height: 4vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
    /*margin: 25vh 0 0 0;*/
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .main-content-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }

  .contents{
    display: -webkit-flex;
    /*-webkit-flex-wrap: wrap;*/
    display: flex;
    /*flex-wrap: wrap;*/

    width: 100%;

    height: 65vh;

    /*background: blue;*/
  }

  .left-block{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;

    height: auto;
    width: 35vw;
    /*align-items: center;*/
  }

  .right-block{
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
    height: 6.6vh;
  }

  .custom-form{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 78vh;
    width: 68vw;
  }

  .custom-input-name-field{
    width: 67vw !important;
    height: auto !important;
    font-size: 2vw !important;
  }

  .article-text-textarea{
    max-width: 40vw;
    max-height: 30vh;
    min-width: 40vw;
    min-height: 30vh;
    border-radius: 15px;
  }

  .desc-textarea{
    max-width: 23vw;
    max-height: 40vh;
    min-width: 23vw;
    min-height: 40vh;
    border-radius: 15px;
  }

  .desc-textarea:focus, .article-text-textarea:focus{
    border-radius: 15px;
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
    z-index: 10000000;
    cursor: pointer;
    /*background: rgba(152, 152, 152, 0.61);*/
    /*box-shadow: 0 2px 20px 2px rgb(140, 211, 215);*/
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
