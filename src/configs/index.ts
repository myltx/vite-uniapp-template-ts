import { isH5 } from '@uni-helper/uni-env'

export * from './env'

// 是否开启代理
export const useProxy = isH5

// 系统主体颜色
export const primaryColor = '#028d71'

// 企业信息
export const enterpriseInfo = {
  name: 'xxxx',
  wechat: 'xxxx',
  email: 'xxxx',
  address: 'xxxx',
}
