import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { getLrc } from "../../utils/util";
import css from './style.module.less'

const {globalData:app} = Taro.getApp()
export default class Musicplayer extends Component {
  config = {
    navigationBarTitleText: ''
  }

  state = {
    data: null,       //播放状态信息
    isShow: false,    //是否显示
    details: null,    //当前  播放音乐的详情
    lrcData: {},      //歌词
  }

  componentWillMount() {
    
  }
  componentDidMount() {
    app.song.onCanplay(()=>{
      this.getDetails()
    })
    app.song.onTimeUpdate(() => {
      Taro.getBackgroundAudioPlayerState({
        success: res => {
          if(res.status !== 2) {
            if(!this.state.details) {
              this.getDetails()
            }
          }

          this.setState({data: res})
        },
        fail(res) {
          console.log('fail', res)
        }
      })
    })
  }
  getDetails = () => {
    const details = app.songList[app.playIndex]
    getLrc(details.lrc).then((result) => {
      this.setState({lrcData: result})
    }).catch((err) => {
      console.log(err)
    });
    this.setState({details})
  }
  highlightLrc = (time) => {
    let flag = null
    for (const key in this.state.lrcData) {
      if(key > time) {
        break
      }
      flag = key
    }
    return flag
  }
  componentWillReceiveProps(nextProps, nextContext) {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  componentDidNotFound() {}
  isStatus = (status) => {
    switch (status) {
      case 0:
        return 'pause'
      case 1:
        return 'play'
      case 2:
        return 'sound'
      default:
        break;
    }
  }
  render() {
    const { data, isShow, details, lrcData } = this.state
    return data ? <View>
      <View className={css.box} style={{backgroundImage: `url(${details.pic})`}}  onClick={()=>{this.setState({isShow: !isShow})}}>
      </View>
      <AtFloatLayout isOpened={isShow} onClose={()=>this.setState({isShow: false})}>
        {details.singer}
        {details.name}
        <Image
          src={details.pic}
          className={css['card-img']}
          mode='scaleToFill'
        />
        <View>
          {Object.keys(lrcData).map( item => {
            return (
              <View key={item} className={this.highlightLrc(data.currentPosition) === item ? css.current : ''}>
                {lrcData[item]}
              </View>
            )
          })}
        </View>
    </AtFloatLayout>
    </View> : null 
  }
}
