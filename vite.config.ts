import path from 'node:path'
import { defineConfig } from 'vite'
import useUni from '@dcloudio/vite-plugin-uni'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import useUniPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'

import postcssConfig from './postcss.config.js'

import {
  proxyPath,
  proxyPort,
  proxyURL,
  requestFilePath,
  requestPath,
  useProxy,
} from './src/configs/devServer'

import { homePage } from './src/configs/index'

const isDevelopment = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    useEslint(),
    useUnoCSS(),
    useUniPages({
      mergePages: false,
      homePage,
    }),
    useUni(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          'axios': [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
          '[package-name]': [
            '[import-names]',
            // alias
            ['[from]', '[alias]'],
          ],
        },
        // example type import
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw'],
          type: true,
        },
      ],
      // Enable auto import by filename for default module exports under directories
      defaultExportByFilename: false,

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: [
        // './hooks',
        // './composables' // only root modules
        // './composables/**', // all nested modules
        // ...
      ],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: './auto-imports.d.ts',

      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: false,

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
      ],

      // Inject the imports at the end of other imports
      injectAtEnd: true,

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
  server: {
    cors: true,
    host: true,
    port: proxyPort,
    proxy: {
      ...(useProxy && proxyURL
        ? {
            [`^${proxyPath}`]: {
              target: `${proxyURL}${requestPath}`,
              changeOrigin: true,
              rewrite: path => path.replace(new RegExp(`^${proxyPath}`), ''),
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
})
