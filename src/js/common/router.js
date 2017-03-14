let router = [
  {
    path: '/',                         //重定向页面
    redirect: { name: 'lawRuleList' }
  },
  {
    path: '/processList',                         //办理流程
    name: 'processList',
    component: function (resolve) {
      require(['../../components/guide/processList.vue'], resolve);
    }
  },
  {
    path: '/lawRuleList',                         //政策法规
    name: 'lawRuleList',
    component: function (resolve) {
      require(['../../components/lawRule/lawRuleList.vue'], resolve);
    }
  },
  {
    path: '/lawRuleDetail',                         //政策法规详情
    name: 'lawRuleDetail',
    component: function (resolve) {
      require(['../../components/lawRule/lawRuleDetail.vue'], resolve);
    }
  },
   {
    path: '/workProgress',                         //办理进度
    name: 'workProgress',
    component: function (resolve) {
      require(['../../components/apply/workProgress.vue'], resolve);
    }
  }/*,
   {
    path: '/guideTo',                         //办理进度
    name: 'guideTo',
    component: function (resolve) {
      require(['../../components/guideTo/guideTo.vue'], resolve);
    }
  }*/
];

export default {
  router
}
