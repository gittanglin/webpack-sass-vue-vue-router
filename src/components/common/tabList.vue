<style lang="sass" rel="stylesheet/scss" type="text/css">
  @import "./../../css/common.scss";

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    overflow: hidden; /* this is important to prevent the whole page to bounce */
  }

  .shade {
    width: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.20);
    position: fixed;
    z-index: 9800;
  }

  .blind-list {
    background: #ffffff;
    z-index: 9999;
    top: 0;
    width: 100%;
    position: fixed;
    overflow: hidden;
    height: pxToRem(450px);

  }

  #wrapper {
    position: absolute;
    z-index: 9999;
    top: 0;
    bottom: 0;
    height: pxToRem(450px);
    left: 0;
    width: 32%;
    background: #f2f2f4;
    overflow: hidden;
  }

  #scroller {
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width: 100%;
    //height: pxToRem(450px);

  }

  #scroller ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

  }

  #scroller li {
    text-align: center;
  }

  #scroller ul li span {
    padding: pxToRem(14px) 0 pxToRem(15px) 0;
    font-size: pxToRem(15px);
    color: #777E8C;
    display: inline-block;
  }

  #scroller ul li div {
    width: pxToRem(90px);
    border-bottom: 1px solid #fff;
    margin-left: pxToRem(15px);
  }

  .checked {
    background: #fff;
    span {
      color: #000;
    }
  }

  #list-right {
    position: absolute;
    z-index: 9999;
    top: 0;
    bottom: 0;
    height: pxToRem(450px);
    right: 0;
    width: 68%;
    background: #fff;
    overflow: hidden;
  }

  #list-wrap {
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width: 100%;
  }

  #list-wrap ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  #list-wrap li {
    padding: pxToRem(14px) 0 0 pxToRem(15px);
  }

  #list-wrap ul li span {
    margin-bottom: pxToRem(15px);
    font-size: pxToRem(15px);
    color: #000;
    display: inline-block;
  }

  #list-wrap ul li div {
    width: pxToRem(225px);
    border-bottom: 1px solid #DDDEE3;
  }

  #list-wrap ul li span .checked {
    color: #007AFF;
  }

  #list-wrap ul li img {
    width: pxToRem(10px);
    position: absolute;
    top: pxToRem(20px);
    right: pxToRem(17px);
  }

</style>
<template>

  <div v-show="showFlag">
    <div class="shade"></div>

    <div id="wrapper" @click="parentCk()" class="">
      <div id="scroller" class="">
        <ul>
          <li v-for="item of leftList" class="row" v-bind:class="item.id" v-bind:style="{ backgroundColor: item.color}">
            <span v-bind:class="item.id">{{item.text}}</span>
            <div v-bind:class="item.id" v-bind:style="{ backgroundColor: item.color}"></div>
          </li>
        </ul>
      </div>
    </div>

    <div id="list-right">
      <div id="list-wrap">
        <ul>
          <li v-for="item of rightList">
            <span>{{item.text}}</span>
            <div></div>
          </li>
        </ul>
      </div>
    </div>

  </div>

</template>
<script>
  import Iscroll from "iscroll";
  import  util from './../../js/common/util';

  export default{
    data(){
      return {
        showFlag: false,
        leftList: [
          {id: '1', text: '企业服务1', color: '#f2f2f4'},
          {id: '2', text: '企业服务2', color: '#f2f2f4'},
          {id: '3', text: '企业服务3', color: '#f2f2f4'},
          {id: '4', text: '企业服务4', color: '#f2f2f4'},
          {id: '5', text: '企业服务1', color: '#f2f2f4'},
          {id: '6', text: '企业服务2', color: '#f2f2f4'},
          {id: '7', text: '企业服务3', color: '#f2f2f4'},
          {id: '8', text: '企业服务4', color: '#f2f2f4'}
        ],
        rightList: [
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'},
          {id: 1, text: '企业服务'}
        ]
      }
    },
    created:function () {

    },
    mounted: function () {
      this.$root.eventHub.$on('open',(target) => {
        this.open()
      });
      let myScroll = new Iscroll('#wrapper', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
      });
      let listScroll = new Iscroll('#list-right', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
      });

      let touchStartPageY = 0;
      let touchEndPageY = 0;
      document.addEventListener('touchstart', function (e) {
        touchStartPageY = e.changedTouches[0].screenY;
      });
      document.addEventListener('touchend', e => {

        let parent = e.target.parentElement;

        if (e.target.className == "shade") {
          this.showFlag = false;
        }

        if (parent.className.indexOf("row") > -1) {

          touchEndPageY = e.changedTouches[0].screenY;
          if (touchStartPageY == touchEndPageY) {
            let id = e.target.className;
            this.parentCk(id);
          }
        }

      });
    },
    computed:function () {

    },
    methods: {
      parentCk: function (id) {

        for (let item of this.leftList) {
          if (item.id == id) {
            item.color = 'white';
          } else {
            item.color = '#F2F2F4';
          }
        }

        //1.拿到当前点击的id
        //2.调用后台接口
        util.post({
          url: '/workflow/traceInfoByInstId?codeFlag=1',
          params: {id: id},
          needJson: false,
          showIndicator: true
        }, (response)=> {
          var response = [
            {id: '1', text: '测试'}
          ]

          this.rightList = response;
        })
        //
      },
      open: function () {
        this.showFlag=true;
      }
    }
  }

</script>
