# vite-uniapp-template-ts

🚀 基于 vite 驱动的 uniapp 最佳实践集成模板

在 [vite-uniapp-template](https://github.com/viarotel-org/vite-uniapp-template) 基础上修改为ts版本

<!-- [查看演示](https://vite-uniapp-template.netlify.app/) -->

## 特点

- 💪 Assets: 提供了全局静态资源加载工具，无感切换加载本地静态资源/远程静态资源，解决小程序环境下包大小限制问题。
- 📦 SubPackages: 符合心智模型的分包风格，合理的 pages 目录结构，与分包配置轻松实现功能分包。
- 🛣 Router: 使用 [uniapp-router-next](https://gitee.com/wen-jason/uni-router/tree/main/packages/uniapp-router-next)，并通过优化封装，API 同 VueRouter 类似，扩展了拦截器、中间件、路由别名功能。
- 📊 Store: 使用 [Pinia](https://pinia.vuejs.org/zh/) 强力驱动，轻松实现应用状态管理。
- ⚡️ Request: 请求库使用 [uni-network](https://github.com/uni-helper/uni-network) 完全基于 uniapp API 编写的高性能请求库， API 同 axios。
- 👇 Z-paging: 内置了高性能且易于使用的业务常用下拉分页组件模块，轻松实现下拉刷新、上拉加载等功能。
- 💅 Unocss: 使用原子化 CSS 引擎，小程序环境下依然完美支持原子化的 class 命名书写规则。
- 🎨 UI-libs: 预设了 [uv-ui](https://www.uvui.cn/) 和 [uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html) 两者相辅相成，轻松满足绝大多数业务场景，并支持主题色定制功能。
- ~~📝 NoTs: 只使用 JavaScript，在常规业务场景或人员水平差距过大情况下，TypeScript 并不会提升开发体验。~~
- 添加TypeScript支持
- unplugin-auto-import: 按需自动导入 Vite、Webpack、Rspack、Rollup 和 esbuild 的 API。具有 TypeScript 支持。
- 代码结构为 setup 语法糖模式

## 体验地址
![alt text](gh_8cdc1414225d_430.jpg)
<!-- [vite-uniapp-template-ts](https://vite-uniapp-template-ts.myltx.top/#/) -->
## 使用方法

### 克隆项目

```shell
git clone git@github.com:myltx/vite-uniapp-template-ts.git
# or
git clone https://github.com/myltx/vite-uniapp-template-ts.git
```

### 安装项目依赖

> 打开并进入克隆的项目根目录下执行以下命令
> 以下命令推荐 使用 pnpm 进行操作 不过你依然可以使用 npm/yarn

```shell
pnpm install
```

### 运行项目

#### 任意编辑器直接运行本项目

```shell
# h5端
pnpm dev:h5
# 微信小程序端
pnpm dev:mp-weixin
# 安卓端
pnpm dev:app-android
#... 更多端请参阅 package.json/script
```

#### 在 HBuilder 中运行本项目

1. 将项目拖动到 HBuilder 中
2. 使用 pnpm install 安装好依赖
3. 点击项目 /src 目录中的任意文件
4. 点击编辑器上方点击运行选择需要运行的环境

### 功能示例

#### 静态资源处理

```js
// 使用远程静态资源
import { useAssets } from './utils/assets/remote'

// 使用本地静态资源
import { useAssets } from './utils/assets/local'

// 全局挂载
app.config.globalProperties.$assets = useAssets

// template中使用
//  <img :src="$assets('/temp.png')" />
```

#### 全局主题色定制

> 由 [unocss-preset-shades](https://github.com/viarotel-org/packages/tree/main/packages/unocss-preset-shades#readme) 提供支持

```html
<!-- 设置文本色为主题色色调为 500 -->
<div class="text-primary-500"></div>
<!-- 设置背景色为主题色色调为 500 -->
<div class="bg-primary-500"></div>
<!-- 设置边框色为主题色色调为 500 -->
<div class="border border-primary-500"></div>
<!-- 更多使用方式请参阅 https://tailwindcss.com/docs -->
```

#### 请求后端数据

> 详细使用请参阅 [uni-network](https://github.com/uni-helper/uni-network)

```js
import request from '@/utils/request/index'

// GET
request.get(
  '/mock',
  { id: 'mock-id' },
  {
    /* More option */
  }
)

// POST
request.post(
  '/mock',
  { id: 'mock-id' },
  {
    /* More option */
  }
)

// Upload
request.upload({
  url: '/mock',
  dataType: 'json',
  headers: {
    'content-type': 'multipart/form-data',
  },
})

// Common
request({
  method: 'post',
  url: '/mock',
  data: {
    id: 'mock-id',
  },
  headers: {
    'content-type': 'application/json',
  },
})

// 扩展方法

// 继承于 request.post，请求头默认添加 'Content-Type': 'multipart/form-data'
request.form(
  '/mock',
  { id: 'mock-id' },
  {
    /* More option */
  }
)

// 继承于 request.post，请求头默认添加 'Content-Type': 'application/x-www-form-urlencoded'
request.query(
  '/mock',
  { id: 'mock-id' },
  {
    /* More option */
  }
)
```
#### 加载远端文件涉及到文件以及方法

```typescript
// 在 .env[mode] 文件中对应修改即可  
VITE_APP_FILE_URL = ''
VITE_APP_FILE_PATH = ''

```

- 其他具体的配置可以查看 `.env[mode]` 文件
- [remote](./src/utils/assets/remote.ts) 的 `useAssets` 为加载远端文件方法
- 已经挂载至全局 使用 `$assets('wx_logo.png')` 即可
- 为了解决 css 背景图样式使用 远程资源问题 
- 使用 `setRemoteBg` 即可配置行内背景图样式
- 具体参数 在 [remote](./src/utils/assets/remote.ts) 中 `setRemoteBg` 方法查看
- 已经挂载至全局 使用 `$setRemoteBg('wx_logo.png', {})` 即可

#### request 请求地址修改

```typescript
// 在 .env[mode] 文件中对应修改即可  
 // 请求地址
VITE_APP_API_URL = 'https://www.xxx.com'
// 代理路径
ITE_APP_PROXY_PATH = /api


```
-  其他具体的配置可以查看 `.env[mode]` 文件
#### env [文件类型配置](./src/vite-env.d.ts)
```typescript
// src/vite-env.d.ts
// 添加对应字段类型即可
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_FILE_URL: string;
  readonly VITE_APP_FILE_PATH: string;
  readonly VITE_APP_PROXY_PATH: string;
  readonly VITE_APP_REQUEST_PATH: string;
  readonly VITE_APP_BASE_PATH: string;
  readonly VITE_APP_PROXY_PORT: number;
  readonly VITE_APP_USE_REMOTE_MENU: boolean;
  readonly VITE_GLOB_APP_NAME: string;
  readonly VITE_GLOB_HOME_PAGE: string;
  readonly VITE_APP_USE_ENCRYPT: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

```


#### 路由间功能跳转

```js
// 跳转页面
const methods = {
  routerDemo() {
    this.$Router.push({
      path: '/login',
      query: {
        id: 'id',
      },
    })
    // 获取页面参数
    this.$Route.query.id

    // 关闭当前页面跳转到某个页面
    this.$Router.replace('/login')
    // 关闭所有打开的页面跳转到某个页面
    this.$Router.replaceAll('/login')
  },
}

// 为路由设置别名
// pages.config.js 中
const aliasConfig = {
  path: 'pages/login/index',
  // 通过添加 aliasPath 字段
  aliasPath: '/login',
}
```

#### 使用路由守卫

> 位于 router/guards 中

```js
import store from '@/store/index'

const homePath = '/pages/index/index'
const loginPath = '/pages/login/index'

const whiteList = [loginPath]

export default (router) => {
  const userStore = store.useUserStore()

  const loginRoute = to => ({
    path: loginPath,
    navType: 'reLaunch',
    force: true,
    query: {
      redirect: {
        path: to.path,
        query: to.query,
      },
    },
  })

  router.beforeEach((to, from, next) => {
    // console.log('permission.beforeEach.to', to)
    // console.log('permission.beforeEach.from', from)

    const token = userStore.token
    const userId = userStore.userId

    console.log('token', token)
    console.log('userId', userId)

    if (token) {
      if (to.path === loginPath) {
        next(homePath)
      }
      else if (userId) {
        next()
      }
      else {
        userStore
          .getUserInfo()
          .then(() => {
            next()
          })
          .catch((error) => {
            console.warn(error)
            userStore.logout({ silenced: true })
            next(loginRoute(to))
          })
      }
    }
    else if (whiteList.includes(to.path)) {
      next()
    }
    else {
      next(loginRoute(to))
    }
  })

  router.afterEach(() => {})
}
```

#### 使用基于路由的中间件

> pages.config.js 中

```js
// 使用名为 realname 的中间件
const pageConfig = {
  path: '/pages/personal/index',
  aliasPath: '/personal',
  meta: {
    middleware: ['realname'],
  },
}
```

定义中间件

> router/guards/index.ts 中

```js
// 使用 defineMiddleware 定义并包装为中间件
import realname from './realname/index'
import { defineMiddleware } from '$uni-router/middleware'

export default (app, router) => {
  // 使用 defineMiddleware 定义了路由中间件
  defineMiddleware(realname, { router, app })
}
```

编写路由中间件代码

> router/guards/realname/index.ts 中

```js
import store from '@/store/index'
import { useDialog, useToast } from '@/utils/modals'

export default (router) => {
  const userStore = store.useUserStore()

  router.beforeEach((to, from, next) => {
    console.log('realname.beforeEach.to', to)
    console.log('realname.beforeEach.from', from)

    const realStatus = userStore.userInfo.realStatus

    switch (realStatus) {
      case 3:
        next()
        break
      case 2:
        useToast('实名审核中, 请稍后再试').then(() => {
          next(false)
        })
        break
      case 4:
        useDialog(`${userStore.userInfo.auditResult || '提交的实名信息不符'}`, {
          title: '实名失败',
          showCancelButton: true,
          confirmText: '重新认证',
        })
          .then(() => {
            next({ path: '/pages/realname/index' })
          })
          .catch(() => {
            next(false)
          })
        break
      default:
        useDialog('请先进行实名认证', { showCancelButton: true })
          .then(() => {
            next({ path: '/pages/realname/index' })
          })
          .catch(() => {
            next(false)
          })
        break
    }
  })
  // router.afterEach(() => {})
}
```

路由跳转

```typescript
import { useRouter } from '$uni-router'

const router = useRouter()
router.navigateTo('/');
```
### 使用 Script Setup
改用 Script Setup 写法导入 API
```typescript
<script setup>
// 已经引入了 unplugin-auto-import 插件，不需要再手动导入 api
// import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'
const title = ref('Hello')
onReady(() => {
  console.log('onReady')
})
</script>

```
[路由配置](./ROUTER_CONFIG.md)


### 主要使用的包

- vitejs
- uniapp
- pinia
- uview-plus
- uni-ui
- @uni-helper/uni-network
- uniapp-router-next
- z-paging
- unocss
- unocss-applet
- unplugin-auto-import

### 常见问题

#### 无法正常安装依赖/无法启动

删除 pnpm-lock.yaml / yarn.lock / package-lock.json 文件后重新安装依赖

### Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

[Git提交添加emoji图标](https://github.com/Byron4j/CookBook/blob/master/Git/gitCookbook/1-Git%E6%8F%90%E4%BA%A4%E6%B7%BB%E5%8A%A0emoji%E5%9B%BE%E6%A0%87.md)