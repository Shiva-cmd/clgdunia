/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import {useDispatch, useSelector} from 'react-redux';
import {weather_API} from './src/action/weather_Action';

const Item = ({title, temp}) => (
  <View>
    <View style={styles.border} />
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.temp}>{temp}</Text>
      </View>
    </View>
  </View>
);

const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};
export default App;

function MainScreen() {
  const renderItem = ({item}) => {
    let a = new Date(item.dt * 1000);
    let weekdays = new Array(7);
    weekdays[0] = 'Sunday';
    weekdays[1] = 'Monday';
    weekdays[2] = 'Tuesday';
    weekdays[3] = 'Wednesday';
    weekdays[4] = 'Thursday';
    weekdays[5] = 'Friday';
    weekdays[6] = 'Saturday';
    let r = weekdays[a.getDay()];

    return <Item title={r} temp={(item.temp.morn - 275.15).toFixed(2)} />;
  };
  const weather = useSelector(state => state.weather);

  const dispatch = useDispatch();
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const {weatherApi: tempData, success, error} = weather;
  const [current, setCurrent] = useState('');
  const [daily, setDaily] = useState('');
  const [timezone, setTimezone] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(weather_API(latitude, longitude));
    setLoading(false);
  }, [dispatch, latitude, longitude, loading]);
  useEffect(() => {
    if (success) {
      setLoading(true);
      setCurrent(tempData.current);
      setDaily(tempData.daily);
      setTimezone(tempData.timezone);
      setLoading(false);
    }
  }, [success, tempData, current, daily, timezone, loading]);
  console.log('current', current);
  console.log('daily', daily);
  useEffect(() => {
    Geolocation.getCurrentPosition(info => setlatitude(info.coords.latitude));
    Geolocation.getCurrentPosition(info => setlongitude(info.coords.longitude));
  }, []);
  console.log(error);
  const retryButton = () => {
    dispatch(weather_API(latitude, longitude));
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        {loading === true ? (
          <LottieView
            source={require('./src/assets/lottie/loader.json')}
            colorFilters={[
              {
                keypath: 'button',
                color: '#F00000',
              },
              {
                keypath: 'Sending Loader',
                color: '#F00000',
              },
            ]}
            autoPlay
            loop
          />
        ) : (
          <>
            <SafeAreaView style={styles.container}>
              {error === true ? (
                <>
                  <View>
                    <Text style={{justifyContent: 'center', fontSize: 68}}>
                      Something Went Wrong at our end
                    </Text>

                    <TouchableOpacity
                      onPress={retryButton}
                      style={{
                        borderWidth: 3,
                        borderColor: 'black',
                        width: 104,
                      }}>
                      <Text style={{fontSize: 40}}>Retry</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.tempContainer}>
                    <View>
                      <Text style={styles.tempValue}>
                        {(current.temp - 275.15).toFixed(2)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.tempCity}>{timezone}</Text>
                    </View>
                  </View>
                  <View>
                    <FlatList
                      data={daily}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </>
              )}
            </SafeAreaView>
          </>
        )}
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 8,

    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    marginHorizontal: 8,
  },
  temp: {
    fontSize: 28,
    marginHorizontal: 8,
    paddingRight: 20,
  },
  tempContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  tempValue: {
    fontSize: 80,
    fontWeight: 'bold',
  },
  tempCity: {
    fontSize: 40,
    fontWeight: '600',
  },
  border: {
    borderColor: 'black',
    borderWidth: 0.5,
  },
});
