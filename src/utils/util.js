import Taro from '@tarojs/taro'

const {globalData: app} = Taro.getApp()

/**
 * 播放音乐
 * @param {*} item 音乐信息
 */
export const playMusic = item => {
  addMusic(item)
  // app.song.title = item.name
  // app.song.epname = item.name
  // app.song.singer = item.singer
  // app.song.coverImgUrl = item.pic
  // // 设置了 src 之后会自动播放
  // app.song.src = item.url

  const downloadTask = Taro.downloadFile({
    url: item.url, // 仅为示例，并非真实的资源
    header: {
      'Content-Type': "audio/mp3"
    },
    success(res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        Taro.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(result) {
            console.log('打开文档成功',result)
          },
        })
      }
    }
  })
  console.log(downloadTask)
  downloadTask.then(res => {
    console.log(res)
  })
  downloadTask.onProgressUpdate((res) => {
    console.log('下载进度', res.progress)
    console.log('已经下载的数据长度', res.totalBytesWritten)
    console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
  })
  //播放结束  自动播放下一首歌
  app.song.onEnded(() => {
    if (app.songList.length) {
      nextPlay()
    }
  })
}
/**
 *
 * @param {*} item 新音乐参数
 * 当新音乐已存在  就把  新音乐放到  最后一个
 */
export const addMusic = item => {
  const isExist = app.songList.filter(data => item.url !== data.url)
  app.songList = [...isExist, item]
  app.playIndex = app.songList.length - 1
  console.log(app.songList)
}

const nextPlay = () => {
  if (app.playIndex === app.songList.length - 1) {
    app.playIndex = 0
  } else {
    app.playIndex = app.playIndex + 1
  }
  const detail = app.songList[app.playIndex]
  app.song.title = detail.name
  app.song.epname = detail.name
  app.song.singer = detail.singer
  app.song.coverImgUrl = detail.pic
  // 设置了 src 之后会自动播放
  app.song.src = detail.url
}

//获取歌词
export const getLrc = url => {
  return new Promise((resolve, reject) => {
    Taro.request(url)
      .then(res => {
        const lrc = res.data
        var lyrics = lrc.split('\n')
        var lrcObj = {}
        for (var i = 0; i < lyrics.length; i++) {
          var lyric = decodeURIComponent(lyrics[i])
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
          var timeRegExpArr = lyric.match(timeReg)
          if (!timeRegExpArr) continue
          var clause = lyric.replace(timeReg, '')
          for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
            var t = timeRegExpArr[k]
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1))
            var time = min * 60 + sec
            lrcObj[time] = clause
          }
        }
        resolve(lrcObj)
      })
      .catch(err => {
        reject(err)
      })
  })
}
