import Taro from '@tarojs/taro'

const host = 'https://api.bzqll.com'
const KEY = 579621905
function request(config) {
  if(config.url.startsWith('https://api.bzqll.com') && !config.data.key) {
    config.data.key = KEY
  }
  return new Promise((resolve, reject) => {
    Taro.request(config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//获取歌单列表
export function songList(data) {
  return request({
    url: `${host}/music/netease/songList`,
    data
  })
}
//搜索
export function songSearch(data) {
  return request({
    url: `${host}/music/netease/search`,
    data
  })
}
//获取 音乐详情
export function getSong(data) {
  return request({
    url: `${host}/music/netease/song`,
    data
  })
}
//获取 音乐播放地址
export function getSongUrl(data) {
  return request({
    url: `${host}/music/netease/url`,
    data
  })
}
//获取 音乐图片
export function getSongPic(data) {
  return request({
    url: `${host}/music/netease/pic`,
    data
  })
}
//获取 精品歌单
export function highQualitySongList(data) {
  return request({
    url: `${host}/music/netease/highQualitySongList`,
    data
  })
}
//获取 热门歌单
export function hotSongList(data) {
  return request({
    url: `${host}/music/netease/hotSongList`,
    data
  })
}