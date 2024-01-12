import share from './share/index'

export default {
  install(app) {
    app.mixin(share)
  },
}
