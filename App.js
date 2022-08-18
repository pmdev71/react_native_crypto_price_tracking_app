import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshTime, setRefreshTime] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setRefreshTime(new Date().toLocaleString());
    axios
      .get(
        `https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd`,
      )
      .then(res => {
        //console.log(res.data.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [refresh]);

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  //setTimeout(refreshHandler, 10000);
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
            1 {item.slug} ⇆ {item.metrics.market_data.price_usd.toFixed(2)}$
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
          <View style={styles.topBarText}>
            <Text style={styles.textHeader}>Crypto Tracker</Text>
            <Text style={[styles.text, {marginLeft: 10, color: '#e2ed0c'}]}>
              {refreshTime}
            </Text>
          </View>

          <View>
            <View style={styles.button}>
              <Button
                color="#0a0c36"
                onPress={() => refreshHandler()}
                title="Refresh"
              />
            </View>
          </View>
        </View>

        {loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={data.data}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    margin: 6,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  button: {
    paddingHorizontal: 10,
    margin: 10,
  },
});

export default App;
