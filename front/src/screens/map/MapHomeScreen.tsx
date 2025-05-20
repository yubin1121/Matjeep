import React, { useRef, useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, LatLng, Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, mapNavigations, alerts } from '@/constants';
import CustomMarker from '@/components/CustomMarker';
import useAuth from '@/hooks/queries/useAuth';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import useGetMarkers from '@/hooks/queries/useGetMarkers';

function MapHomeScreen() {
  const { logoutMutation } = useAuth();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const mapRef = useRef<MapView | null>(null);
  const { userLocation, isUserLocationError } = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>(null);
  const { data: markers = [] } = useGetMarkers();

  usePermission('LOCATION');

  // 바텀시트
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }
    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });
    setSelectLocation(null);
    bottomSheetRef.current?.close();
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) return;
    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  // 지도 롱프레스 → 위치 선택 + 바텀시트 오픈
  const handleLongPressMapView = ({ nativeEvent }: { nativeEvent: any }) => {
    setSelectLocation(nativeEvent.coordinate);
    console.log('롱프레스 위치:', nativeEvent.coordinate);
    bottomSheetRef.current?.expand();
  };

  // 지도 탭(클릭)으로 바꾸고 싶으면 onPress로 바꿔도 됩니다.

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        onLongPress={handleLongPressMapView}
        region={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
      
        {markers.map(({ id, color, score, ...coordinate }) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
          />
        ))}
        {selectLocation && (
          <Marker coordinate={selectLocation} />
        )}
      </MapView>

      {/* 기존 버튼 */}
      <View style={[styles.buttonList, { bottom: inset.bottom + 80 }]}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>

      {/* 바텀시트: 위치 선택 후 노출 */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ marginBottom: 10 }}>
            {selectLocation
              ? `선택한 위치: ${selectLocation.latitude}, ${selectLocation.longitude}`
              : '위치를 선택해 주세요.'}
          </Text>
          <Pressable style={styles.addButton} onPress={handlePressAddPost}>
            <Text style={{ color: colors.WHITE, fontWeight: 'bold' }}>다음 화면으로</Text>
          </Pressable>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonList: {
    position: 'absolute',
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.ORANGE_800,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
  },
  addButton: {
    backgroundColor: colors.ORANGE_800,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
  },
});

export default MapHomeScreen;
