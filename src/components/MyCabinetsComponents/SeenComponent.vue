<template>
  <div class="body">
    Эта вкладка пока не доступна :(
  </div>
</template>

<script>
    export default {
      name: "seen-component",
      mounted: function () {
        this.$root.myCabOn();
      }
    }
</script>

<style scoped>
  .body{
    display: flex;
    width: 100vw;
    height: 90%;
    background: aliceblue;

    font-size: 7vw;
    color: #919191;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
