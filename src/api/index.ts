import * as base from './base/index'
import * as user from './user/index'
import * as home from './home/index'
import * as realname from './realname/index'

const api = {
  ...base,
  ...user,
  ...home,
  ...realname,
}

export default {
  install(app) {
    app.config.globalProperties.$api = api
  },
}
