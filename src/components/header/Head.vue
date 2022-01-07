<template>
  <header id="head-top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
  </header>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  props: ['goBack'],
  computed: {},
  methods: {},
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';

#head-top {
  .flex;
  background-color: @blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  padding: 0 0.2rem;
  .wh(100%, 1.95rem);
}
.head-go-back{
  left: 0.4rem;
  .wh(0.6rem, 1rem);
  line-height: 2.2rem;
  margin-left: .4rem;
}
</style>
