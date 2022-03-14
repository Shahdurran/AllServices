import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Carousel from './../../../components/carousel/Carousel';
import {windowWidth, windowHeight} from '../../../utils/index';
import {popularSP} from './../../../assets/data/carouselData';
import ServiceBtn from './../../../components/ServiceBtn/index';
import ProviderList from './../../../components/lists/providerList/index';
import {CustomText} from './../../../assets/lib';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchButton from './../../../assets/lib/SearchButton';

const UserHomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>

        <View style={{marginHorizontal: 10}}>
        <View style={{marginHorizontal: 5, marginVertical: 20}}>
          <CustomText style={{fontSize: 18, fontWeight: '900'}}>
            Good Evening, Shah Durran{' '}
          </CustomText>
          <CustomText style={{fontSize: 14, textAlign: 'left'}}>
            How can we be of service? There are 50 service providers in your
            area.{' '}
          </CustomText>
        </View>
        <SearchButton
          containerStyle={{
            backgroundColor: 'white',
            borderRadius: 8,
            marginTop: 10,
          }}
          placeholder={'Search for service providers'}
          selectionColor={'black'}
          // style={{backgroundColor: 'white', color: 'red'}}
          LeftComponent={
            <Icon
              name="search"
              size={23}
              style={{paddingRight: 10}}
              color="#E60023"></Icon>
          }
          // RightComponent={
          //   <TouchableOpacity>
          //     <Icon2
          //       name="filter"
          //       size={23}
          //       color="rgba(0,0,0,0.8)"
          //       style={{paddingRight: 10}}></Icon2>
          //   </TouchableOpacity>
          // }
        />
 
        <ImageBackground
          style={styles.Image1}
          imageStyle={{borderRadius: 16}}
          source={require('../../../assets/slide1.jpg')}>
          <TouchableOpacity style={styles.Mainbtn} onPress={()=>navigation.navigate("Search",{category: "notSearch"})}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '900'}}>
              Order Service Provider
            </Text>
            <Text style={{color: 'white', fontSize: 14}}>Make life easier</Text>
          </TouchableOpacity>
        </ImageBackground>

      <View style={styles.serviceContainer1}>
        <ServiceBtn
          ImgSource={require('../../../assets/plumber.png')}
          serviceProvider="Plumber"
          />
        <ServiceBtn
          ImgSource={require('../../../assets/carpenter.png')}
          serviceProvider="Electronics"
          />
        <ServiceBtn
          ImgSource={require('../../../assets/electrician.png')}
          serviceProvider="Carpenter"
          />
        <ServiceBtn
          ImgSource={require('../../../assets/mechanic.png')}
          serviceProvider="Mechanic"
          />
      </View>
      <View style={[styles.serviceContainer1]}>
        <ServiceBtn
          ImgSource={require('../../../assets/tailor.png')}
          serviceProvider="Tailor"
          />
        <ServiceBtn
          ImgSource={require('../../../assets/make-up-artist.png')}
          serviceProvider="Beautician"
          />
        <ServiceBtn
          ImgSource={require('../../../assets/technician.png')}
          serviceProvider="Technician"
          />
        <ServiceBtn
          ImgSource={require('../../../assets/service.png')}
          serviceProvider="Other"
          />
      </View>
          </View>
      <View style={{marginVertical: 10,marginLeft:10}}>
        <CustomText style={{fontSize: 18, fontWeight: 'bold'}}>
          Service providers near you{' '}
        </CustomText>
        <ProviderList data={popularSP} name="HomeProviderList" />
      </View>
    </ScrollView>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 10,
    // alignItems: 'flex-end',
    // justifyContent: 'center',
  },
  Mainbtn: {
    // width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderRadius: 16,
    padding: 10,
  },
  Image1: {
    height: windowHeight / 3.5,
    marginVertical: 10,
  },
  Image2: {
    width: '100%',
    height: windowHeight / 3.5,
    marginVertical: 10,
  },
  serviceContainer1: {
    flex: 1,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
// import React from 'react';
// import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
// import { Button, Block, Text, Input, theme } from 'galio-framework';

// // import { Icon, Product } from '../components/';

// const { width } = Dimensions.get('screen');
// // import products from '../constants/products';
// import { windowWidth } from './../../../utils/index';

// export default class UserHomeScreen extends React.Component {
//   renderSearch = () => {
//     const { navigation } = this.props;
//     // const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

//     return (
//       <Input
//         right
//         color="black"
//         style={styles.search}
//         // iconContent={iconCamera}
//         placeholder="What are you looking for?"
//         onFocus={() => navigation.navigate('Pro')}
//       />
//     )
//   }

//   renderTabs = () => {
//     const { navigation } = this.props;

//     return (
//       <Block row style={styles.tabs}>
//         <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
//           <Block row middle>
//             {/* <Icon name="grid" family="feather" style={{ paddingRight: 8 }} /> */}
//             <Text size={16} style={styles.tabTitle}>Categories</Text>
//           </Block>
//         </Button>
//         <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
//           <Block row middle>
//             {/* <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} /> */}
//             <Text size={16} style={styles.tabTitle}>Best Deals</Text>
//           </Block>
//         </Button>
//       </Block>
//     )
//   }

//   renderProducts = () => {
//     return (
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.products}>
//         <Block flex>
//           {/* <Product product={products[0]} horizontal /> */}
//           <Block flex row>
//             {/* <Product product={products[1]} style={{ marginRight: theme.SIZES.BASE }} /> */}
//             {/* <Product product={products[2]} /> */}
//           </Block>
//           {/* <Product product={products[3]} horizontal /> */}
//           {/* <Product product={products[4]} full /> */}
//         </Block>
//       </ScrollView>
//     )
//   }

//   render() {
//     return (
//       <Block flex center style={styles.home}>
//         {this.renderProducts()}
//       </Block>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   home: {
//     width: width,
//   },
//   search: {
//     height: 48,
//     width: width - 32,
//     marginHorizontal: 16,
//     borderWidth: 1,
//     borderRadius: 3,
//   },
//   header: {
//     backgroundColor: theme.COLORS.WHITE,
//     shadowColor: theme.COLORS.BLACK,
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowRadius: 8,
//     shadowOpacity: 0.2,
//     elevation: 4,
//     zIndex: 2,
//   },
//   tabs: {
//     marginBottom: 24,
//     marginTop: 10,
//     elevation: 4,
//   },
//   tab: {
//     backgroundColor: theme.COLORS.TRANSPARENT,
//     width: width * 0.50,
//     borderRadius: 0,
//     borderWidth: 0,
//     height: 24,
//     elevation: 0,
//   },
//   tabTitle: {
//     lineHeight: 19,
//     fontWeight: '300'
//   },
//   divider: {
//     borderRightWidth: 0.3,
//     borderRightColor: theme.COLORS.MUTED,
//   },
//   products: {
//     width: width - theme.SIZES.BASE * 2,
//     paddingVertical: theme.SIZES.BASE * 2,
//   },
// });
