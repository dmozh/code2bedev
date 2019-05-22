<template>
  <div class="body">
    Эта вкладка пока не доступна :(
  </div>
</template>

<script>
    export default {
      name: "profile-component",
      mounted: function () {
        this.$root.myCabOn();
      }
    }
</script>

<style scoped lang="scss">
  .body{
    display: flex;
    width: 100%;
    height: 93%;
    background: aliceblue;

    font-size: 7vw;
    color: #919191;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
