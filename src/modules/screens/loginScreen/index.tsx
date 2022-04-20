import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { MainStackParamList } from 'src/modules/navigations/MainStackScreen';
import { postLoginRequest } from 'src/modules/redux/actions/user';
import { RouteNames } from 'src/shared/helpers/routeName';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const onLogin = useCallback(() => {
        dispatch(postLoginRequest({
            grantType: "password",
            email: "liffu@yopmail.com",
            password: "Admin123!"
        }));
        // navigation.navigate(RouteNames.HomeScreen);
    }, []);

    return <View>
        <TouchableOpacity activeOpacity={0.6} style={styles.btnLogin} onPress={onLogin}>
            <Text>
                Login
            </Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    btnLogin: {
        width: '100%',
        padding: 16,
        backgroundColor: 'pink'
    },
});

export default LoginScreen;