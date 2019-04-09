import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {playMusic} from '../../utils/util'
import css from './style.module.less'

export default class SongCard extends Component {
  render() {
    const {songList} = this.props
    return (
      <View className={css['music-lists']}>
        {songList.map(item => (
          <View
            className={css['music-list']}
            key={item.id}
            onClick={() => playMusic(item)}
          >
            <Image
              src={item.pic}
              className={css['music-img']}
              mode='scaleToFill'
            />
            <View className={css['music-title']}>
              <Text className={css['song-name']}>{item.name}</Text>
              <Text className={css['song-singer']}>{item.singer}</Text>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
SongCard.defaultProps = {
  songList: []
}
