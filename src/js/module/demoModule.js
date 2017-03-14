import util from "./../common/util";

export default {
  getTest(params, callBack){
    util.get({
      url: 'guide/listPage',
      data: {
        serviceTitle: '社会保障',
        serviceType: 0
      },
      showIndicator: true
    }, (response)=> {
      console.log(response);
    })
  },
  postTest(params, callBack){
    util.post({
      url: 'process/saveOrUpdate',
      data: {
        id: 5,
        title: "流程测试",
        processId: "1003",
        processContentList: [{
          serialNo: 1,
          content: "提交"
        }, {
          serialNo: 2,
          content: "审批"
        }, {
          serialNo: 3,
          content: "备案"
        }]
      },
      commonUrl: 'http://172.31.81.30:8080/mctoon-govhall-ui/',
      showIndicator: false
    }, (response)=> {
      console.log(response);
    })
  }
}
