<template>
  <div class="body">
    <div class="container">
      Эта вкладка пока не доступна :(
    </div>
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
    width: 100%;
    height: 100%;

    font-size: 7vw;
    color: #919191;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
