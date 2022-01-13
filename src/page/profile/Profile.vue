<template>
  <div class="profile_page">
    <head-top go-back="true" :head-title="headTitle"></head-top>
    <router-link :to="userInfo&&userInfo.user_id? '/profile/info' : '/login'" class="profile-link">
      <img v-if="userInfo&&userInfo.user_id" :src="imgBaseUrl + userInfo.avatar" class="privateImage" alt="">
      <span v-else class="privateImage">
        <svg class="privateImage-svg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import headTop from '../../components/header/Head';
import {imgBaseUrl} from 'src/config/env'
export default {
  data() {
    return {
      headTitle: '我的',
      imgBaseUrl,
      username: '登录/注册',
      mobile: '暂无绑定手机号',
    }
  },
  components: {
    headTop
  },
  computed: {
    ...mapState([
      'userInfo',
    ]),
  }
}
</script>

<style scoped>

</style>
