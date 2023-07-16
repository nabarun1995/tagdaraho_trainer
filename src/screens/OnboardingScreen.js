import React from 'react'
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const bgColor = "#000"

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={[styles.onBoardButton,styles.skipBtn]} {...props}>
        <Text style={{
            fontSize: 16, color: '#000',
            // fontFamily: "Poppins-Medium",
            marginTop:3,
        }}>Skip</Text>
    </TouchableOpacity>
    // <Button title='skip'></Button>
)
const Done = ({ ...props }) => (
    <TouchableOpacity
        style={styles.onBoardButton} {...props}>
        <Text style={{ fontSize: 16, color: '#fff' }}>Done</Text>
    </TouchableOpacity>
)

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={[styles.onBoardButton,styles.nextBtn]} {...props}>
        <Text style={{
            fontSize: 16, color: '#fff',
            // fontFamily: "Poppins-Medium",
            marginTop:3,
        }}>Next</Text>
    </TouchableOpacity>
)

const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? '#FC9918' : '#FC991850';
    return (
        <View style={{
            width: 8, height: 8, borderRadius: 4, backgroundColor, marginHorizontal: 3,
        }}></View>
    )
}

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            style={styles.container}
            onSkip={() => navigation.replace("Welcome")}
            onDone={() => navigation.replace("Welcome")}
            DotComponent={Dots}
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            bottomBarColor="#fff"
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image />,
                    title:
                        <View style={styles.onboardingContainer}>
                            <Image source={require('../assets/images/onBoarding2/1.png')} style={styles.image} />
                            <View style={styles.customTitle}>
                                <Text style={styles.customTitleHalf1}>Purchase Fitness Equipment</Text>
                            </View>
                            <View style={styles.customSubtitleWrapper}>
                                <Text style={styles.customSubtitle}>
                                    Find your favorite item anytime from
                                    our existing location easily
                                </Text>
                            </View>
                        </View>,
                    subtitle:<></>
                        
                },
                {
                    backgroundColor: '#fff',
                    image: <Image />,
                    title:
                        <View style={styles.onboardingContainer}>
                            <Image source={require('../assets/images/onBoarding2/2.png')} style={styles.image} />
                            <View style={styles.customTitle}>
                                <Text style={styles.customTitleHalf1}>Fitness Training</Text>
                            </View>
                            <View style={styles.customSubtitleWrapper}>
                                <Text style={styles.customSubtitle}>
                                    Find your favorite item anytime from
                                    our existing location easily
                                </Text>
                            </View>
                        </View>,
                    subtitle:<></>
                        
                },
                {
                    backgroundColor: '#fff',
                    image: <Image />,
                    title:
                        <View style={styles.onboardingContainer}>
                            <Image source={require('../assets/images/onBoarding2/3.png')} style={styles.image} />
                            <View style={styles.customTitle}>
                                <Text style={styles.customTitleHalf1}>Achieve Goals</Text>
                            </View>
                            <View style={styles.customSubtitleWrapper}>
                                <Text style={styles.customSubtitle}>
                                    Find your favorite item anytime from
                                    our existing location easily
                                </Text>
                            </View>
                        </View>,
                    subtitle:<></>
                        
                },
                {
                    backgroundColor: '#fff',
                    image: <Image />,
                    title:
                        <View style={styles.onboardingContainer}>
                            <Image source={require('../assets/images/onBoarding2/4.png')} style={styles.image} />
                            <View style={styles.customTitle}>
                                <Text style={styles.customTitleHalf1}>Slot Based Training</Text>
                            </View>
                            <View style={styles.customSubtitleWrapper}>
                                <Text style={styles.customSubtitle}>
                                    Find your favorite item anytime from
                                    our existing location easily
                                </Text>
                            </View>
                        </View>,
                    subtitle:<></>
                        
                },
            ]}
        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        backgroundColor: '#000',
        borderWidth: 1,
        // borderColor: 'red'
    },
    onboardingContainer: {
        position: 'absolute',
        // top: StatusBar.currentHeight - 30,
        top:0,
        width: '100%',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 20,
        margin: 0,
        // backgroundColor: '#000',
        // borderWidth: 1
    },
    image: {
        width: '100%',
        height: 450,
        resizeMode: 'cover',
    },
    onBoardButton: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        color: "#fff",
        marginRight: 10,
        borderRadius: 20,
        width: 80,
        height: 35,
        backgroundColor: "transparent"
    },
    skipBtn:{
        backgroundColor:'#fff',
        borderRadius:10,
        marginLeft:10,
        borderWidth:1,
        borderColor:'#f7f7f7',
        elevation: 3,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    nextBtn:{
        height:40,
        width:100,
        backgroundColor:'#fc9918',
        borderRadius:10,
        marginRight:10,
        borderWidth:1,
        borderColor:'#f7f7f7',
        elevation: 3,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    customTitle: {
        justifyContent: 'center', alignItems: 'center',
        marginTop:30
    },
    customTitle2: {
        flexDirection: 'row'
    },
    customTitleHalf1: {
        color: '#000',
        fontSize: 22,
        marginBottom: 10,
        // fontFamily: "Poppins-Bold"
        // fontFamily: "baloo-paaji-2-regular",
    },
    customTitleHalf2: {
        fontSize: 42,
        // fontFamily: "Baloo2-Bold",
        color: '#32355D',
        // fontFamily: "baloo-paaji-2-regular",
    },
    customSubtitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    customSubtitle: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 28,
        // fontFamily: "Poppins-Medium",
        color: '#000'
        // fontWeight: '400'
    },
    swipeButton: {
        marginTop: 70,
    },
    swipeButtonTxt: {
        color: '#FF6F96',
        fontSize: 18,
        // fontFamily: "OpenSans-Bold",
        textDecorationLine: 'underline'
    },
})