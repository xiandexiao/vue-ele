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
  // 解决页面刷新，store数据重置的问题
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
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
