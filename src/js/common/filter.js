import Vue from "vue";

/**
 * 时间格式化
 */
Vue.filter('timestampToFormat', function (timestamp, formatType) {
  if (timestamp == '' || timestamp == undefined || timestamp == 'undefined' || timestamp == null) {
    return '';
  }
  var dateTime = new Date(parseInt(timestamp));
  var backTime = "";
  var year = dateTime.getFullYear(); // 获取年
  var month = dateTime.getMonth() + 1; // 获取月
  var date = dateTime.getDate(); // 获取日
  var hour = dateTime.getHours(); // 获取时
  var minute = dateTime.getMinutes(); // 获取分
  var second = dateTime.getSeconds(); // 获取秒
  switch (formatType) {
    case '1':
      backTime = year + "年" + zeroFill(month) + "月" + zeroFill(date) + "日";
      break;
    case '2':
      backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date) + " " + zeroFill(hour) + ":" + zeroFill(minute) + ":" + zeroFill(second);
      break;
    case '3':
      backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date);
      break;
    case '4':
      backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date) + " " + zeroFill(hour) + ":" + zeroFill(minute);
      break;
    default:
      backTime = year + "-" + month + "-" + date;
      break;
  }
  return backTime;
});


/**
 * 数字字符串补零
 *
 * @param num
 * @returns {*}
 */
function zeroFill(num) {
  if (num > 0 && num < 10 || num.toString().length == 1 && num == 0) {
    return '0' + num;
  }
  return num;
}
