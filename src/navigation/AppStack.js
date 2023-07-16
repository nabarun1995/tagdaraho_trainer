import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'

import DrawerContent from '../components/DrawerContent';

import Settings from '../screens/Settings';
import ChangePassword from '../screens/appScreens/ChangePassword';

import { AuthContext } from './AuthProvider';
import AppSplash from '../screens/AppSplash';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import Thanku from '../screens/Thanku';
import Profile from '../screens/appScreens/Profile';
import HelpSupport from '../screens/appScreens/HelpSupport';
import TermsCondition from '../screens/appScreens/TermsCondition';
import Faq from '../screens/appScreens/Faq';
import ContactUsForm from '../screens/appScreens/ContactUsForm';
import ContactUs from '../screens/appScreens/ContactUs';
import Notifications from '../screens/appScreens/Notifications';

import CallHistory from '../screens/appScreens/CallHistory';
import IncomingCall from '../screens/videoCallScreens/IncomingCall';
import JoinCourse from '../screens/videoCallScreens/JoinCourse';
import PackageSlots from '../screens/videoCallScreens/PackageSlots';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

const activeTabColor =
    '#fc9918'
const nonActiveTabColor =
    '#000'
const backgroundTabColor =
    '#fff'


const DrawerNavigator = ({ navigation }) => (
    <Drawer.Navigator initialRouteName="Home"
        drawerContent={props => <DrawerContent{...props} />} >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
)

const AppStack = () => {

    const { userToken, initialRoute, setInitialRoute, } = useContext(AuthContext)

    // useEffect(async () => {

    // }, [])

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
                name="BottomTab"
                component={BottomTabNav}
                options={{
                    headerShown: false,
                }}>
            </Stack.Screen>
            <Stack.Screen name="AppSplash" component={AppSplash} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="Thanku" component={Thanku} options={{ headerShown: false }} />
            <Stack.Screen name="Faq" component={Faq} options={{ headerShown: false }} />
            <Stack.Screen name="ContactUsForm" component={ContactUsForm} options={{ headerShown: false }} />
            <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
            <Stack.Screen name="HelpSupport" component={HelpSupport} options={{ headerShown: false }} />
            <Stack.Screen name="TermsCondition" component={TermsCondition} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
            <Stack.Screen name="IncomingCall" component={IncomingCall} options={{ headerShown: false }} />
            <Stack.Screen name="JoinCourse" component={JoinCourse} options={{ headerShown: false }} />
            <Stack.Screen name="PackageSlots" component={PackageSlots} options={{ headerShown: false }} />
            <Stack.Screen name="CallHistory" component={CallHistory} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AppStack


const BottomTabNav = ({ navigation }) => (
    <Tab.Navigator initialRouteName="HomeScreen"
        screenOptions={{
            keyboardHidesTabBar: true,
            showLabel: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                // position: 'absolute',
                elevation: 0,
                borderTopColor: "#fff",
                backgroundColor: backgroundTabColor,
                // borderWidth: 1,
                height: 55,
            }
        }}>
        <Tab.Screen name="HomeScreen" component={DrawerNavigator}
            // <Tab.Screen name="Home" component={HomeScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {/* <SimpleLineIcons name="home" size={20}
                                color={focused ? activeTabColor : nonActiveTabColor}
                            ></SimpleLineIcons> */}
                            {focused ?
                                <>
                                    <Image source={require("../assets/images/icons/home-color.png")} />
                                    <Text style={{
                                        color: focused ? activeTabColor : nonActiveTabColor,
                                        fontSize: 12, 
                                        // fontFamily: "Poppins-Regular",
                                    }}>Home</Text>
                                </>
                                :
                                <Image source={require("../assets/images/icons/home_gray.png")} />
                            }
                        </View>
                    )
                },
            }} />
        <Tab.Screen name="Settings" component={Settings}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {focused ?
                            <>
                                <Image source={require("../assets/images/icons/settings-color.png")} />
                                <Text style={{
                                    color: focused ? activeTabColor : nonActiveTabColor,
                                    fontSize: 12, 
                                    // fontFamily: "Poppins-Regular",
                                }}>Settings</Text>
                            </>
                            :
                            <Image source={require("../assets/images/icons/settings_gray.png")} />
                        }
                    </View>
                ),
            }}></Tab.Screen>

        <Tab.Screen name="Profile" component={Profile}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {focused ?
                            <>
                                <Image source={require("../assets/images/icons/person-color.png")} />
                                <Text style={{
                                    color: focused ? activeTabColor : nonActiveTabColor,
                                    fontSize: 12,
                                    //  fontFamily: "Poppins-Regular",
                                }}>Profile</Text>
                            </>
                            :
                            <Image source={require("../assets/images/icons/person_gray.png")} />
                        }
                    </View>
                ),
            }}></Tab.Screen>
    </Tab.Navigator>
)