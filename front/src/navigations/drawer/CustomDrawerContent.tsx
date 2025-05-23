import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CustomDrawerContent(props : DrawerContentComponentProps){

    const {getProfileQuery} = useAuth();
    const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};

    return (
    <SafeAreaView style = {styles.container}>
    <DrawerContentScrollView 
        {...props}
        scrollEnabled={false} 
        contentContainerStyle = {styles.contentContainer}>

        <View style = {styles.userInfoContainer}>
            <View style = {styles.userImageContainer}>
                {imageUri === null && kakaoImageUri === null && (
                <Image source = {require('@/assets/user_default.png')} style = {styles.userImage}/>
                )}
                {imageUri === null && kakaoImageUri !== null && (
                <Image source = {{uri: kakaoImageUri }} style = {styles.userImage} />
                )}
                {imageUri !== null && (
                <Image source = {{uri: imageUri }} style = {styles.userImage} />
                )}

            </View>
            <Text style = {styles.nameText}>
                {nickname ?? email}
            </Text>
        </View>
        <DrawerItemList {...props} />

    </DrawerContentScrollView>
    </SafeAreaView>
    );
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
    },
    contentContainer:{
        backgroundColor: colors.WHITE,
    },
    userInfoContainer:{
        alignItems : 'center',
        marginTop : 15,
        marginBottom : 30,
        marginHorizontal : 15,
    },
    nameText:{
        color: colors.BLACK,
    },
    userImage:{
        width : '100%',
        height : '100%',
        borderRadius : 35,
    },
    userImageContainer :{
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
    }
});


export default CustomDrawerContent;