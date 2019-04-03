import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import css from './style.module.less'

export default class SongCard extends Component {
  render() {
    const {songList, goDetail} = this.props
    return (
      <View className={css['card-lists']}>
        {songList.map(item => (
          <View
            key={item.id}
            className={css['card-list']}
            onClick={() => goDetail(item.id, item.title)}
          >
            <Image
              src={item.coverImgUrl}
              className={css['card-img']}
              mode='scaleToFill'
            />
            <View className={css['card-title']}>
              <Text className={css['card-text']}>{item.title}</Text>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
SongCard.defaultProps = {
  songList: [],
  goDetail: null
}
