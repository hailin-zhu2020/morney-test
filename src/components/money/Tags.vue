<template>
  <div class="tags">
    <div class="new">
      <button @click = "create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">{{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class Tags extends Vue{
  @Prop()readonly dataSource: string[] | undefined;//字符串数组
 // @Prop(xxx)只支持JS的类型
  selectedTags:string[]=[];
  toggle(tag:string){
    const index=this.selectedTags.indexOf(tag);
    if(index>=0){
      this.selectedTags.splice(index,1);
    }else{
      this.selectedTags.push(tag);
    }
    this.$emit('update:value',this.selectedTags);//触发update:value这个自定义事件

  }
  create(){
    const name = window.prompt('请输入标签名');
    if(name===''){
      window.alert('标签名不能为空');
    }else if(this.dataSource){
        this.$emit('update:dataSource',
            [...this.dataSource,name]);// this.dataSource.push(name !);//不能改外部数据啊,
      // 改变了就必须同步到外部数据的拥有者
    }

  }

}
</script>

<style lang="scss" scoped>
.tags{
  flex-grow: 1; //将剩下的空间全部占满
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  background: white;

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none; //原button的border丑，所以要先全去掉
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px; //细节
    }
  }
  > .current{
    display: flex;
    flex-wrap: wrap;
    > li{
      $bg:#d9d9d9;
      background:$bg;
      $h:24px;
      height:$h;
      border-radius:$h/2;
      padding:0 16px; //不设宽度，用padding撑大
      margin-right: 12px;
      line-height: $h; //确定只有一行的时候，用line-height=height设置垂直居中
      &.selected{
        background: darken($bg,50%);
        color: white;
      }
    }
  }
}
</style>