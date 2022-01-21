<template>
  <div class="city-container">
    <head-top :head-title="cityName" go-back='true'>
      <!--  v-slot 只能添加在 <template> 上-->
      <template v-slot:changeCity>
        <router-link to="/home" class="change-city">切换城市</router-link>
      </template>
    </head-top>
    <form class="city-form" @submit="searchShop">
      <div>
        <input type="text" autocomplete="off" placeholder="输入学校、商务楼、地址" v-model="searchText">
      </div>
      <div>
        <button type="button" @click="searchShop">查找</button>
      </div>
    </form>
    <header v-show="historyTitle" class="history-title">搜索历史</header>
    <ul class="shop-con">
      <li v-for="(item, index) in placeList" :key="index" @click="nextPage(index, item.geohash)">
        <h4 class="ellipsis">{{item.name}}</h4>
        <p class="ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <footer v-show="historyTitle&&placeList.length" class="clear-all" @click="clearPlaceList">清空所有</footer>
    <p class="search-none" v-if="placeNone">很抱歉！无搜索结果</p>
  </div>
</template>

<script>
import headTop from 'src/components/header/Head';
import {getCityByID, searchShop} from 'src/service/getData';

export default {
  name: "City",
  data() {
    return {
      cityName: '',
      cityID: '',
      searchText: '',
      historyTitle: false,
      placeList: [],
      placeNone: false
    };
  },
  components: {
    'head-top': headTop
  },
  methods: {
    searchShop (e) {
      if (this.searchText) {
        searchShop(this.cityID, this.searchText).then(res => {
          this.historyTitle = false;
          this.placeList = res;
          this.placeNone = !res.length;
        })
      }
      e.preventDefault();
    },
    // 展示浏览地址记录，最多5条，超过删除
    showHistory() {
      let placeList = localStorage.getItem('placeList');
      if (placeList) {
        placeList = JSON.parse(placeList);
        this.placeList = placeList;
        this.historyTitle = true;
      } else {
        this.placeList = [];
      }
    },
    // 储存搜索历史，从后往前遍历，留下最新5条
    // 跳转到详情页面
    nextPage(index, geohash) {
      let oldPlaceList = localStorage.getItem('placeList');
      let currentItem = this.placeList[index];
      if (oldPlaceList) {
        oldPlaceList = JSON.parse(oldPlaceList);
        oldPlaceList = oldPlaceList.filter((item, itemIndex) => {
          if (itemIndex > 4) {
            return false;
          }
          return item.geohash !== currentItem.geohash;
        });
      } else {
        oldPlaceList = [];
      }
      if (oldPlaceList.length === 5) {
        oldPlaceList.pop();
      }
      oldPlaceList.unshift(currentItem);
      localStorage.setItem('placeList', JSON.stringify(oldPlaceList));

      this.$router.push({
        path:'/msite',
        query:{geohash: currentItem.geohash}
      });
    },
    clearPlaceList() {
      localStorage.setItem('placeList', '');
      this.showHistory();
    }
  },
  mounted(){
    this.cityID = this.$route.params.cityID;
    //获取当前城市名字
    getCityByID(this.cityID).then(res => {
      this.cityName = res.name;
    });
    this.showHistory();
  },
}
</script>

<style lang="less" scoped>
// ~ 视为模块解析是 webpack 做的事，不是 css-loader 做的事
@import '~src/style/mixin';

.city-container {
padding-top: @headHeight;

  .change-city {
    font-size: .6rem;
    color: #fff;
  }

  .city-form {
    display: flex;
    flex-direction: column;
    margin-top: .4rem;
    background-color: #fff;

    div {
      display: flex;
      justify-content: center;
    }

    input, button {
      width: 90%;
      height: 1.4rem;
      border-radius: 0.1rem;
      margin: 0.3rem 0;
    }

    input {
      border: 1px solid #e4e4e4;
      font-size: .65rem;
      color: #333;
      padding-left: .2rem;
    }

    button {
      background-color: #3190e8;
      font-size: .65rem;
      color: #fff;
    }
  }

  .history-title {
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    font-size: .47rem;
    padding: 0 .4rem;
  }

  .shop-con {
    background-color: #fff;
    border-top: 1px solid #e4e4e4;

     li {
       margin: 0 auto;
       padding-top: 0.65rem;
       border-bottom: 1px solid #e4e4e4;

       h4 {
         margin: 0 auto 0.35rem;
         width: 90%;
         font-size: .65rem;
         color: #333;
       }

       p {
         width: 90%;
         margin: 0 auto 0.55rem;
         font-size: .45rem;
         color: #999;
       }
     }
  }

  .clear-all {
    font-size: .7rem;
    color: #666;
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
  }

  .search-none {
    border-top: 1px solid #e4e4e4;
    color: #333;
    background-color: #fff;
    padding: .5rem;
    font-size: .65rem;
  }
}
</style>
