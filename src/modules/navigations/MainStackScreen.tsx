import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RouteNames } from '../../shared/helpers/routeName';
import HomeScreen from '../screens/homeScreen';
import LoginScreen from '../screens/loginScreen';

export type MainStackParamList = {
    HomeScreen?: {},
    LoginScreen?: {},
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
    return <MainStack.Navigator>
        <MainStack.Screen name={RouteNames.HomeScreen} component={HomeScreen} />
        <MainStack.Screen name={RouteNames.LoginScreen} component={LoginScreen} />
    </MainStack.Navigator>
};

export default MainStackScreen;