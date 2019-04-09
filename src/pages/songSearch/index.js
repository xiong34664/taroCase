import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtSearchBar, AtTabs, AtTabsPane, AtActivityIndicator} from 'taro-ui'
import SongItem from '../../components/SongItem/index'
import css from './style.module.less'

import {songSearch} from '../../service'

export default class searchBox extends Component {
  config = {
    navigationBarTitleText: ''
  }

  state = {
    s: '',
    current: 0,
    song: {
      list: [],
      limit: 21,
      offset: 0,
      flag: false
    },
    singer: {
      list: [],
      limit: 21,
      offset: 0
    },
    album: {
      list: [],
      limit: 21,
      offset: 0
    },
    list: {
      list: [],
      limit: 21,
      offset: 0
    },
    video: {
      list: [],
      limit: 21,
      offset: 0
    },
    radio: {
      list: [],
      limit: 21,
      offset: 0
    },
    user: {
      list: [],
      limit: 21,
      offset: 0
    },
    lrc: {
      list: [],
      limit: 21,
      offset: 0
    },
    loading: false
  }
  tabList = [
    {title: '单曲', type: 'song'},
    {title: '歌手', type: 'singer'},
    {title: '专辑', type: 'album'},
    {title: '歌单', type: 'list'},
    {title: '视频', type: 'video'},
    {title: '电台', type: 'radio'},
    {title: '用户', type: 'user'},
    {title: '歌词', type: 'lrc'}
  ]
  componentWillMount() {}
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps, nextContext) {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  componentDidNotFound() {}
  onChange = s => {
    this.setState({
      s
    })
  }
  onActionClick = status => {
    const {current, s} = this.state
    const {type} = this.tabList[current]
    const data = this.state[type]
    if (status !== 'add') {
      this.setState({
        [type]: {
          limit: 21,
          offset: 0,
          list: [],
          flag: false
        }
      })
    }
    const {limit, offset} = data
    this.setState({loading: true})
    songSearch({type: type, s, limit, offset: offset * limit})
      .then(result => {
        let list = []
        if (result.code === 200) {
          switch (type) {
            case 'song':
              list = result.data
              break
            case 'singer':
              list = result.data.artists
              break
            case 'album':
              list = result.data.albums
              break
            case 'list':
              list = result.data.playlists
              break
            case 'video':
              list = result.data.videos
              break
            case 'radio':
              list = result.data.djRadios
              break
            case 'user':
              list = result.data.userprofiles
              break
            case 'lrc':
              list = result.data.songs
              break
            default:
              break
          }
        } else {
          list = []
          data.flag = true
        }
        if (status === 'add') {
          data.list.push(...list)
        } else {
          data.list = list
        }
        this.setState({[type]: data, loading: false})
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleClick = value => {
    const {type} = this.tabList[value]
    this.setState(
      {
        current: value
      },
      () => {
        if (this.state.s && this.state[type].list.length === 0) {
          this.onActionClick()
        }
      }
    )
  }
  onReachBottom() {
    if (!this.state.loading) {
      const {type} = this.tabList[this.state.current]
      const data = this.state[type]
      if (data.flag) return
      data.offset = data.offset + 1
      this.setState({[type]: data}, () => this.onActionClick('add'))
    }
  }
  render() {
    const {loading} = this.state
    return (
      <View className={css.search_box}>
        <AtSearchBar
          value={this.state.s}
          onChange={this.onChange}
          onActionClick={this.onActionClick}
        />
        <AtTabs
          current={this.state.current}
          scroll
          tabList={this.tabList}
          onClick={this.handleClick}
          // className={css.tabs}
        >
          {this.tabList.map((item, index) => (
            <AtTabsPane current={this.state.current} index={index} key={index}>
              <View>
                {index === 0 && (
                  <View>
                    {this.state.song.list.length > 0 ? (
                      <SongItem songList={this.state.song.list} />
                    ) : (
                      <View style='text-align:center;'>未找到该歌曲</View>
                    )}
                  </View>
                )}
                {index === 1 && <View>歌手</View>}
                {index === 2 && <View>单曲</View>}
                {index === 3 && <View>单曲</View>}
                {index === 4 && <View>单曲</View>}
                {index === 5 && <View>单曲</View>}
                {index === 6 && <View>单曲</View>}
                {index === 7 && <View>单曲</View>}
              </View>
              {loading && <AtActivityIndicator content='加载中...' />}
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
    )
  }
}
