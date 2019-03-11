import Taro, {Component} from '@tarojs/taro'
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  Image,
  Navigator
} from '@tarojs/components'
import {getSong} from '../../service'
import './index.less'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  state = {
    songList: [1321392802, 1313354324],
    songData: []
  }
  componentWillMount() {}

  componentDidMount() {
    this.getSongList()
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  getSongList = () => {
    Promise.all(this.state.songList.map(item => getSong({id: item})))
      .then(result => {
        const songData = result.map(item => item.data)
        this.setState({songData})
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const {songData} = this.state
    return (
      <View className='index'>
        <Swiper className='swiper' circular indicatorDots autoplay>
          {songData.map(item => (
            <SwiperItem key={item.id}>
              <Image
                src={item.pic.replace('?param=400y400', '')}
                className='swiper-img'
                mode='scaleToFill'
              />
            </SwiperItem>
          ))}
        </Swiper>
        <Navigator url='/pages/hotSongList/index'>热门歌单</Navigator>
      </View>
    )
  }
}
