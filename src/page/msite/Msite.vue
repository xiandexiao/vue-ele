<template>
  <div>
    <head-top :head-title="msiteTitle" :show-home="true">
      <template v-slot:search>
        <router-link to="/search/geohash" class="svg-con">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"/>
          </svg>
        </router-link>
      </template>
      <template v-slot:home>
        <router-link to="/home" class="svg-con">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home"/>
          </svg>
        </router-link>
      </template>
    </head-top>
  </div>
</template>

<script>
import headTop from 'src/components/header/Head';
import {getAddressByGeo, cityGuess} from 'src/service/getData';

export default {
  name: "Msite",
  data() {
    return {
      msiteTitle: '请选择地址...'
    }
  },
  components: {
    headTop
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      // 获取默认
      const address = await cityGuess();
      this.geohash = address.latitude + ',' + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }

    // 查询地址名
    let res = await getAddressByGeo(this.geohash);
    this.msiteTitle = res.name;
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.svg-con {
  display: flex;
  height: 100%;
  width: 10%;
  align-items: center;
  justify-content: center;

  svg {
    width: 50%;
    height: 40%;
    stroke: #fff;
  }
}

</style>
