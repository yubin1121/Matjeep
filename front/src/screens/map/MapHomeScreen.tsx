import React, { useRef, useState } from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import MapView, {PROVIDER_GOOGLE, LatLng, Marker, LongPressEvent, Callout} from 'react-native-maps';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainTabParamList } from '@/navigations/drawer/MainTabNavigator';

import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/CustomMarker';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainTabParamList>
>;

// 1. 나의 위치를 구하고,
// 2. 지도를 그 곳으로 이동

function MapHomeScreen() {

  const {logoutMutation} = useAuth();
  const inset = useSafeAreaInsets();
  console.log('inset:', inset);
  const navigation = useNavigation<Navigation>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>(null);


  usePermission('LOCATION');

  const handleLogout = () => {
    logoutMutation.mutate(null);
  }

  const handlePressUserLocation = () =>{
    if(isUserLocationError){
      //에러메시지를 표시하기
      return;
    }
    //console.log('latitude, longitude', userLocation.latitude, userLocation.longitude);
    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude:userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
	
  const handleLongPressMapView = ({ nativeEvent }: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };


  return (
  <SafeAreaView style = {styles.container}  edges={['right', 'left', 'top']}>
    <MapView 
       style = {styles.mapContainer} 
       provider={PROVIDER_GOOGLE} 
       showsUserLocation
       followsUserLocation
       showsMyLocationButton={false}
       ref={mapRef}
       customMapStyle={mapStyle}
       onLongPress={handleLongPressMapView}
     >
      <CustomMarker 
        color='RED'
        coordinate={{
        latitude: 37.5516032365118,
        longitude: 126.98989626020192,}}
        />
      <CustomMarker 
        color='BLUE'
        coordinate={{
        latitude: 37.5616032365118,
        longitude: 126.98989626020192,}}
        />

      {selectLocation && (
        <Marker coordinate={selectLocation}>
        <Callout>
          <Text>선택한 위치입니다</Text>
        </Callout>
        </Marker>
      )}
     </MapView>

     <View style={[styles.buttonList, { bottom: inset.bottom + 80 }]}>
      <Pressable style = {styles.mapButton} onPress={handlePressUserLocation}>
        <MaterialIcons name = 'my-location' color={colors.WHITE} size= {25}/>
      </Pressable>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
  },
  mapContainer:{
    flex : 1
  },
  buttonList:{
    position : 'absolute',
    bottom: 30,
    right : 15,
  },
  mapButton:{
    backgroundColor : colors.ORANGE_800,
    marginVertical : 5,
    height : 48,
    width : 48,
    right: 15,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 30,
    shadowColor: colors.BLACK,
    shadowOffset : {width:1, height:2},
    shadowOpacity: 0.5,
    elevation : 2,
  }
});

export default MapHomeScreen;