let comUrl = '${mtgzfUrl}/'; //平台服务器地址

if (comUrl.indexOf('{mtgzfUrl}') >= 0) {
  //var comUrl='http://mtgzf.zhengtoon.com/';    // 正式环境
  comUrl = 'http://172.31.81.25:8080/mctoon-govhall-ui/';    // 测试环境,外网
  //url = 'http://mtgzf.zhengtoon.com/';    // 测试环境,外网
  //url = 'http://172.31.81.52:8080/enforcement-wui/';
  //url = 'http://172.31.82.22:8080/enforcement-wui/';
  //url = 'http://172.31.82.23:8085/enforcement-wui/';
}

let orgServiceUrl = '${adminFrame}/'; //平台服务器地址
if (orgServiceUrl.indexOf('{adminFrame}') >= 0) {
  orgServiceUrl = 'http://t200.admin.qitoon.com/';    // 测试环境,外网
}

export default {
  toastTime: 1200,    //弹框时间
  indicatorTime: 1200,//loading加载
  pageSize: 20,   //分页每页显示的大小
  comUrl: comUrl,
}
