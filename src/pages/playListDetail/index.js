import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import Musicplayer from '../../components/Musicplayer/index'
import {songList} from '../../service'
import {playMusic} from '../../utils/util'
import css from './style.module.less'

export default class PlayListDetail extends Component {
  config = {
    navigationBarTitleText: '歌单详情'
  }
  state = {
    id: null,
    data: {}
  }

  componentWillMount() {
    const {id, title} = this.$router.params
    Taro.setNavigationBarTitle({title})
    this.setState({id})
  }
  componentDidMount() {
    songList({id: this.state.id})
      .then(result => {
        if (result.code === 200) {
          this.setState({data: result.data})
        }
      })
      .catch(err => {})
  }
  componentWillReceiveProps(nextProps, nextContext) {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  componentDidNotFound() {}
  showImage = url => {
    url = url.replace('?param=400y400', '')
    Taro.previewImage({urls: [url], current: 0})
  }
  render() {
    const {data} = this.state
    return (
      <View>
        <View className={css['introduce']}>
          <View
            className={css['detail-pic']}
            onClick={() => this.showImage(data.songListPic)}
          >
            <View className={css['count']}>
              <AtIcon value='sound' size='10' color='#fff' />
              <Text>{data.songListPlayCount}</Text>
            </View>

            <Image
              src={data.songListPic}
              className={css['introduce-pic']}
              mode='scaleToFill'
            />
          </View>
          <Text className={css['introduce-tetx']}>{data.songListName}</Text>
        </View>
        <View className={css['music-lists']}>
          {data.songs &&
            data.songs.map((item, index) => (
              <View
                className={css['music-list']}
                key={item.id}
                onClick={() => playMusic(item)}
              >
                <Text className={css['song-index']}>{index + 1}</Text>
                <View className={css['music-title']}>
                  <Text className={css['song-name']}>{item.name}</Text>
                  <Text className={css['song-singer']}>{item.singer}</Text>
                </View>
              </View>
            ))}
        </View>
        <Musicplayer />
      </View>
    )
  }
}
