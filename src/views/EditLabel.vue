<template>
  <Layout>
    <div>
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>
    <Notes filed-name="标签名" placeholder="请输入标签名"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Notes from '@/components/money/Notes.vue';

@Component({
  components: {Notes}
})

export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;//路由相关的放$route,路由器相关的放$router
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');//转发 replace可回退，
      // push回去了也会自动跳转到404页面，从而导致不能回退
    }
  }
}
</script>

<style lang="scss" scoped>

</style>