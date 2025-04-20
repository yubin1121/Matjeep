import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View, Button, SafeAreaView, Image, Dimensions} from 'react-native';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/constants/navigations';
import CustomButton from '@/components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.AUTH_HOME>; 

function AuthHomeScreen({navigation} : AuthHomeScreenProps) {
  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.imageContainer}>
        <Image
          resizeMode= "contain" 
          style={styles.image}  source={require('@/assets/matzip.png')}/>
      </View>
      <View style = {styles.buttonContainer}>
        <CustomButton 
          label="로그인하기"
          onPress={()=> navigation.navigate(authNavigations.LOGIN)}
         />
        <CustomButton 
          label="회원가입으로 이동" 
          variant="outlined"
          onPress={()=> navigation.navigate(authNavigations.SIGNUP)} 
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 30,
    alignItems : 'center',
  },
  buttonContainer:{
    flex: 1,
    gap : 10, 
  },
  imageContainer:{
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default AuthHomeScreen;