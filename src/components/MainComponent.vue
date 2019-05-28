<template>
    <div class="container main">

    </div>
</template>

<script>
  import axios from 'axios'
  import regeneratorRuntime from "regenerator-runtime";


    export default {
      name: "main-component",
      components: {
      },
      data() {
        return {
          response: '',
          sortKey: 'name',
          search: '',
          users: [
            { id: 1, name: 'John', age: 50 },
            { id: 2,name: 'Jane', age: 22 },
            { id: 3,name: 'Paul', age: 34 },
            { id: 4, name: 'Kate', age: 15 },
            { id: 5,name: 'Amanda', age: 65 },
            { id: 6,name: 'Steve', age: 38 },
            { id: 7,name: 'Keith', age: 21 },
            { id: 8,name: 'Don', age: 50 },
            { id: 9,name: 'Susan', age: 21 }
          ],
        }
      },
      computed: {
        filteredUsers: function () {
          return this.users.filter(function (user) {
            return user.name.indexOf(this.search) !== -1
          }.bind(this))
        }
      },
      methods:{

        getNews(){
          let body = {
            lang: this.$root.activeLang,
          };
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'getNews', jBody).then((response) => {
            this.response = response.data.articles;
            console.log(response);
          }).catch((error) => {
            console.log(error);});
        },
        getLinks(){
          let body = {
            lang: this.$root.activeLang,
          };
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'getLinks', jBody).then((response) => {
            this.response = response.data.articles;
            console.log(response);
          }).catch((error) => {
            console.log(error);});
        },
      },

      mounted: function () {
        this.$root.mainOn();
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);
        if(this.$root.getAuthUser()!==null){
          this.$root.getUserName();
        }
        if(sessionStorage.getItem('activeLang')!==null && this.$root.activeLang===null){
          this.$root.activeLang = sessionStorage.getItem('activeLang');
        }
        if(sessionStorage.getItem('activeLangId')!==null && this.$root.activeLangId===null){
          this.$root.activeLangId = sessionStorage.getItem('activeLangId');
        }

      },

      beforeMount: function(){
        let lastRoute = sessionStorage.getItem('currentRoute');
        sessionStorage.setItem('lastRoute', lastRoute);
      },

      created: function () {

      },

      updated: function () {
      }
    }
</script>

<style scoped lang="scss">
  .fade-list-item {
    min-width: 100px;
    margin-right: 10px;
  }
  .fade-list-enter-active, .fade-list-leave-active {
    transition: all 1s;
  }
  .fade-list-enter, .fade-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }

  .main, .head, .rows{
    display: flex;
    flex-wrap: wrap;
  }
  .main{
    height: 100%;
  }

  .head{

    background: #8bffa0;
    width: 100%;
  }

  .rows{
    width: 100%;
    background: #29c9bd;
  }
</style>
