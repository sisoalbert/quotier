import React, {useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from 'react-native-linear-gradient';
import { captureRef } from "react-native-view-shot";
import Share from 'react-native-share';


const { height, width } = Dimensions.get("window");


const Details = ({ route, navigation: { goBack } }) => {
    const { QUOTE } = route.params;
    const { AUTHOR } = route.params;
    
    const viewRef = useRef()

//share the quote
    const shareQuoteImage = async () => {
        try {
            const uri = await captureRef
                (
                    viewRef, {
                    format: "png",
                    quality: 0.7
                }
            )
            await Share.open({ url: uri });
        }
        catch (err) {
            console.error(err)
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
        }
        catch (err) {
            console.error(err)
        }
    };


        return (
            <View style={styles.container}>
                <LinearGradient colors={['#FCEDCD', '#fff']} >
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => goBack()} >
                            <Feather name="chevron-left" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={shareToFriend} style={{paddingRight:8}}>
                            <Feather name="user-plus" size={24} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.quoteContainer} ref={viewRef}>
                        <Image source={require("../assets/icons/birds.png")} style={{width:150,height:150, resizeMode: 'stretch', position:"absolute", top:0
                    }}/>
                        <Text>{JSON.stringify(QUOTE)} </Text>
                        <Text> {(AUTHOR)}</Text>
                        <Text style={{ fontSize: 12, fontWeight:"bold", color: "#ec8632", position: "absolute", bottom: 10, left: 20 }}>Quotier App</Text>
                    </View>
                    <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8', }} />
                    <View style={styles.shareContainer}>
                        <TouchableOpacity style={styles.actionButtons} onPress={shareQuoteImage}>
                            <Feather name="share-2" size={24} />
                            <Text>Share</Text>
                        </TouchableOpacity >
                    </View>
                    <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8', }} />
                    <View style={styles.admobContainer}>
                    </View>

                </ScrollView>

            </View>
        )
    };

export default Details

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent: "center",
        // alignItems:"center"
    },
    header: {
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 30,
        flexDirection: "row",
        justifyContent:"space-between"
        
    },
    quoteContainer: {
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent:"center",
        height: width,
        width: width,
        backgroundColor: "#C3EAF1",
    },
    shareContainer: {
        marginTop: 20,
        marginBottom:20,
        flexDirection: "row",
        paddingHorizontal: 0,
        justifyContent:"space-around",
    },
    actionButtons: {
        alignItems: "center",      
    },
    
})
