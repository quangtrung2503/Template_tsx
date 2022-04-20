import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RouteNames } from '../../shared/helpers/routeName';
import LoginScreen from '../screens/loginScreen';

export type AuthStackParamList = {
    LoginScreen: {},
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
    return <AuthStack.Navigator>
        <AuthStack.Screen name={RouteNames.LoginScreen} component={LoginScreen} />
    </AuthStack.Navigator>
};

export default AuthStackScreen;