import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetApplet, presetRemRpx } from 'unocss-applet'
import { presetShades } from '@viarotel-org/unocss-preset-shades'
import presetWind from '@unocss/preset-wind'
import { VITE_APP_PRIMARY_COLOR, primaryColor } from './src/configs'

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') || false

const preset = isApplet ? presetApplet() : presetWind()
console.log(VITE_APP_PRIMARY_COLOR, 'VITE_APP_PRIMARY_COLOR')
export default defineConfig({
  shortcuts: {
    'inset-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'inset-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    'inset-y-center': 'absolute top-1/2 transform -translate-y-1/2',
  },
  theme: {
    colors: {
      gray: preset?.theme?.colors?.neutral,
    },
  },
  presets: [
    preset,
    // @ts-expect-error
    presetShades(primaryColor),
    presetRemRpx(),
  ],
  transformers: [transformerDirectives()],
})
