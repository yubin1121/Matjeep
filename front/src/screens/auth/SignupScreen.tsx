import React, { useRef } from 'react';
import {StyleSheet, View} from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import CustomButton from '@/components/CustomButton';
import {validateSignup} from '@/utils'
import useAuth from '@/hooks/queries/useAuth';

function SignScreen() {
    const passwordRef = useRef<TextInput | null>(null);
    const passwordConfirmRef = useRef<TextInput | null>(null);

    const signup = useForm({
        initialValue: {email: '', password: '', passwordConfirm: ''},
        validate : validateSignup,
    });

    const {signupMutation, loginMutation} = useAuth();
	
	const handleSubmit = () => {
		const {email, password} = signup.values;
		
		
		console.log('signup.values', signup.values);
		signupMutation.mutate(
				{email, password}, 
				{
					onSuccess: () => loginMutation.mutate(signup.values),
				},
		);
	
	};


  return (
    <SafeAreaView style= {styles.container}>
        <View style = {styles.inputContainer}>
            <InputField 
                autoFocus
                placeholder="이메일" 
                error= {signup.errors.email}
                touched={signup.touched.email}
                inputMode="email" 
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={()=> passwordRef.current?.focus()}
                {...signup.getTextInputProps('email')}
            />
            <InputField 
                ref={passwordRef}
                placeholder="비밀번호" 
                textContentType="oneTimeCode"
                error= {signup.errors.password}
                touched={signup.touched.password}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={()=> passwordConfirmRef.current?.focus()}
                secureTextEntry 
                {...signup.getTextInputProps('password')}
            />
            <InputField 
                ref={passwordConfirmRef}
                placeholder="비밀번호확인" 
                error= {signup.errors.passwordConfirm}
                touched={signup.touched.passwordConfirm}
                secureTextEntry 
                onSubmitEditing={handleSubmit}
                {...signup.getTextInputProps('passwordConfirm')}
            />
        </View>
        <CustomButton
            label='회원가입' 
            onPress = {handleSubmit}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 30,
    },
    inputContainer:{
        gap: 20,
        marginBottom: 30,
    },

});

export default SignScreen;