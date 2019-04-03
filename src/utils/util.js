import Taro from '@tarojs/taro'

const {globalData:app} = Taro.getApp()


export const playMusic = item => {
  app.songList.push(item)
  app.song.title = item.name
  app.song.epname = item.name
  app.song.singer = item.singer
  app.song.coverImgUrl = item.pic
  // 设置了 src 之后会自动播放
  app.song.src = item.url
}