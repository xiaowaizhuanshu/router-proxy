// 私有接口部分
import $axios from '@/config/request'
export const getAdressInfo = function (params) {
    return $axios({
        url: '/api/h5/vip/channel/share/history',
        method: 'GET',
        params
    })
  }
