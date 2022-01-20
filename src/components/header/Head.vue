<template>
  <header id="head-top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <a class="head-go-back" v-if="goBack" @click="$router.go(-1)" href="javascript: void 0;">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <polyline points="24,30 4,15 24,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </a>
    <router-link :to="userInfo ? '/profile' : '/login'" v-if='signInUp' class="head-login">
      <svg v-if="userInfo" class="user-avatar">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span v-else class="login-span">登录|注册</span>
    </router-link>
    <section class="title-head ellipsis" v-if="headTitle">
      <span class="title-text">{{ headTitle }}</span>
    </section>
    <slot name="changeCity"></slot>
  </header>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
    }
  },
  mounted() {
    //获取用户信息
    if (!this.userInfo) this.getUserInfo();
  },
  props: ['signInUp', 'goBack', 'headTitle'],
  computed: {
    ...mapState([
      'userInfo'
    ]),
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
  },
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
  .wh(100%, @headHeight);
}
.head-go-back{
  width: 0.7rem;
  height: 1rem;
}
.head-login{
  .sc(0.7rem, #fff);
  .login-span{
    color: #fff;
  }
  .user-avatar{
    fill: #fff;
    .wh(.8rem, .8rem);
  }
}
.title-head{
  width: 50%;
  color: #fff;
  text-align: center;
  .title-text {
    .sc(0.8rem, #fff);
    text-align: center;
    font-weight: bold;
  }
  flex: 1;
}
</style>
