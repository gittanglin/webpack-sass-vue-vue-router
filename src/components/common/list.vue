
<style lang="sass" rel="stylesheet/scss" type="text/css">
  @import "./../../css/common";
  .menu{
      height:30px;
      width:25%;
      float:left;
      background:#dddee3;
      line-height:30px;
      text-align:center;
      font-size:25px;
  }
  .list{
      background: #FFFFFF;
      font-size: pxToRem(15px);
      color: #000000;
      font-size:20px;
     li{
          clear:both;
          height:30px;
          line-height:30px;
          border-bottom:1px solid #DDDEE3;
          margin-left:10px;
     }
  }
  .arrow{
      width:15px;
      height:15px;
      margin-left:10px;
  }
 
 
</style>
<template>
    <div>
        <div class="menu" v-for="(item, index) in items" @click=change(index)>
            {{item.name}}
            <img v-show="!item.isActive" class = "arrow" src="../../img/up.png">
            <img v-show="item.isActive" class = "arrow" src="../../img/down.png">
        </div>
        <ul class="list" v-if="tab == 0">
            <li v-for="list in lists1" v-show="show" @click=select(list)>{{list.name}}</li>
        </ul>
        <ul class="list" v-if="tab == 1">
            <li v-for="list in lists2" v-show="show" @click=select(list)>{{list.name}}</li>
        </ul>
        <ul class="list" v-if="tab == 2">
            <li v-for="list in lists3" v-show="show" @click=select(list)>{{list.name}}</li>
        </ul>
        <ul class="list" v-if="tab == 3">
            <li v-for="list in lists4" v-show="show" @click=select(list)>{{list.name}}</li>
        </ul>
    </div>
</template>
<script>
  export default{
    data(){
      return {
        tab: 0,
        show:false,
        //  items:[
        //     {name:'列表1',isActive:false},
        //     {name:'列表2',isActive:false},
        //     {name:'列表3',isActive:false},
        //     {name:'列表4',isActive:false}
        // ],
        // lists1:[
        //     {name:'距离最近'},
        //     {name:'好评优先'},
        //     {name:'人气最高'},
        //     {name:'评价最好'}
        // ],
        // lists2:[
        //     {name:'2'},
        //     {name:'2'},
        //     {name:'2'},
        //     {name:'2'}
        // ],
        // lists3:[
        //     {name:'3'},
        //     {name:'3'},
        //     {name:'3'},
        //     {name:'3'}
        // ],
        // lists4:[
        //     {name:'8'},
        //     {name:'9'},
        //     {name:'10'},
        //     {name:'11'}
        // ]
      }
    },
    props:['items','lists1','lists2','lists3','lists4'],
    methods: {
     change:function(index){
        this.tab = index;
        this.show = !this.show;
        this.items[index].isActive =!this.items[index].isActive;
     },
     select:function(list){  
         //子组件向父组件传值
        this.$emit('message',list.name);
        console.log(list.name);
     }
    },
    events: {
    }

  }
</script>
