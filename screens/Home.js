import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import sample from '../assets/sample';
import data from '../assets/data';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {addFavorite, removeFavorite} from '../redux/actions';

const {height, width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [masterDataSource, setMasterDataSource] = useState(data);

  //REDUX
  const {favorites} = useSelector((state) => state.quotesReducer);
  const dispatch = useDispatch();

  const addToFavorites = (quote) => dispatch(addFavorite(quote));
  const removeFromFavorites = (quote) => dispatch(removeFavorite(quote));

  const handleAddFavorite = (quote) => {
    addToFavorites(quote);
  };
  const handleRemoveFavorite = (quote) => {
    removeFromFavorites(quote);
  };

  const exists = (quote) => {
    if (favorites.filter((item) => item.id === quote.id).length > 0) {
      return true;
    }
    return false;
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource

      const newData = masterDataSource.filter(function (item) {
        // const itemData = item.AUTHOR? item.AUTHOR.toUpperCase(): ''.toUpperCase();
        // const textData = text.toUpperCase();

        const itemData = `${item.AUTHOR.toUpperCase()}   
           ${item.QUOTE.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const listRender = ({item}) => {
    return (
      <View>
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#FFDEAD',
            marginTop: 10,
          }}
        />
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {
                QUOTE: item.QUOTE,
                AUTHOR: item.AUTHOR,
              });
            }}
            style={{width: '90%'}}>
            <Text style={styles.title}>{item.AUTHOR}</Text>
            <Text>{JSON.stringify(item.QUOTE)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              exists(item)
                ? handleRemoveFavorite(item)
                : handleAddFavorite(item)
            }
            style={[styles.imageIcon, {}]}>
            <View>
              <Image
                source={
                  exists(item)
                    ? require('../assets/icons/quotes-dark.png')
                    : require('../assets/icons/quotes.png')
                }
                style={{width: 25, height: 25, resizeMode: 'stretch'}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      <LinearGradient colors={['#FCEDCD', '#fff']}>
        <View style={styles.header}>
          <Image
            source={require('../assets/icons/Quotier.png')}
            style={{
              resizeMode: 'stretch',
              width: 150,
              height: 43,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Favourites');
            }}>
            <Feather name="heart" size={30} />
          </TouchableOpacity>
          {/* <Text style={styles.headerText}>Quotier</Text> */}
        </View>
        {/* search */}
        <View style={styles.search}>
          <Feather
            name="search"
            size={24}
            style={{marginRight: 10, color: '#c8c8c8'}}
          />
          <TextInput
            placeholderTextColor={'#d8d9d9'}
            placeholder="Search"
            style={styles.textInput}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          />
        </View>
      </LinearGradient>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={listRender}
        // ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
  },
  textInput: {
    height: '100%',
    width: '100%',
    color: 'white',
  },

  search: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#313131',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 80,
    marginBottom: 20,
    marginHorizontal: 20,
    color: '#fff',
  },

  item: {
    // backgroundColor: '#fff',

    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageIcon: {
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    left: 0,
  },
  title: {
    fontSize: 20,
  },
});
