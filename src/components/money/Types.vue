<template>
  <div>
    <ul class="types">
      <li :class="type==='-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type==='+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Types",
  props:['xxx'],
  data(){
     return{
       type:'-'//‘-’表示支出，'+'表示收入
     }
  },
  mounted() {
    console.log(this.xxx);
  },
  methods:{
    selectType(type){//type只能是'-'和'+'中的一个
      if(type!=='-' && type!=='+'){
        throw new Error('type is unknown');
      }
      this.type=type;
    }
  },

}
</script>

<style lang="scss" scoped>
.types{
  background: #c4c4c4;
  display: flex;
  font-size: 24px;
  text-align: center;
  > li{
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position:relative;
    &.selected::after{//&表示自身
      content:'';
      position: absolute;
      bottom:0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>