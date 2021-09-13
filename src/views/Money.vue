<template>
  <Layout class-prefix = 'layout'>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons" >
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">OK</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注"/>
      </label>
    </div>
    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
  </Layout>
</template>

<script>
export default {
  name: "Money.vue",
}
</script>
<style lang="scss"> //没有scoped，就能影响其他的组件
 .layout-content{
    border:3px solid red;
    display: flex;
   flex-direction: column-reverse; //从底部开始布局
 }

</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad{
  .output{
    @extend  %clearFix;
    @extend %innerShadow;
    font-size:36px;
    font-family: Consolas,monospace;//设置等宽字体
    padding:9px 16px;
    text-align: right; //文本对齐方式

  }
  .buttons{
    @extend %clearFix; //将选择器复制到%x的位置，减少复制的量
    button{
      width: 25%;//一行四个
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok{
        height: 64*2px;
        float: right;
      }
      &.zero{
        width:25*2%;
      }
      $bg:#f2f2f2;
      &:nth-child(1){
        background: $bg;
      }
      &:nth-child(2),&:nth-child(5){
        background: darken($bg,4%); //darken为颜色函数
      }
      &:nth-child(3),&:nth-child(6),&:nth-child(9){
        background: darken($bg,4*2%); //darken为颜色函数
      }
      &:nth-child(4),&:nth-child(7),&:nth-child(10){
        background: darken($bg,4*3%); //darken为颜色函数
      }
      &:nth-child(8),&:nth-child(11),&:nth-child(13){
        background: darken($bg,4*4%); //darken为颜色函数
      }
      &:nth-child(12),&:nth-child(14){
        background: darken($bg,4*5%); //darken为颜色函数
      }
    }

  }
}
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
.notes{
  background:#f5f5f5;
  font-size: 14px;
  padding-left:16px;
  display: flex;
  align-items:center;
  .name{
    padding-right:16px;
  }
  input{
    height:64px; //padding line-height
    flex-grow: 1;  //代替width
    background: transparent;
    border: none;
    padding-right:16px;
  }
}
.tags{
  flex-grow: 1; //将剩下的空间全部占满
  font-size:14px;
  padding:16px;
  display: flex;
  flex-direction: column-reverse;
  >.new{
    padding-top: 16px;
    button{
      background: transparent;
      border: none; //原button的border丑，所以要先全去掉
      color: #999;
      border-bottom:1px solid;
      padding:0 4px; //细节
    }
  }
  > .current{
    display: flex;
    flex-wrap: wrap;
    > li{
      background:#d9d9d9;
      $h:24px;
      height:$h;
      border-radius:$h/2;
      padding:0 16px; //不设宽度，用padding撑大
      margin-right: 12px;
      line-height: $h; //确定只有一行的时候，用line-height=height设置垂直居中
    }
  }
}
</style>

