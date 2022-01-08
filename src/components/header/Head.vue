<template>
  <header id="head-top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="head-go-back" v-if="goBack" @click="$router.go(-1)">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    <router-link :to="userInfo ? '/profile' : '/login'" v-if='signInUp' class="head-login">
      <svg class="user-avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login-span" v-else>登录|注册</span>
    </router-link>
    <section class="title-head ellipsis" v-if="headTitle">
      <span class="title-text">{{ headTitle }}</span>
    </section>
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
    this.getUserInfo();
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
  .wh(100%, 1.95rem);
}
.head-go-back{
  .wh(0.6rem, 1rem);
  line-height: 2.2rem;
  margin-left: .4rem;
}
.head-login{
  .sc(0.7rem, #fff);
  .login-span{
    color: #fff;
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
}
</style>
