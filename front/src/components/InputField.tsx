import React, { ForwardedRef, forwardRef, useRef } from 'react';
import {StyleSheet, View, Text, Dimensions, TextInputProps} from 'react-native';
import { colors } from '../constants';
import { Pressable, TextInput } from 'react-native-gesture-handler';
import { mergeRefs } from '../utils';

interface InputFieldProps extends TextInputProps {
    disabled ?: boolean;
    error ?: string;
    touched ?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(({
    disabled = false,
    error,
    touched, 
    ...props

    }: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
    
    ) => {
    
        const innerRef = useRef<TextInput | null > (null);
        const handlePressInput =  () => {
        innerRef.current?.focus();
    
    };
  
    return (
    <Pressable onPress={handlePressInput}>
        <View style={[styles.container , 
                      disabled && styles.disabled, 
                      touched && Boolean(error) && styles.inputError]}>
            <TextInput 
                ref = {ref? mergeRefs(innerRef, ref) : innerRef }
                editable = {!disabled}
                placeholderTextColor={colors.GRAY_600}
                style=  {[styles.input , disabled && styles.disabled]}
                autoCapitalize="none"
                spellCheck = {false}
                autoCorrect = {false}
                {...props}
            />
            { touched && Boolean(error) && <Text style={styles.error}>{error} </Text> }
        </View>
    </Pressable>
  )
});

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor: colors.GRAY_400,
        padding:deviceHeight > 700 ? 15 : 10 ,
    },
    input: {
        fontSize:16,
        color: colors.BLACK,
        padding: 0,
    },
    disabled: {
        backgroundColor : colors.GRAY_400,
        color : colors.GRAY_800,
    },
    inputError: {
        borderWidth: 1,
        borderColor : colors.RED_500,
    },
    error: {
        color: colors.RED_500,
        fontSize : 12,
        paddingTop : 5,
    }
});

export default InputField;