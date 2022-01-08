import { getUser } from '../service/getData';
import { GET_USERINFO } from './mutation-types.js'

export default {
  // context解构
  async getUserInfo({ commit, state }) {
    let res = await getUser();
    console.log(`res ${res}`)
    commit(GET_USERINFO, res)
  }
}
