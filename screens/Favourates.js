import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const Favourates = ({navigation: {goBack}}) => {
  return (
    <View>
      {/* Header */}
      <LinearGradient colors={['#FCEDCD', '#fff']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Feather name="chevron-left" size={30} />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 18}}>Favourates</Text>
          </View>
          <View>
            <Text></Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Favourates;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
