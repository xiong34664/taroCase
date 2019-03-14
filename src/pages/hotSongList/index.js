import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
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
  
  componentWillMount () {}
  componentDidMount () {
    this.getHotSongList()
  } 
  onPullDownRefresh() {
    Taro.stopPullDownRefresh()
    this.setState({offset: 0, songList: []},this.getHotSongList)
  }
  onReachBottom() {
    if(!this.state.loading) {
      this.setState({offset: this.state.offset + 1},this.getHotSongList)
    }
  }
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  getHotSongList = () => {
    const { limit,offset } = this.state
    this.setState({loading: true},()=>{
      hotSongList({limit,offset : offset*limit,cat:"全部"}).then((result) => {
        if( result.code === 200) {
          const { songList } = this.state
          songList.push(...result.data)
          this.setState({songList,loading: false})
        }else {
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