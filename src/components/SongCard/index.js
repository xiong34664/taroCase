import Taro , { Component } from '@tarojs/taro';
import { View, Text, Image} from '@tarojs/components';
import './style.less'

export default class SongCard extends Component {

   config = {
       navigationBarTitleText: ''
  }

  state={}

  render() {
    const { songList } = this.props
    return (
      <View className='card-lists'>
        {songList.map( item => (
          <View key={item.id} className='card-list'>
            <Image src={item.coverImgUrl} className='card-img' mode='scaleToFill'></Image>
            <View className='card-title'>
              <Text className='card-text'>{item.title}</Text>
            </View>
          </View>
        ) )}
        
      </View>
    );
  }
}
