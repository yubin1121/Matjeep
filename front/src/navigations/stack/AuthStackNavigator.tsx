import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignScreen from '@/screens/auth/SignupScreen';
import { authNavigations } from '@/constants/navigations';
import { createStackNavigator } from '@react-navigation/stack';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]:undefined;
  [authNavigations.LOGIN]:undefined;
  [authNavigations.SIGNUP]:undefined;
};


const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
        cardStyle:{
          backgroundColor : 'white',
        },
        headerStyle:{
          backgroundColor : 'white',
          shadowColor : 'gray',
        },
        headerTitleStyle: {
          fontSize : 15,
        },
        headerTintColor: 'black'
      }
    }>
        <Stack.Screen name = {authNavigations.AUTH_HOME} component = {AuthHomeScreen} 
                      options={{
                        headerTitle: '  ',
                        headerShown: false,
                      }}/>
        <Stack.Screen name = {authNavigations.LOGIN} component = {LoginScreen} 
                      options={{
                        headerTitle: '로그인'
                      }}/>
        <Stack.Screen name = {authNavigations.SIGNUP} component = {SignScreen} 
                      options={{
                        headerTitle: '회원가입'
                      }}/>
    </Stack.Navigator> 
  )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;