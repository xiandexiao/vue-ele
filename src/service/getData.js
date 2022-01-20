import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'

// 获取用户信息
export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});

// 获取图片验证码
export const getCaptCode = () => fetch('/v1/captchas', {},'POST');

// 账号密码登录
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');

// 获取首页默认地址
export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});

// 获取热门城市
export const hotcity = () => fetch('/v1/cities', {
  type: 'hot'
});

// 获取首页所有城市
export const groupcity = () => fetch('/v1/cities', {
  type: 'group'
});

// 通过ID获取城市
export const getCityByID = cityID => fetch('/v1/cities/' + cityID)

// 获取搜索地址
export const searchShop = (cityID, value) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityID,
  keyword: value
});
