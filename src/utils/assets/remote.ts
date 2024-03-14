import type { CSSProperties } from 'vue'
import { getFileBaseURL } from '../../configs/request'

function useRemoteAssets(filePath: string, { noCache = false } = {}): string {
  let fileURL = `${getFileBaseURL()}${filePath}`

  if (noCache) {
    fileURL += `?t=${new Date().getTime()}`
  }

  // console.log('fileURL', fileURL)

  return fileURL
}
/**
 *
 * 返回 background 行内配置
 * 解决行内加载远程资源问题
 */

export function setRemoteBg(filePath: string, config?: CSSProperties): CSSProperties {
  return Object.assign(
    {
      backgroundImage: `url(${useRemoteAssets(filePath)})`,
      backgroundRepeat: 'no-repeat',
    },
    config,
  )
}

export const useAssets = useRemoteAssets

export default useRemoteAssets
