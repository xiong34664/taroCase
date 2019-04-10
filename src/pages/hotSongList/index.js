import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtMessage, AtActivityIndicator } from 'taro-ui'
import { hotSongList } from '../../service';
import SongCard from '../../components/SongCard/index';
import './style.less'

export default class HotSong extends Component {

   config = {
       navigationBarTitleText: '',
       "enablePullDownRefresh": true,
  }

  state={
    limit: 21,
    offset: 0,
    songList : [],
    loading: true,
  }
  flag = false
  componentWillMount () {
    //转发链接 点击进入时获取的参数
    console.log(this.$router)
  }
  componentDidMount () {
    this.getHotSongList()
  } 
  onPullDownRefresh() {
    
    if(!this.flag) {
      console.log('下拉刷新')
      this.flag = true
      this.setState({offset: 0, songList: []},()=>{
        this.getHotSongList(()=>{
          Taro.stopPullDownRefresh({
            complete:() => {
              this.flag = false
            }
          }) 
        })
      })
    }
  }
  onReachBottom() {
    if(!this.state.loading) {
      this.setState({offset: this.state.offset + 1},this.getHotSongList)
    }
  }
  // componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  getHotSongList = (cb) => {
    this.setState({loading: true},()=>{
      const { limit, offset, songList } = this.state
      hotSongList({ limit, offset: offset * limit, cat: "全部" }).then((result) => {
        if (result.code === 200) {
          songList.push(...result.data)
          this.setState({ songList, loading: false },cb && cb())
        } else {
          Taro.atMessage({
            'message': '获取数据失败',
            'type': 'error',
          })
        }
      }).catch(() => {
        Taro.atMessage({
          'message': '获取数据失败',
          'type': 'error',
        })
      });
    })
  }
  songDetail(id,title) {
    Taro.navigateTo({url:`/pages/playListDetail/index?id=${id}&title=${title}`}).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  }
  render() {
    const { songList, loading } = this.state
    return (
      <View>
        <AtMessage />
        <SongCard songList={songList} goDetail={(...data)=>this.songDetail(...data)}></SongCard>
        {loading && <AtActivityIndicator content='加载中...'></AtActivityIndicator> }
      </View>
    );
  }
}