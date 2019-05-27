<template>
  <div class="body">
    Эта вкладка пока не доступна :(
  </div>
</template>

<script>
    export default {
      name: "seen-component",
      mounted: function () {
        if (this.$root.getAuthUser === null){
          let toastText = '<span>Пожалуйста авторизируйтесь</span>';
          M.toast({html: toastText, classes: 'rounded warning', displayLength: 6000});
          this.$router.go(-1)
        }else {
          this.$root.myCabOn();
        }
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
