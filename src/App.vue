<template>
  <div id="app">
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {

  name: 'app',
    data () {
      return {

    }
  },

  methods: {

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
