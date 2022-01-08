<template>
  <div class="login-container">
    <head-top :head-title="loginWay ? '登录' : '密码登录'" goBack="true"></head-top>
  </div>
</template>

<script>
import headTop from '../../components/header/Head'
import {mapState, mapMutations} from 'vuex'
export default {
  data(){
    return {
      loginWay: false
    }
  },
  created(){

  },
  components: {
    headTop
  },
  computed: {

  },
  methods: {


  }
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';
.login-container{
  padding-top: 1.95rem;
  p, span, input{
    font-family: Helvetica Neue,Tahoma,Arial,serif;
  }
}
</style>
