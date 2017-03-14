<style lang="sass" rel="stylesheet/scss" type="text/css">
  @import "./../../css/common";

  .search {
    background: #f2f2f4;
    //border-bottom: 1px solid ;
    .searchImg {
      display: inline;
      position: absolute;
      width: pxToRem(12px);
      height: pxToRem(12px);
      margin-left: 28%;
      margin-top: pxToRem(16px);
    }
    .searchImgInput {
      display: inline;
      position: absolute;
      width: pxToRem(12px);
      height: pxToRem(12px);
      margin-left: 4%;
      margin-top: pxToRem(18px);
    }
    #searchDelImg {
      display: inline;
      position: absolute;
      width: pxToRem(12px);
      height: pxToRem(12px);
      left: 0;
      margin-top: pxToRem(17px);
      margin-left: 77%;
    }
    .input {
      border: 0;
      outline: none;
      background: #ffffff;
      border-radius: pxToRem(5px);
      width: 95%;
      height: pxToRem(28px);
      margin: pxToRem(8px);
      text-align: center;
      font-size: pxToRem(14px);
    }
    .showInput {
      border: 0;
      outline: none;
      background: #ffffff;
      border-radius: pxToRem(5px);
      width: 80%;
      //height: pxToRem(28px);
      padding-top: pxToRem(7px);
      padding-bottom: pxToRem(7px);
      margin: pxToRem(8px);
      text-align: left;
      padding-left: pxToRem(25px);
      font-size: pxToRem(14px);
      //font-family: microsoft yahei;
    }
    span {
      font-size: pxToRem(17px);
      color: #007aff;
      text-align: left;
      position: absolute;
      padding-top: pxToRem(13px);
      padding-left: pxToRem(5px);
    }
  }
</style>
<template>
  <div class="search">
    <img src="../../img/search.png" class="searchImg" v-bind:class="[hideDel?'searchImgInput':'searchImg']">

    <input type="search" maxlength="18" placeholder="请输入办事事项名称" @click="seachCk" v-bind:class="[hideDel?'showInput':'input']"
           v-model="searchTxt" @keyup="seachCk">

    <img src="../../img/searchDel.png" id="searchDelImg" v-show="hideDel" @click="delSearch">

    <span v-show="hide" @click="cancelSearch">取消</span>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        hideDel: false,
        hide: false,
        searchTxt: '',
      }
    },
    methods: {
      //搜索
      seachCk: function (event) {
        this.hideDel = true;
        this.hide = true;

        if (event.type != 'click') {
          this.$emit('child-searchTxt')
          //this.$dispatch('child-searchTxt', this.searchTxt);
        } else {
          //this.$dispatch('child-searchTxtCk', this.searchTxt);
        }
      }
      ,
      cancelSearch: function () {
        this.hideDel = false;
        this.hide = false;
        this.searchTxt = '';
        //this.$dispatch('child-cancelSearch', this.searchTxt);
      }
      ,
      delSearch: function () {
        this.searchTxt = '';
        //this.$dispatch('child-delSearch', this.searchTxt);
      }
    },
    events: {
      //输入文字
      'searchTxt': function (msg) {
        this.searchTxt = msg;
        this.seachCk();
      }
    },
    props:{

    }

  }
</script>
