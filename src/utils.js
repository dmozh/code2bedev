function parseDateTime (dateTime, type) {
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
};
