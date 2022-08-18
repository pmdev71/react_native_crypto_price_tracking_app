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
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_KEY = '0f4486b55be8c40c937d88800ed6991a';

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd`,
      )
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.root}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require('./assets/background1.png')}>
        <View style={styles.topBar}></View>
        {loading && (
          <View>
            <ActivityIndicator size="large" color="white" />
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
  textInput: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    marginVertical: 20,
    marginTop: 30,
  },
  cityCountryText: {
    marginTop: '40%',
    color: '#fff',
    fontSize: 35,
    fontWeight: '700',
  },

  infoView: {
    alignItems: 'center',
  },

  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 35,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default App;
