<template>
  <Layout class-prefix = 'layout'>
    <NumberPad/>
    <Types :xxx = "333"/>
    <Notes/>
    <Tags/>
  </Layout>
</template>

<script>
import NumberPad from "@/components/money/NumberPad";
import Types from "@/components/money/Types";
import Notes from "@/components/money/Notes";
import Tags from "@/components/money/Tags";
export default {
  name: "Money.vue",
  components: {Tags, Notes, Types, NumberPad},
}
</script>
<style lang="scss"> //没有scoped，就能影响其他的组件
 .layout-content{
    display: flex;
   flex-direction: column-reverse; //从底部开始布局
 }

</style>


