import AuthStackNavigator from "../stack/AuthStackNavigator";
import MainDrawerNavigator from "../drawer/MainDrawerNavigator";
import MainTabNavigator from "../bottomtab/MainTabNavigator";
import useAuth from '@/hooks/queries/useAuth'
import { useEffect } from "react";


function RootNavigator(){

    const {isLogin} = useAuth();

    useEffect(() => {
        console.log('🧩 isLogin:', isLogin);
      }, [isLogin]);
    
    return (
        <>  
            {isLogin ? <MainTabNavigator /> : <AuthStackNavigator />}
        </>
    );
}

export default RootNavigator;