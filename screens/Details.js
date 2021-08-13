import React, {useState, useRef} from 'react';
import {ColorPicker} from 'react-native-color-picker';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Button,
  FlatList,
  TouchableWithoutFeedback,
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
  const [selectedColorOutline, setSelectedColorOutline] = useState('#dfe4ea');

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
            overflow: 'hidden',
          },
          {
            borderColor: selectedColorOutline,
          },
        ]}>
        <Image
          source={require('../assets/img/colorpicker.jpeg')}
          style={{
            width: 50,
            height: 50,
            resizeMode: 'stretch',
            position: 'absolute',
            overflow: 'hidden',
            top: 0,
          }}
        />
      </TouchableOpacity>
    );
  };

  //Handle text property changes
  const [isTextSelectorVisible, setisTextSelectorVisible] = useState(false);
  const [modalExpanded, setModalExpanded] = useState(2.5);

  const toggleTextSelector = () => {
    setisTextSelectorVisible(!isTextSelectorVisible);
  };
  const expandModal = () => {
    setModalExpanded(2);
  };

  const TextSelectorComponent = () => {
    return (
      <View>
        <Text>Hi</Text>
      </View>
    );
  };

  //Modal setup component
  const [isModalVisible, setModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(23);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //Changing text properties
  const fontStyles = ['normal', 'italic'];
  const [fontStyleIdx, setFontStyleIdx] = useState(0);

  const CustomPicker = ({label, data, currentIndex, onSelected}) => {
    return (
      <>
        <Text style={[styles.title, {marginBottom: 10}]}>{label}</Text>
        <View style={styles.wrapperHorizontal}>
          <FlatList
            bounces
            horizontal
            data={data}
            keyExtractor={(item, idx) => String(item)}
            renderItem={({item, index}) => {
              const selected = index === currentIndex;
              return (
                <TouchableWithoutFeedback onPress={() => onSelected(index)}>
                  <View
                    style={[
                      styles.itemStyleHorizontal,
                      selected && styles.itemSelectedStyleHorizontal,
                    ]}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: selected ? 'black' : 'grey',
                        fontWeight: selected ? 'bold' : 'normal',
                      }}>
                      {item + ''}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
      </>
    );
  };

  const CustomSlider = ({
    label,
    handleValueChange,
    step = 1,
    minimumValue = 0,
    maximumValue = 10,
    value,
  }) => {
    return (
      <>
        {label && (
          <Text style={styles.title}>{`${label} (${value.toFixed(2)})`}</Text>
        )}
        <View style={styles.wrapperHorizontal}>
          <Slider
            thumbTintColor="#DAA520"
            minimumTrackTintColor="#DAA520"
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            step={step}
            onValueChange={handleValueChange}
            value={value}
          />
        </View>
      </>
    );
  };

  ////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      {/* COLOR modal view */}
      <View>
        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity style={{padding: 10}} onPress={toggleModal}>
              <Feather name="x-circle" size={30} />
            </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18}}>Pick a lovely colour...</Text>
            </View>
            <ColorPicker
              hideSliders={true}
              onColorSelected={(color) => {
                setSelectedColor(color);
                setModalVisible(!isModalVisible);
                //   alert(`Color selected: ${color}`);
              }}
              style={{flex: 1}}
            />
          </View>
        </Modal>
      </View>

      {/* Header */}
      <LinearGradient colors={['#FCEDCD', '#fff']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Feather name="chevron-left" size={30} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', paddingHorizontal: 0}}>
            <TouchableOpacity
              onPress={toggleTextSelector}
              style={{paddingRight: 20}}>
              <Feather name="type" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={shareToFriend}
              style={{paddingRight: 10}}>
              <Feather name="share" size={25} />
            </TouchableOpacity>
          </View>
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
          <Text
            style={[
              {textAlign: 'center', fontWeight: 'bold'},
              {fontSize, fontStyle: fontStyles[fontStyleIdx]},
            ]}>
            {JSON.stringify(QUOTE)}{' '}
          </Text>
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
            Quotier App
          </Text>
        </View>
        <View
          style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
        />
        {/* TEXT selector modal */}
        <Modal
          isVisible={isTextSelectorVisible}
          swipeDirection="down"
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View
            style={[
              {
                backgroundColor: '#fff',
              },
              {height: Dimensions.get('screen').height / modalExpanded},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={toggleTextSelector}>
                <Feather name="x-circle" size={30} />
              </TouchableOpacity>
              <Text style={{fontSize: 18}}>Wanna style the text?</Text>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={expandModal}>
                <Feather name="maximize-2" size={25} color="grey" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingHorizontal: 10,
              }}></Text>
            <View style={{}}>
              <View style={{paddingHorizontal: 10}}>
                <CustomPicker
                  label="Font Style"
                  data={fontStyles}
                  currentIndex={fontStyleIdx}
                  onSelected={setFontStyleIdx}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <CustomSlider
                label="Font Size"
                value={fontSize}
                maximumValue={40}
                handleValueChange={setFontSize}
              />
            </View>
          </View>
        </Modal>

        {/* <TextSelectorComponent /> */}
        {/* color selectors */}
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
            onPress={toggleModal}
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
    justifyContent: 'space-around',
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
  wrapperHorizontal: {
    height: 54,
    justifyContent: 'center',
    color: 'black',
    marginBottom: 12,
  },
  itemStyleHorizontal: {
    marginRight: 10,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 25,
    textAlign: 'center',
    justifyContent: 'center',
  },
  itemSelectedStyleHorizontal: {
    borderWidth: 2,
    borderColor: '#DAA520',
  },
});
