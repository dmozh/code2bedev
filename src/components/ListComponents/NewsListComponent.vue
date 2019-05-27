<template>
  <div class="container news-list">
    <div class="posts-container">
      <div class="post"
           v-for="elem in response"
           :key="elem.news_id">
        <!--v-bind:class="[-->
        <!--{criticalImportant: criticalImportantClass},-->
        <!--{veryImportant: veryImportantClass},-->
        <!--{important: importantClass},-->
        <!--{notImportant: notImportantClass}]">-->
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
              <div id="title">{{elem.news_name}}</div>

            </div>
            <div class="tags">
              <div>Тэги:&nbsp;</div>
              <span v-for="(tag, index) in elem.news_tags" :key="index" class="tag">#{{tag}}</span>
            </div>
          </div>
          <div class="post-body">
            <p class="txt">{{elem.news_description}}</p>
          </div>
          <div class="post-footer">
            <div class="button lists-btn"
                 @click="openPost('news', elem.news_id)">
              <p>В ПОЛНУЮ</p>
              <img src="../../assets/png/arrow_to_main.png" id="arrow-to-main">
            </div>
            <div class="cnt ft">
              <p class="info" v-if="elem.news_rate < 0">Рейтинг <span class="s minus-rate">{{elem.news_rate}}</span></p>
              <p class="info p" v-else-if="elem.news_rate > 0">Рейтинг <span class="s plus-rate">{{elem.news_rate}}</span></p>
              <p class="info"   v-else>Рейтинг <span class="s">{{elem.news_rate}}</span></p>
              <p class="info">Просмотров {{elem.views}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import regeneratorRuntime from "regenerator-runtime";
    export default {
      name: "news-list-component",
      data () {
        return {
          response: '',

          criticalImportant: false,
          veryImportant: false,
          important: false,
          notImportant: false,

          criticalImportantClass: 'critical_important',
          veryImportantClass: 'very_important',
          importantClass: 'important',
          notImportantClass: 'not_important',
        }
      },
      methods: {
        // showImportant: function (importance, event) {
        //   console.log(document.getElementsByClassName('post'));
          // let elem = document.getElementsByClassName('post')
          // console.log(elem);
          // if(importance===0){
            // console.log(doc)
            // doc.classList.add('not_important')
          // }
        // },
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

          axios.get(this.$root.URL+'getNews').then((response) => {
            this.response = response.data.news;
            console.log(response);
          }).catch((error) => {
            console.log(error);});
        },
      },
      mounted: function () {
        this.$root.offAll();
        sessionStorage.setItem('currentRoute', this.$router.currentRoute.name);
        this.getPosts()
      },
      beforeMount: function(){
        let lastRoute = sessionStorage.getItem('currentRoute');
        sessionStorage.setItem('lastRoute', lastRoute);
      },
    }
</script>

<style scoped>
  .tag{
    height: 1.5vh;
    color: #006dff;
  }
  .tags{
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid grey;
  }

  /*.post{*/
    /*border: 1px solid grey;*/
  /*}*/

  .critical_important{
    background: rgba(255, 171, 172, 0.2);
  }
  .very_important{
    background: rgba(255, 248, 145, 0.23);
  }
  .important{
    background: rgba(155, 255, 155, 0.2);
  }
  .not_important{
    background: rgba(128, 128, 128, 0.51);
  }
</style>
