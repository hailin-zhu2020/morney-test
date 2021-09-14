<template>

  <Layout class-prefix = 'layout'>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync ="record.types" />
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">

import Vue from 'vue';

import {Component, Watch} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';

const recordList:Record[]= JSON.parse(window.localStorage.getItem("recordList")||'[]');

type Record={
  tags:string[]
  notes:string
  types:string
  amount:number //数据类型
  createAt?:Date //类或者叫构造函数 //？表示可以不存在
}//类型声明
@Component({
  components: {Tags, Notes, Types, NumberPad}
})

export default class Money extends Vue{
  tags=['衣','食','住','行'];
  recordList:Record[]=recordList;
  record:Record = {tags:[],notes:'',types:'-',amount:0}; //定义变量并初始化
  // 如果有初始值，可以不用类型声明
  onUpdateTags(value:string[]){
    this.record.tags = value;
  }
  onUpdateNotes(value:string){
   this.record.notes = value;
  }
  saveRecord(){
    const record2:Record= JSON.parse(JSON.stringify(this.record));//深拷贝一下，每次都将record的副本存入recordList
    record2.createAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
  }



}
</script>
<style lang="scss"> //没有scoped，就能影响其他的组件
 .layout-content{
    display: flex;
   flex-direction: column-reverse; //从底部开始布局
 }

</style>


