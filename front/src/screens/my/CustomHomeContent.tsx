import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function CustomHomeContent(){
    const {logoutMutation, getProfileQuery} = useAuth();

    const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
    const handleLogout = () => {

        console.log('로그아웃 버튼 클릭!');
        logoutMutation.mutate(null);
    };

    return (
    <View 
        style = {styles.contentContainer}>

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

            <Pressable
                 onPress={handleLogout}
                 style={styles.logoutButton}
            >
            <Text style={styles.logoutText}>로그아웃</Text>
            </Pressable>
        </View>

    </View>
    );
}

const styles= StyleSheet.create({

    contentContainer:{
        flex: 1,
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
    },
    logoutButton: {
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: colors.ORANGE_800, // 원하는 색상
        borderRadius: 8,
      },
      logoutText: {
        color: colors.BLACK,
        fontWeight: 'bold',
      },
});


export default CustomHomeContent;