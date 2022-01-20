import App from '../App'
// 所有组件都打包在同个异步块 (chunk)
const Home = () => import(/* webpackChunkName: "chunk" */ '../page/home/Home')
const Login = () => import(/* webpackChunkName: "chunk" */ '../page/login/login')
const Profile = () => import(/* webpackChunkName: "chunk" */ '../page/profile/Profile')
const City = () => import(/* webpackChunkName: "chunk" */ '../page/city/City')
export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页城市列表页
    {
      path: '/home',
      component: Home
    },
    // 登录
    {
      path: '/login',
      component: Login
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/city/:cityID',
      component: City
    }
  ]
}]
