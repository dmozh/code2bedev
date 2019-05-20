<template>
  <div>
    <!--<div class="sec-widget" data-widget="a4c3661de71f538d632fd3b6ac847421"></div>-->
    <!--<button @click="emitReturn">return</button>-->
    <div class="label" v-if="!this.isUnderstand">Эта вкладка позволяет использовать онлайн-компилятор в свободном режиме.
      Если вы хотите решать задачи, то перейдите во вкладку "ЗАДАЧИ"
    </div>
    <div class="buttons" v-if="!this.isUnderstand">
      <div class="btn" @click="onUnderstand">Я понял перейти к
        свободному использованию</div>
      <div class="btn" @click="goToTasks">Использовать онлайн-компилятор для решения задач</div>
    </div>
    <div></div>
    <code-editor-component v-if="this.isUnderstand"
                           :place="this.postType"
                           :lang="this.activeLang"
                           :theme="this.theme">
    </code-editor-component>
  </div>
</template>

<script>
    import CodeEditorComponent from "./CodeEditorComponent";

    export default {
      components: {CodeEditorComponent},
      name: "compiler-component",
      data(){
        return{
          isUnderstand: false,

          activeLang: '',
          postType: '',
          theme: 'eclipse',


          postText: '',
          code: '',

          inputDate: '',
          outputDate: '',

          test: '12',
          focused: false,
        }
      },

      methods: {
        onUnderstand(){
          this.isUnderstand=true;
          this.activeLang = sessionStorage.getItem('activeLang')
          this.$root.compilerIsOpen = true;
        },
        goToTasks(){
          // this.articleTabIsActive   = false;
          // this.lessonTabIsActive    = false;
          // this.taskTabIsActive      = true;
          // this.newsTabIsActive      = false;
          // this.compilerTabIsActive  = false;
          this.$emit('changeTab');
          this.$emit('getTasks');
        },
        emitReturn() {
          this.$emit('returns')
        },
      },

      mounted: function () {
      },
    }
</script>

<style scoped lang="scss">
  .buttons{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }

  .label{
    display: inline-flex;
    font-size: 3em;
    color: #919191;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }
</style>
