<template>
    <div class="body">
      <div class="card-container">

        <div class="column">
          <p>НА ГЛАВНУЮ</p>
          <div class="splitter"></div>
          <router-link to="/main" class="card">
            <img src="@/assets/png/home.png" class="pic">
          </router-link>
        </div>

        <div class="diwider"></div>

        <div class="column" v-if="!this.$root.authUser">
          <p>ЗАРЕГИСТРИРОВАТЬСЯ</p>
          <div class="splitter"></div>
          <router-link to="/register" class="card">
            <img src="@/assets/png/signup.png" class="pic">
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "welcome-page-component",
      methods: {
      }
    }
</script>

<style scoped lang="scss">
  p{
    font-size: 2vw;
    /*font-size: calc(0.5em + 1.1vw);*/
    text-align: -webkit-center;
    text-align: center;
    word-break: break-all;
    /*font-family: Open-sans;*/
    /*color: chocolate;*/

  }
  .body{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    height: 100vh;
    background: aliceblue;
    justify-content: center;
  }

  .card-container{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
  }

  .column{

  }

  .card{
    @media (max-width: 770px) {
      height: 300px;
    }
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    width: 20vw;
    height: 50vh;
    background: white;
    word-break: break-all;
    text-align: center;
    text-justify: auto;
  }

  .card:hover{
    transform: scale(1.10);
    transition: .3s all;
    z-index: 10000000;
    cursor: pointer;
    box-shadow: 0 2px 20px 2px rgb(140, 211, 215);
  }

  .diwider{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 10vw;
  }
  .splitter{
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    height: 5vh;
    width: 100%;
  }

  .pic{
    margin: auto;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    max-height: 100%;
  }
</style>
