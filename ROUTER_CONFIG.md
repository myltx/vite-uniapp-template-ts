### 1. 需要修改文件
    
```
pages.config.ts
```
    
2. 非分包路由

```typescript
// 在 pages 数组直接添加对象 
 pages: [
     {
        path: 'pages/index/home/index',
        aliasPath: '/',
        tyle: {
            navigationBarTitleText: '主页',
        },
    },
]
```
 

3. 分包路由


```typescript
// 在 pages 中对应分包数组中添加对象 
  {
      root: 'pages/contact',
      pages: [
        {
        // path 只需要写分包 root 后的路径即可
          path: 'index',
          aliasPath: '/contact',
          style: {
            navigationBarTitleText: '联系我们',
          },
        },
        {
          path: 'weather/index',
          aliasPath: '/weather',
          style: {
            navigationBarTitleText: '天气',
          },
        },
      ],
    },
```
4. 路由跳转

```typescript
import { useRouter } from '$uni-router'

const router = useRouter()
router.navigateTo('/');
```
5. 示例代码


```typescript
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      // '^u-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  pages: [
    {
      path: 'pages/index/home/index',
      aliasPath: '/',
      style: {
        navigationBarTitleText: '主页',
      },
    },
  ],
  // 分包配置
  subPackages: [
    {
      root: 'pages/contact',
      pages: [
        {
          path: 'index',
          aliasPath: '/contact',
          style: {
            navigationBarTitleText: '联系我们',
          },
        },
        {
          path: 'weather/index',
          aliasPath: '/weather',
          style: {
            navigationBarTitleText: '天气',
          },
        },
      ],
    },
  ],
  // tabbar 配置
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    list: [
      {
        iconPath: 'static/tabbar/tab-home.png',
        selectedIconPath: 'static/tabbar/tab-home-active.png',
        pagePath: 'pages/index/home/index',
        text: '主页',
      },
      {
        iconPath: 'static/tabbar/tab-example.png',
        selectedIconPath: 'static/tabbar/tab-example-active.png',
        pagePath: 'pages/index/example/index',
        text: '示例',
      },
      {
        iconPath: 'static/tabbar/tab-personal.png',
        selectedIconPath: 'static/tabbar/tab-personal-active.png',
        pagePath: 'pages/index/personal/index',
        text: '我的',
      },
    ],
  },
  // 全局配置
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'vite-uniapp-template',
    navigationBarBackgroundColor: '#ffffff',
    backgroundColor: '#f8f8f8',
  },
 
})

```
