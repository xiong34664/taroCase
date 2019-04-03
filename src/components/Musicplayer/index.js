import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {AtIcon, AtFloatLayout } from 'taro-ui'
import css from './style.module.less'

const {globalData:app} = Taro.getApp()
export default class Musicplayer extends Component {
  config = {
    navigationBarTitleText: ''
  }

  state = {
    data: null,
    isShow: false
  }

  componentWillMount() {
    
  }
  componentDidMount() {
    app.song.onTimeUpdate(() => {
      Taro.getBackgroundAudioPlayerState({
        success: res => {
          this.setState({data: res})
        },
        fail(res) {
          // console.log('fail', res)
        }
      })
    })
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
    const { data, isShow } = this.state
    return data ? <View>
      <View className={css.box}>
        <AtIcon  onClick={()=>{this.setState({isShow: !isShow})}} value={this.isStatus(data.status)} size='24' color='#999'></AtIcon>
      </View>
      <AtFloatLayout isOpened={isShow} onClose={()=>this.setState({isShow: false})}>
      这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
      随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
    </AtFloatLayout>
    </View> : null 
  }
}
