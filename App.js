/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd`,
      )
      .then(res => {
        //console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [5000]);

  //console.log('My data', data);

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.text}>{item.symbol}</Text>
          <Text style={styles.text}>{item.slug}</Text>
        </View>
        <View>
          <Text style={styles.text}>
            1 {item.slug} ⇆ {item.metrics.market_data.price_usd.toFixed(8)}$
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require('./assets/background1.png')}>
        <View style={styles.topBar}>
          <Text>Hi</Text>
        </View>
        {loading ? (
          <View>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    alignItems: 'center',
  },

  infoView: {
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 8,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

export default App;
