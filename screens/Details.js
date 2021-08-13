import React, {useState, useRef} from 'react';
import {ColorPicker} from 'react-native-color-picker';
import Modal from 'react-native-modal';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';

const {height, width} = Dimensions.get('window');

const Details = ({route, navigation: {goBack}}) => {
  const {QUOTE} = route.params;
  const {AUTHOR} = route.params;

  //To change the color of the quote
  const [selectedColor, setSelectedColor] = useState('#f6e58d');
  const [selectedColorOutline, setSelectedColorOutline] = useState('#f1f2f6');

  const viewRef = useRef();

  //share the quote
  const shareQuoteImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7,
      });
      await Share.open({url: uri});
    } catch (err) {
      console.error(err);
    }
  };

  //share massage to friend
  const shareToFriend = async () => {
    try {
      const shareOptions = {
        title: 'Tell your friend',
        message: 'Quotier App | I think you should download this cool app.',
      };
      await Share.open(shareOptions);
    } catch (err) {
      console.error(err);
    }
  };

  //Color picker component
  const ColorPickerComponent = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          {
            height: 50,
            width: 50,
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 10,
            borderWidth: 2.5,
          },
          {
            backgroundColor: props.backgroundColor,
            borderColor: selectedColorOutline,
          },
        ]}></TouchableOpacity>
    );
  };
  const ColorPickerComponentSelector = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          {
            height: 50,
            width: 50,
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 10,
            borderWidth: 2.5,
          },
          {
            backgroundColor: props.backgroundColor,
            borderColor: selectedColorOutline,
          },
        ]}></TouchableOpacity>
    );
  };

  //Modal setup component
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  ////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <View>
        <Button title="Show modal" onPress={toggleModal} />

        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity style={{padding: 10}} onPress={toggleModal}>
              <Feather name="x-circle" size={30} />
            </TouchableOpacity>
            <Text>Pick a lovely colour...</Text>
            <ColorPicker
              onColorSelected={
                (color) => setSelectedColor(color)
                //   alert(`Color selected: ${color}`)
              }
              style={{flex: 1}}
            />
          </View>
        </Modal>
      </View>

      <LinearGradient colors={['#FCEDCD', '#fff']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Feather name="chevron-left" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareToFriend} style={{paddingRight: 8}}>
            <Feather name="share" size={25} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[styles.quoteContainer, {backgroundColor: selectedColor}]}
          ref={viewRef}>
          {/* <Image
            source={require('../assets/icons/birds.png')}
            style={{
              width: 150,
              height: 150,
              resizeMode: 'stretch',
              position: 'absolute',
              top: 0,
            }}
          /> */}
          <Text>{JSON.stringify(QUOTE)} </Text>
          <Text> {AUTHOR}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: '#ec8632',
              position: 'absolute',
              bottom: 10,
              left: 20,
            }}>
            Quotier App by Siso
          </Text>
        </View>
        <View
          style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
        />
        <View style={styles.colorsContainer}>
          <ColorPickerComponent
            onPress={() => {
              setSelectedColor('#f6e58d');
              setSelectedColorOutline('#dfe4ea');
            }}
            backgroundColor="#f6e58d"
          />
          <ColorPickerComponent
            onPress={() => {
              setSelectedColor('#ffbe76');
            }}
            backgroundColor="#ffbe76"
          />
          <ColorPickerComponent
            onPress={() => {
              setSelectedColor('#ff7979');
            }}
            backgroundColor="#ff7979"
          />
          <ColorPickerComponent
            onPress={() => {
              setSelectedColor('#badc58');
            }}
            backgroundColor="#badc58"
          />
          <ColorPickerComponent
            onPress={() => {
              setSelectedColor('#dff9fb');
            }}
            backgroundColor="#dff9fb"
          />
          <ColorPickerComponentSelector
            onPress={() => {
              setSelectedColor('#dff9fb');
            }}
            backgroundColor="#dff9fb"
          />
        </View>
        <View
          style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
        />

        <View style={styles.shareContainer}>
          <TouchableOpacity
            style={styles.actionButtons}
            onPress={shareQuoteImage}>
            <MaterialIcons name="share" size={25} />
            <Text>Share</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
        />
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems:"center"
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quoteContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: width,
    width: width,
  },
  colorsContainer: {
    flexDirection: 'row',
    // paddingHorizontal: 0,
    // justifyContent: 'space-around',
  },
  shareContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 0,
    justifyContent: 'space-around',
  },
  actionButtons: {
    alignItems: 'center',
  },
});
