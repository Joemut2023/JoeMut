const moment = require("moment");
const check_value_date_last = (data)=>{
    if (data=='') {
      return moment(new Date(2030, 0, 1)).format('YYYY-MM-DD');
    }else{
      return data
    }
  }
const check_value_date_start = (data)=>{
    if (data == '') {
      return moment(new Date(2004, 0, 1)).format('YYYY-MM-DD')
    }else{
     return data
    }
}
module.exports = {check_value_date_last,check_value_date_start}