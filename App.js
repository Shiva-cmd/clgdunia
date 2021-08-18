import React from 'react';
import LottieView from 'lottie-react-native';

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
const DATA = [
  {
    id: '1',
    title: 'Monday',
    temp: '34',
  },
  {
    id: '2',
    title: 'Monday',
    temp: '34',
  },
  {
    id: '3',
    title: 'Monday',
    temp: '34',
  },
  {
    id: '4',
    title: 'Monday',
    temp: '34',
  },
  {
    id: 5,
    title: 'Monday',
    temp: '34',
  },
];
const Item = ({ title, temp }) => (
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
  const renderItem = ({ item }) => <Item title={item.title} temp={item.temp} />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tempContainer}>
        <View>
          <Text style={styles.tempValue}>10</Text>
        </View>
        <View>
          <Text style={styles.tempCity}>Delhi</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      {/** <LottieView
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
      */}
    </SafeAreaView>
  );
};
export default App;

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
