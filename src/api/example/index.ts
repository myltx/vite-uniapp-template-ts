import Request from '@/utils/request/index'

export const getClassInfo = (): any => Request.post('/class/getClassInfo')
export const getWeather = (): any => Request.get('')
