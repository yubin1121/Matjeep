import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MyHomeScreen from '@/screens/my/MyHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen'
import MapStackNavigator, { MapStackParamList } from '../stack/MapStackNavigator';
import { colors, mainNavigations } from '@/constants';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type MainTabParamList = {
    [mainNavigations.HOME] : NavigatorScreenParams<MapStackParamList>;
    [mainNavigations.FEED] : undefined;
    [mainNavigations.CALENDAR] : undefined;
    [mainNavigations.MY] : undefined;
    [mainNavigations.POST] : undefined;
}

function BottomTabIcons(route: RouteProp<MainTabParamList>, focused: boolean, color: string){
    let iconName = '';

    switch(route.name){
        case mainNavigations.HOME: iconName = 'map'; break;
        case mainNavigations.FEED: iconName = 'apps'; break;
        case mainNavigations.CALENDAR: iconName = 'view-module'; break;
        case mainNavigations.MY: iconName = 'settings'; break;
        case mainNavigations.POST: iconName = 'map'; break;
    }

    return <MaterialIcons name={iconName} size={24} color={color} />;
}


const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,  // 탭 내비게이터에서 헤더를 숨기기
                tabBarIcon: ({focused, color}) => BottomTabIcons(route, focused, color),
                tabBarStyle: {
                    backgroundColor: '#f8f8f8',  // 탭 바 배경 색상
                    paddingBottom: 5,  // 탭 바 아래 여백
                    height: 60,  // 탭 바 높이
                },
                tabBarActiveTintColor: colors.ORANGE_400,
                tabBarInactiveTintColor: colors.GRAY_500,
                tabBarActiveBackgroundColor:colors.PINK_200,
                tabBarInactiveBackgroundColor:colors.GRAY_100,
            })}
        >
            <Tab.Screen
                name= {mainNavigations.HOME}
                component={MapStackNavigator}
            />
            <Tab.Screen
                name= {mainNavigations.FEED}
                component={FeedHomeScreen}
                options={{
                    title: '피드',
                }}
            />
            <Tab.Screen
                name= {mainNavigations.MY}
                component={MyHomeScreen}
                options={{ 
                    title: 'MY',
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTabNavigator;
