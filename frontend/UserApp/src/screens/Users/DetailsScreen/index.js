const Details = ({route}) => {
  const [jobdetails, setDetails] = useState();
  const [note, setNote] = useState(false);
  const {data, category} = route.params;
  console.log(data.serviceProvider[0].address);

  const handleInput = value => {
    setDetails(value);
    if (value) {
      setNote(true);
    } else {
      setNote(false);
    }
  };
  const placeOrder = () => {
    alert('Order Request sent, waiting for confirmation');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.providerDetails}>
        <CustomText style={{fontSize: 18, fontWeight: '900'}}>
          Shop Details{' '}
        </CustomText>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View>
            <Image source={require('../../../assets/shop.png')} />
          </View>
          <View style={{marginLeft: 20}}>
            <View>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Name: {category == 'local' ? data.title : data.shopName}
              </Text>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                location:{' '}
                {category == 'local'
                  ? data.location
                  : data.serviceProvider[0].address}
              </Text>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Rating: {category == 'local' ? data.rating : data.ratings}{' '}
                <Icon name="star" color="#FF9529" />{' '}
              </Text>

              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Visit Charges: {data.visitcharges}{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.orderDetails}>
        <View>
          <RouteMap />
        </View>
        <View style={{marginVertical: 5}}>
          <CustomText style={{fontSize: 18, fontWeight: '900'}}>
            Job Details{' '}
          </CustomText>
        </View>
        <TextInput
          placeholder="Enter Details of the job"
          style={{
            backgroundColor: 'white',
            borderWidth: 0.5,
            marginVertical: 5,
            borderRadius: 10,
            paddingBottom: 40,
          }}
          value={jobdetails}
          onChangeText={value => handleInput(value)}
        />
        {note ? (
          <CustomText
            style={{fontSize: 12, fontWeight: '900', marginVertical: 10}}>
            please note charges will be finalized after evaluating the job at
            venue!
          </CustomText>
        ) : null}
        <TouchableOpacity
          onPress={() => placeOrder()}
          style={{
            width: '80%',
            height: 35,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: '#E60023',
            borderRadius: 5,
            shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: {height: 1, width: 1}, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1, //IOS
            elevation: 2, // Android
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Calibri',
              fontWeight: 'bold',
              fontSize: 14,
              paddingVertical: 7,
            }}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  orderDetails: {
    flex: 0.3,
    marginVertical: 5,
  },
  providerDetails: {
    flex: 0.2,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
