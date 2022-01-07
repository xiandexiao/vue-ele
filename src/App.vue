<template>
  <div>
    <!--  给任何元素和组件添加进入/离开过渡  -->
    <!--  name是过渡css的前缀  -->
    <transition name="router-fade" mode="out-in">
      <!-- 失活的组件将会被缓存！保留组件状态或避免重新渲染-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from './components/common/svg';

export default {
  components: {
    svgIcon
  },
}
</script>

<style lang="less">
@import 'style/common.less';

.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}

.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
