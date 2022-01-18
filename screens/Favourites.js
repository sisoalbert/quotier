import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

//Redux
import {useSelector, useDispatch} from 'react-redux';
import {addFavorite, removeFavorite} from '../redux/actions';

const Favourites = ({navigation, navigation: {goBack}}) => {
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
    <View>
      {/* Header */}
      <LinearGradient colors={['#FCEDCD', '#fff']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Feather name="chevron-left" size={30} />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 18}}>Favourites</Text>
          </View>
          <View>
            <Text></Text>
          </View>
        </View>
      </LinearGradient>
      {favorites.length === 0 ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'tomato',
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Your favorites list is empty</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={listRender}
          // ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
