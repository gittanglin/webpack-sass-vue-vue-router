<style lang="sass" rel="stylesheet/scss" type="text/css">
  @import "./../../css/common";

  .lawRuleContainer {
    $color-disable: #ccc;
    height: 100%;
    .searchCon {
      background: #fff;
    }
    .searchCon li {
      padding: pxToRem(15px) pxToRem(15px) pxToRem(15px) 0;
      margin-left: pxToRem(15px);
      border-bottom: 1px solid $color-disable;
      font-size: pxToRem(15px);
      color: #000000;
      line-height: pxToRem(20px);
    }
    .loading {
      text-align: center;
    }
    .loading li {
      margin-bottom: pxToRem(10px);
      width: pxToRem(10px);
      height: pxToRem(10px);
      border-radius: 50%;
      background: #ccc;
      list-style: none;
      display: inline-block;
      margin-right: pxToRem(10px);

    }
    .loading li:nth-of-type(1) {
      animation: loading .9s infinite;

    }
    .loading li:nth-of-type(2) {
      animation: loading .9s infinite .3s;
    }
    .loading li:nth-of-type(3) {
      animation: loading .9s infinite .6s;
    }
    @keyframes loading {
      0%, 100% {
        transform: scale(0);
      }
      50% {
        transform: scale(1);
      }
    }
  }
</style>
<template>
  <div class="lawRuleContainer">
    <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" ref="loadmore"
                 :top-method="loadTop" @top-status-change="handleTopChange">
      <ul class="searchCon">
        <li v-for="(title, key) in dataList"><a @click="go(key)">{{title.title}}</li>
      </ul>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'pull'" :class="{ 'is-rotate': bottomStatus === 'pull' }">正在加载中</span>
        <span v-show="bottomStatus !== 'drop'" :class="{ 'is-rotate': bottomStatus === 'drop' }">
        释放加载更多
        </span>
        <span v-show="topStatus == 'drop'">
          <ul class="loading">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </span>
      </div>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus == 'drop'">
          <ul class="loading">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </span>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  import util from './../../js/common/util';
  import {Loadmore} from 'mint-ui';
  import Vue from "vue";

  Vue.component(Loadmore.name, Loadmore);

  export default {
    data () {
      return {
        level: 'list',
        dataList: [],
        mod: '',
        service: '',
        sortId: 'ALL',
        bottomStatus: '',
        topStatus: ''
      }
    },
    created: function () {
      this.mod = this.$route.params.mod;
      this.service = this.$route.params.service;
      let conf = {
        mod: this.mod,
        service: this.service,
        sortId: this.sortId,
        type: 'list',
        infoData: infoData
      }
      this.dataList = busiConf.getData(conf);
    },
    methods: {
      go: function (index) {
        let conf = {
          mod: this.mod,
          service: this.service,
          type: this.level,
          sortId: this.sortId,
          infoId: index
        }
        let nextPage = busiConf.getNextPage(conf);
        if (nextPage) {
          this.$router.push({path: '/' + nextPage + '/' + conf.mod + '/' + conf.service + '/' + conf.sortId + '/' + conf.infoId});
        }
      },
      handleTopChange(status){
        console.log('--------+++++++')
        console.log(status)
        console.log('--------+++++++')
        this.topStatus = status;
      },
      handleBottomChange(status) {
        console.log('--------')
        console.log(status)
        console.log('--------')
        this.bottomStatus = status;
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.$refs.loadmore.onBottomLoaded();
      }
    },
  }
</script>
