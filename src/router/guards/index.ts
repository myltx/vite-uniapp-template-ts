import permission from './permission/index'
import realname from './realname/index'

import { defineMiddleware } from '$uni-router/middleware'

export default (app, router) => {
  permission(router, { app })
  defineMiddleware('realname', realname, { router, app })
}
