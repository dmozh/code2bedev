<template>
  <div id="app">
    <header-component></header-component>
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import HeaderComponent from "./components/HeaderComponent";

  export default {

    components: {HeaderComponent},
    name: 'app',
    data () {
      return {

    }
  },

  methods: {
    changeTab(){
      //так делать плохо
      this.$children[0].activeTab('task');
    },
  }
}
</script>

<style scoped lang="scss">
  .content{
    max-width: 100%;
    height: 93vh;
    /*max-height: 100%;*/
    margin-top: 60px;
    /*width: 100%;*/
  }
</style>
