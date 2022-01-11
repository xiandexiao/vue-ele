import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'

// 获取用户信息
export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});

// 获取图片验证码
export const getCaptCode = () => fetch('/v1/captchas', {},'POST');

// 账号密码登录
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');
