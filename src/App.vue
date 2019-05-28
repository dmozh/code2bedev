<template>
  <div id="app">
    <header-component></header-component>
    <div class="content">
      <transition name="animate">
        <router-view></router-view>
      </transition>
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
    min-height: 93vh;
    /*max-height: 100%;*/
    margin-top: 60px;
    /*width: 100%;*/
  }


  .animate-enter-active{
    animation: fadeIn 1s ease-in;
  }
  @keyframes fadeIn{
    0%{
      opacity: 0;
    }
    50%{
      opacity: 0.5;
    }
    100%{
      opacity: 1;
    }
  }
  .animate-leave-active{
    animation: animate .3s ease-in;
  }
  @keyframes animate{
    0%{
      transform: translateX(0);
    }
    100%{
      transform: translateX(-1400px);
    }
  }

</style>
