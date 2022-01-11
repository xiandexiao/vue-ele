<template>
  <div class="login-container">
    <head-top :head-title="loginWay ? '登录' : '密码登录'" goBack="true"></head-top>
    <form class="login-form">
      <section class="input-container">
        <input type="text" placeholder="账号" v-model.lazy="userAccount">
      </section>
      <section class="input-container">
        <input v-if="!showPassword" type="password" placeholder="密码"  v-model="passWord">
        <input v-else type="text" placeholder="密码"  v-model="passWord">
        <div class="button-switch" :class="{'change-to-text': showPassword}">
          <div class="button-circle" :class="{'trans-to-right': showPassword}" @click="changePassWordType"></div>
          <span>abc...</span>
        </div>
      </section>
      <section class="input-container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img-change-img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="验证码">
          <div class="change-img" @click="getCaptchaCode">
            <span>看不清</span>
            <a href="javascript: void 0;">换一张</a>
          </div>
        </div>
      </section>
    </form>
    <p class="login-tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login-tips">
      注册过的用户可凭账号密码登录
    </p>
    <div class="login-con">
      <a href="javascript: void 0;" class="login-item" @click="mobileLogin">登录</a>
    </div>
    <!--始终使用 kebab-case 的事件名-->
    <alert-tip v-show="showAlert" @close-tip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from '../../components/header/Head';
import alertTip from '../../components/common/AlertTip';
import { mapMutations } from 'vuex'
import { getCaptCode, accountLogin } from '../../service/getData'
export default {
  data(){
    return {
      loginWay: false,
      userAccount: '',
      passWord: '',
      showPassword: false,
      codeNumber: '',
      captchaCodeImg: '',
      // 弹窗配置
      showAlert: false,
      //提示的内容
      alertText: '',
      phoneNumber: null,
      mobileCode: null
    }
  },
  mounted() {
    this.getCaptchaCode();
  },
  components: {
    headTop,
    alertTip
  },
  computed: {
    //判断手机号码
    rightPhoneNumber: function (){
      return /^1\d{10}$/gi.test(this.phoneNumber)
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO',
    ]),
    // 是否展示密码
    changePassWordType() {
      this.showPassword = !this.showPassword;
    },
    // 获取验证码
    getCaptchaCode(){
      getCaptCode().then(
        res => {this.captchaCodeImg = res.code;}
      ).catch(e => {
        this.showAlert = true;
        this.alertText = '获取验证码失败';
      });
    },
    async mobileLogin() {
      if (this.loginWay) {
        if (!this.rightPhoneNumber) {
          this.showAlert = true;
          this.alertText = '手机号码不正确';
          return
        }else if(!(/^\d{6}$/gi.test(this.mobileCode))){
          this.showAlert = true;
          this.alertText = '短信验证码不正确';
          return
        }
        //手机号登录
        //this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
      }else{
        if (!this.userAccount) {
          this.showAlert = true;
          this.alertText = '请输入手机号/邮箱/用户名';
          return
        }else if(!this.passWord){
          this.showAlert = true;
          this.alertText = '请输入密码';
          return
        }else if(!this.codeNumber){
          this.showAlert = true;
          this.alertText = '请输入验证码';
          return
        }
        //用户名登录
        this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
      }
      //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
      if (!this.userInfo.user_id) {
        this.showAlert = true;
        this.alertText = this.userInfo.message;
        if (!this.loginWay) this.getCaptchaCode();
      }else{
        this.RECORD_USERINFO(this.userInfo);
        this.$router.go(-1);
      }
    },
    closeTip(){
      this.showAlert = false;
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';
.login-container{
  padding-top: 1.95rem;
}

.login-form {
  background-color: #fff;
  margin-top: .6rem;
  .input-container {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid #f1f1f1;
    position: relative;
    input {
      font-size: .7rem;
      color: #666;
      outline: none;
    }
    .change-to-text{
      background-color: #4cd964 !important;
    }
    .button-switch {
      background-color: #ccc;
      display: flex;
      justify-content: center;
      width: 2rem;
      height: 0.7rem;
      padding: 0 0.2rem;
      border: 1px;
      border-radius: 0.5rem;
      position: relative;
      span {
        font-size: .45rem;
        color: #fff;
        line-height: .6rem;
      }
      .trans-to-right{
        transform: translateX(1.3rem);
      }
      .button-circle {
        transition: all .3s;
        position: absolute;
        top: -0.2rem;
        z-index: 1;
        left: -0.3rem;
        width: 1.2rem;
        height: 1.2rem;
        box-shadow: 0 0.02667rem 0.05333rem 0 rgb(0 0 0 / 10%);
        background-color: #f1f1f1;
        border-radius: 50%;
      }
    }
    // 验证码
    .img-change-img {
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        width: 50%;
        height: 1.5rem;
      }
      .change-img {
        display: flex;
        flex-direction: column;
        a {
          color: #3b95e9;
          font-size: .55rem;
        }
        span {
          font-size: .55rem;
          color: #666;
        }
      }
    }
  }
}

.login-tips{
  .sc(.5rem, red);
  padding: .4rem .6rem;
  line-height: .5rem;
  a{
    color: #3b95e9;
  }
}
.login-con{
  display: flex;
  justify-content: center;
  .login-item {
    width: 80%;
    .sc(.7rem, #fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }
}
</style>
