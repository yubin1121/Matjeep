import React ,  { useRef }  from 'react';
import {StyleSheet, View, Text,SafeAreaView, Button} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface FeedHomeScreenProps {

}

function FeedHomeScreen() {
  const sheetRef = useRef<BottomSheet>(null);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Sheet" onPress={() => sheetRef.current?.expand()} />
      <BottomSheet ref={sheetRef} index={-1} snapPoints={['25%']}>
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Close" onPress={() => sheetRef.current?.close()} />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});

export default FeedHomeScreen;