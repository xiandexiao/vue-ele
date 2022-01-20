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
    <ul class="shop-con">
      <li v-for="(item, index) in placeList" :key="index">
        <h4 class="ellipsis">{{item.name}}</h4>
        <p class="ellipsis">{{item.address}}</p>
      </li>
    </ul>
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
      placeList: []
    };
  },
  components: {
    'head-top': headTop
  },
  methods: {
    searchShop (e) {
      if (this.searchText) {
        searchShop(this.cityID, this.searchText).then(res => {
          // this.historytitle = false;
          this.placeList = res;
          // this.placeNone = res.length? false : true;
        })
      }
      e.preventDefault();
    }
  },
  mounted(){
    this.cityID = this.$route.params.cityID;
    //获取当前城市名字
    getCityByID(this.cityID).then(res => {
      this.cityName = res.name;
    })
    //this.initData();
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
}
</style>
