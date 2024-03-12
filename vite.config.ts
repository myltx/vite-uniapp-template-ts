import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import useUni from '@dcloudio/vite-plugin-uni'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import useUniPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'

import postcssConfig from './postcss.config.js'

import {
  proxyPath,
  proxyPort,
  requestFilePath,
  useProxy,
} from './src/configs/server'

import { homePage } from './src/configs/index'

const isDevelopment = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const proxyURL = env.VITE_APP_API_URL
  return {
    server: {
      cors: true,
      host: true,
      port: proxyPort,
      https: false,
      proxy: {
        ...(useProxy && proxyURL
          ? {
              [`^${proxyPath}`]: {
                target: `${proxyURL}`,
                changeOrigin: true,
                rewrite: path => path.replace(new RegExp(`^${proxyPath}`), ''),
                secure: false,
                bypass(req, res, options: any) {
                  const proxyURLTruth = options.target + options.rewrite(req.url)
                  console.log('proxyURL', proxyURLTruth)
                  req.headers['x-req-proxyURL'] = proxyURLTruth // 设置未生效
                  res.setHeader('x-req-proxyURL', proxyURLTruth) // 设置响应头可以看到
                },
              },
              // 解决开发环境上传图片无法直接显示的问题
              [`^${requestFilePath}`]: {
                target: `${proxyURL}${requestFilePath}`,
                changeOrigin: true,
                rewrite: path =>
                  path.replace(new RegExp(`^${requestFilePath}`), ''),
              },
            }
          : {}),
      },
    },
    resolve: {
      alias: {
        '^@': path.resolve(__dirname, './src/'),
        '$uni-router': path.resolve(__dirname, './src/utils/uni-router/'),
      },
    },
    css: {
      // 修复外部 postcss.config.js 不被解析的问题
      postcss: postcssConfig,
    },
    build: {
      // minify: false,
      // TODO 解决 Windows 下开发模式控制台提示崩溃的问题
      ...(isDevelopment
        ? {
            watch: {
              exclude: ['node_modules/**', '/__uno.css'],
            },
          }
        : {}),
    },
    plugins: [
      useEslint(),
      useUnoCSS(),
      useUniPages({
        mergePages: false,
        homePage,
      }),
      useUni(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-router',
          {
            '@vueuse/core': [
              'useMouse', // import { useMouse } from '@vueuse/core',
              ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
            ],
            'axios': [
              ['default', 'axios'], // import { default as axios } from 'axios',
            ],
          },
          {
            from: 'vue-router',
            imports: ['RouteLocationRaw'],
            type: true,
          },
        ],
        defaultExportByFilename: false,
        dts: './auto-imports.d.ts',
        vueTemplate: false,
        resolvers: [],
        injectAtEnd: true,
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
    ],
  }
})
