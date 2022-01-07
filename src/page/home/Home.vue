<template>
  <div>
    <head-top>
      <template v-slot:logo>
        <span class="head-logo" @click="reload">ele.me</span>
      </template>
    </head-top>
  </div>
</template>

<script>
import headTop from "../../components/header/Head";

export default {
  data() {
    return {}
  },
  mounted() {

  },
  components: {
    headTop
  },
  computed: {},
  methods: {
    //点击图标刷新页面
    reload() {
      window.location.reload();
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';

.head-logo {
  font-weight: 400;
  .sc(0.7rem, #fff);
}
</style>
