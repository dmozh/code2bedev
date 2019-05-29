<template>
  <div class="container">
    <div class="label" v-if="!this.isUnderstand">Эта вкладка позволяет использовать онлайн-компилятор в свободном режиме.
      Если вы хотите решать задачи, то перейдите во вкладку "ЗАДАЧИ"
    </div>
    <div class="buttons" v-if="!this.isUnderstand">
      <div class="btn" @click="onUnderstand">Я понял перейти к
        свободному использованию</div>
      <div class="btn" @click="goToTasks">Использовать онлайн-компилятор для решения задач</div>
    </div>
    <div class="label" v-if="this.isUnderstand">
      Свободное использование {{this.$root.activeLang}}
    </div>
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
          this.activeLang = sessionStorage.getItem('activeLang');
          if(this.activeLang) {
            this.isUnderstand = true;
            this.$root.compilerIsOpen = true;
          }else{
            let toastText = '<span>Не выбран ни один язык программирования.<br>' +
              'Пожалуйста выберите желаемый язык программирования</span>';
            M.toast({html: toastText, classes: 'rounded success'});
          }
        },
        goToTasks(){
          // this.articleTabIsActive   = false;
          // this.lessonTabIsActive    = false;
          // this.taskTabIsActive      = true;
          // this.newsTabIsActive      = false;
          // this.compilerTabIsActive  = false;
          // this.$emit('changeTab');
          // this.$emit('getTasks');
          this.$root.changeTab('tasks', 'change');
          this.$router.push({name: 'tasks'});
        },
        emitReturn() {
          this.$emit('returns')
        },
      },

      mounted: function () {
        this.$root.offAll();
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);
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
