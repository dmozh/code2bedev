<template>
  <div class="container tasks-list">
    <div class="head">
      <div class="container head">
        <div>Поиск </div>
        <input v-model="search" class="form-control" placeholder="">
        <button class="btn waves-effect waves-dark" @click="switchKey(sortKey)">{{sortKey}}</button>
      </div>
    </div>
    <div class="posts-container">
      <transition-group name="fade-list" tag="div">
        <div class="post fade-list-item"
             v-for="elem in filtered"
             :key="elem.task_id"
             @onload="parse(elem.added_time, elem.last_update)">
          <div class="post-content">
            <div class="post-header">
              <div class="title">
                <div class="info-container">
                  <div class="info">Автор {{elem.author}}</div>
                  <div class="cnt">
                    <span class="info">Добавлена&nbsp;{{parseDateTime(elem.added_time, 'date')}}</span>
                    <span class="info">&nbsp;в {{parseDateTime(elem.added_time, 'time')}}</span>
                  </div>
                  <div class="cnt">
                    <span class="info">Последнее обновление&nbsp;{{parseDateTime(elem.last_update, 'date')}}</span>
                    <span class="info">&nbsp;в {{parseDateTime(elem.last_update, 'time')}}</span>
                  </div>

                </div>
                <div id="title">{{elem.task_name}}</div>

              </div>
              <div class="tags">
                Сложность: &nbsp;<div class="tag" @click="setSortKey(elem.task_difficulty)">{{elem.task_difficulty}}</div>
              </div>
            </div>
            <div class="post-body">
              <p class="txt">{{elem.task_description}}</p>
            </div>
            <div class="post-footer">
              <div class="button lists-btn"
                   @click="openPost('task', elem.task_id)">
                <p>В ПОЛНУЮ</p>
                <img src="../../assets/png/arrow_to_main.png" id="arrow-to-main">
              </div>
              <div class="cnt ft">
                <p class="info" v-if="elem.task_rate < 0">Рейтинг <span class="s minus-rate">{{elem.task_rate}}</span></p>
                <p class="info p" v-else-if="elem.task_rate > 0">Рейтинг <span class="s plus-rate">{{elem.task_rate}}</span></p>
                <p class="info"   v-else>Рейтинг <span class="s">{{elem.task_rate}}</span></p>
                <p class="info">Просмотров {{elem.views}}</p>
              </div>

            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import regeneratorRuntime from "regenerator-runtime";
    export default {
      name: "tasks-list-component",
      data () {
        return {
          sortKey: 'Название',
          keys: ['Название', 'Сложность'],
          search: '',

          lang: '',
          response: '',
        }
      },
      computed: {
        filtered: function () {
          if(this.response) {
            return this.response.filter(
              function (task) {
                if(this.sortKey==='Название'){
                  return task.task_name.indexOf(this.search) !== -1
                }else if(this.sortKey==='Сложность'){
                  return task.task_difficulty.toString().indexOf(this.search) !== -1
                }

              }.bind(this))
          }
        }
      },
      methods: {
        setSortKey(diff){
          this.switchKey('Название');
          this.search = diff
        },

        switchKey(key){
          if(this.keys.length > this.keys.indexOf(key)+1){
            this.sortKey = this.keys[this.keys.indexOf(key)+1]
          }else{
            this.sortKey = this.keys[this.keys.length-this.keys.indexOf(key)-1]
          }
        },

        parseDateTime: function (dateTime, type) {
          let temp = '';
          let date = new Date();
          // console.log(date.getDate())
          // console.log(date.getMonth())
          // console.log(date.getFullYear())
          if(type==='date'){
            temp = dateTime.slice(0, dateTime.indexOf(' '));
            let splitDate = temp.split('.');
            if(date.getFullYear()===parseInt(splitDate[2])){
              let tempM1 = date.getDate();
              let tempM2 = parseInt(splitDate[0]);
              if(tempM1-tempM2 === 1){
                temp = 'вчера'
              }else if (tempM1-tempM2 === 0){
                temp = 'сегодня'
              }else{
                let month = parseInt(splitDate[1]);
                let strMonth= '';
                if(month===1){
                  strMonth = 'января'
                }else if(month===2){
                  strMonth = 'февраля'
                }else if(month===3){
                  strMonth = 'марта'
                }else if(month===4){
                  strMonth = 'апреля'
                }else if(month===5){
                  strMonth = 'мая'
                }else if(month===6){
                  strMonth = 'июня'
                }else if(month===7){
                  strMonth = 'июля'
                }else if(month===8){
                  strMonth = 'августа'
                }else if(month===9){
                  strMonth = 'сентября'
                }else if(month===10){
                  strMonth = 'октября'
                }else if(month===11){
                  strMonth = 'ноября'
                }else if(month===12){
                  strMonth = 'декабря'
                }
                temp = splitDate[0]+' '+strMonth+' '+splitDate[2]+' года'
              }
            }else{
              // let difference = date.getFullYear() - parseInt(splitDate[2]);
              // if(difference.toString().slice(-1) === '1'){
              //   if(difference===11){
              //     temp = difference.toString() + ' ' + 'лет назад'
              //   }else{
              //     temp = difference.toString() + ' ' + 'год назад'
              //   }
              // }else if(difference.toString().slice(-1) === '0'){
              //   temp = difference.toString() + ' ' + 'лет назад'
              // }else{
              //   temp = difference.toString() + ' ' + 'года назад'
              // }
            }
          } else if (type === 'time'){
            temp = dateTime.slice(dateTime.indexOf(' '), dateTime.length);
          }
          // console.log(temp)

          return temp
        },
        openPost(postType, postId){
          let body = {
            postId: postId,
            postType: postType,
          };
          const jBody = JSON.stringify(body);
          const base64 = Buffer.from(jBody).toString("base64");
          this.$router.push({name: 'post',
            params:{postsType: this.$route.name, type: postType, params: base64}});
        },
        getPosts(){
          let body = {
            lang: this.$root.activeLang,
          };
          const jBody = JSON.stringify(body);
          axios.post(this.$root.URL+'getTasks', jBody).then((response) => {
            this.response = response.data.tasks;
            // console.log(response);
          }).catch((error) => {
            console.log(error);});
        },
      },
      mounted: function () {
        this.$root.offAll();
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);
        this.getPosts();
      },
      beforeMount: function(){
        let lastRoute = sessionStorage.getItem('currentRoute');
        sessionStorage.setItem('lastRoute', lastRoute);
      },
    }
</script>

<style scoped lang="scss">
  .head {
    width: 100%;
    display: flex;
    >div{
      margin-left: 10px;
      margin-right: 10px;
      color: #93989f;
      display: flex;
      align-items: center;
      font-size: 1.5rem;
    }
    >input{
      width: 80%;
    }
    >button{
      margin-left: 5px;
    }
  }
  .tags{
    font-size: 1.2rem;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid grey;
  }
  .tag{
    height: 1.5vh;
    color: #006dff;
  }

  .tag:hover{
    cursor: pointer;
  }
  .fade-list-item {
  }
  .fade-list-enter-active, .fade-list-leave-active {
    transition: all 1s;
  }
  .fade-list-enter, .fade-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateX(-300px);
  }

</style>
