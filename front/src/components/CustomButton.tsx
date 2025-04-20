import React from 'react';
import {StyleSheet, View, Pressable, Text, PressableProps, Dimensions} from 'react-native';
import { colors } from '../constants';

interface CustomButtonProps extends PressableProps {
    label: string;
    variant ?: 'filled' | 'outlined';
    size?: 'large' | 'medium';
    inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height ;

function CustomButton({
    label, 
    variant = 'filled', 
    size = 'large',
    inValid = false,
    ...props
  }: CustomButtonProps) {
   // console.log( 'screen', Dimensions.get('screen').height )
   // console.log( 'window', Dimensions.get('window').height )
   // console.log(styles.filledPressed)
  return (
    <Pressable 
        disabled={inValid}
        style={({pressed}) => [
        styles.container, 
        inValid && styles.inValid,  
        pressed ? styles[`${variant}Pressed`] : styles[variant] // ✅ `pressed` 상태일 때 우선 적용
    ]}

    {...props}
    >
    <View style = {
        styles[size]}>        
        <Text style = {[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </View>
    
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius : 3,
        justifyContent : 'center',
        flexDirection : 'row',
    },
    inValid:{
        opacity : 0.5,
    },
    filled : {
        backgroundColor: colors.ORANGE_800,
    },
    outlined : {
        borderColor: colors.ORANGE_800,
        borderWidth: 1,
    },
    filledPressed:{
        backgroundColor: colors.ORANGE_600,
    },
    outlinedPressed:{
        borderColor: colors.ORANGE_600,
        borderWidth: 1,
        opacity: 0.5,
    },
    large : {
        width : '100%',
        paddingVertical : deviceHeight>700 ? 15 : 10 ,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
    },
    medium :{
        width : '50%',
        paddingVertical : deviceHeight>700 ? 12 : 8 ,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
    },
    text:{
        fontSize: 15,
        fontWeight : '700',
    },
    filledText: {
        color :  colors.WHITE,
    },
    outlinedText:{
        color: colors.ORANGE_800,
    }
});

export default CustomButton;