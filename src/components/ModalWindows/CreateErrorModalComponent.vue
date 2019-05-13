<template>
  <transition name="modal">
    <div class="modal-mask" v-if="errorModalActive">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="close-btn">
              <img src="../../assets/png/alert_sign.png" class="pic">
            </div>
            <div class="header-note">ОШИБКА</div>
          </div>
          <div class="content-container">
            <div class="err-block">
              <p v-if="!isNews & langPost">Выберите язык программирования к создаваемому посту</p>
              <p v-if="namePost">Заполните поле "Название"</p>
              <p v-if="descPost">Заполните поле "Описание"</p>
              <p v-if="textPost">Заполните поле "Текст"</p>
              <p v-if="isTask & testInput">Заполните поле "Тестовые входные данные"</p>
              <p v-if="isTask & expectedOutput">Заполните поле "Ожидаеммые выходные данные"</p>
            </div>
            <button class="button" @click="emitClose">Я понял</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
      name: "create-error-modal-component",
      data() {
        return {

        }
      },
      props: {
        isArticle:{
          type: Boolean
        },
        isNews:{
          type: Boolean
        },
        isTask: {
          type: Boolean
        },

        errorModalActive: {
          type: Boolean
        },

        namePost: {
          type: Boolean
        },
        descPost: {
          type: Boolean
        },
        textPost: {
          type: Boolean
        },

        langPost: {
          type: Boolean
        },

        //for create task component
        testInput: {
          type: Boolean
        },
        expectedOutput: {
          type: Boolean
        }
      },
      methods: {
        emitClose() {
          this.$emit('close');
        },
      }
    }
</script>

<style scoped lang="scss">
  p{
    display: flex;
    justify-content: baseline;
    margin-left: 3vw;
    width: 100%;
    font-size: 1.3vw;
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
    height: auto;
    width: 40vw;
    margin: 0 auto;
    /*padding: 20px 30px;*/
    background-color: #fff;
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
    width: 50%;
    /*height: 100%;*/
    height: 4vh;
    background: rgba(22,22,22, 0.1);
    border: none;
    cursor: pointer;
    border-radius: 50px;
    margin-bottom: 10px;
  }

  .button:hover{
    transition: .5s all;
    background: #a6ffb7;
  }

  .limiter{
    max-width: 320px;
    margin: auto;
  }

  .content-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
    height: 10vh;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .close-btn{
    border-radius: 50%;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 10vh;
    width: 5vw;
  }
  .header-note{
    width: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6vw;
    font-weight: bold;
  }

  .err-block{
    display: flex;
    flex-wrap: wrap;

    overflow-y: auto;
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
</style>
