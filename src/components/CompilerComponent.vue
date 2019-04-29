<template>
  <div>
    <!--<div class="sec-widget" data-widget="a4c3661de71f538d632fd3b6ac847421"></div>-->
    <button @click="emitReturn">return</button>
  </div>
</template>

<script>
    export default {
      name: "compiler-component",
      data(){
        return{
          activeLang: '',

          postText: '',
          code: '',

          inputDate: '',
          outputDate: '',

          test: '12',
          focused: false,
        }
      },

      methods: {
        emitReturn() {
          this.$emit('returns')
        },
      }
    }
</script>

<style scoped>

</style>
