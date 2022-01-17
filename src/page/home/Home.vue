<template>
  <div>
    <head-top  sign-in-up='home'>
      <template v-slot:logo>
        <span class="head-logo" @click="reload">ele.me</span>
      </template>
    </head-top>
    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess-city">
        <span>{{ guessCity }}</span>
        <svg class="arrow-right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
    <div class="city-con">
      <div class="city-title">热门城市</div>
      <ul>
        <router-link
          tag="li"
          v-for="item in hotcity"
          :to="'/city/' + item.id"
          :key="item.id"
          :title="item.name"
          class="ellipsis"
        >
          {{ item.name }}
        </router-link>
      </ul>
    </div>
    <div class="city-con">
      <template v-for="(value, key, index) in groupCitySortByLetter">
        <div class="city-title" :key="key">
          {{ key }}
          <span v-if="index === 0">（按字母排序）</span>
        </div>
        <ul>
          <router-link  tag="li"
                        v-for="item in value"
                        :to="'/city/' + item.id"
                        :key="item.id"
                        :title="item.name"
                        class="ellipsis"
          >
            {{ item.name }}
          </router-link>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/header/Head";
import { cityGuess,hotcity,groupcity } from 'src/service/getData';

export default {
  data() {
    return {
      guessCity: '',
      guessCityid: '',
      hotcity: [],
      groupCity: []
    }
  },
  mounted() {
    cityGuess().then(res => {
      this.guessCity = res.name;
      this.guessCityid = res.id;
    });
    hotcity().then(res => {
      this.hotcity = res;
    });
    groupcity().then(res => {
      this.groupCity = res;
    })
  },
  components: {
    headTop
  },
  computed: {
    groupCitySortByLetter() {
      let res = {};
      for (let i = 65; i <= 90; i++) {
        if (this.groupCity[String.fromCharCode(i)]) {
          res[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)];
        }
      }
      return res
    }
  },
  filters: {
    trim(value) {
      console.log(value)
      if (!value) return '';
      return value.trim();
    }
  },
  methods: {
    //点击图标刷新页面
    reload() {
      window.location.reload();
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';

.city-title {
  color: #666;
  font-size: .55rem;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  padding: .2rem .45rem;
}

.head-logo {
  font-weight: 400;
  .sc(0.7rem, #fff);
}

// 定位
.city-nav {
  display: flex;
  flex-direction: column;
  padding-top: 1.95rem;
  background-color: #fff;

  .city-tip {
    display: flex;
    justify-content: space-between;
    padding: .6rem .45rem;

    span:first-of-type {
      font-size: .55rem;
      color: #666;
    }

    span:last-of-type {
      font-size: .475rem;
      color: #9f9f9f;
      font-weight: bolder;
    }
  }

  .guess-city {
    display: flex;
    justify-content: space-between;
    padding: .6rem .45rem;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    align-items: center;

    span:first-of-type {
      color: #3190e8;
      font-size: 0.75rem;
    }

    .arrow-right {
      width: 0.6rem;
      height: 0.6rem;
      fill: #999;
    }
  }
}

// 热门
.city-con {
  display: flex;
  flex-direction: column;
  margin-top: .5rem;
  background-color: #fff;

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      font-size: .6rem;
      color: #3190e8;
      cursor: pointer;
      width: 25%;
      padding: .55rem 0;
      text-align: center;
      border-right: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
    }
  }
}
</style>
