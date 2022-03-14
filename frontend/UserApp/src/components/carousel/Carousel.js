import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import {CarouselItem, CarouselbgItem} from './CarouselItem';

const {width, height} = Dimensions.get('window');

function infiniteScroll(dataList, mySlide) {
  const numberOfData = dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  setInterval(function () {
    scrolled++;
    if (scrolled < numberOfData) scrollValue = scrollValue + width;
    else {
      scrollValue = 0;
      scrolled = 0;
    }
    if (mySlide.current) {
      mySlide.current.scrollToOffset({
        animated: true,
        offset: scrollValue,
      });
    }
  }, 3000);
}

const Carousel = props => {
  const mySlide = useRef();

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(props.data);

  useEffect(() => {
    setDataList(props.data);
    infiniteScroll(dataList, mySlide);
  });

  if (props.name == 'HomeSlider') {
    if (props.data && props.data.length) {
      return (
        <View>
          <FlatList
            data={props.data}
            ref={mySlide}
            keyExtractor={(item, index) => 'key' + index}
            horizontal
            pagingEnabled
            scrollEnabled
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return <CarouselItem item={item} />;
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
        </View>
      );
    }
  }
  if (props.name == 'bgPics') {
    if (props.data && props.data.length) {
      return (
        <View>
          <FlatList
            data={props.data}
            ref={mySlide}
            keyExtractor={(item, index) => 'key' + index}
            horizontal
            pagingEnabled
            scrollEnabled
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return <CarouselbgItem item={item} />;
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
        </View>
      );
    }
  }

  console.log('Please provide Images');
  return null;
};


export default Carousel;
