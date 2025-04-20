import React from 'react';
import {StyleSheet, View, Text,SafeAreaView} from 'react-native';

interface FeedHomeScreenProps {

}

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <View><Text>피드</Text></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});

export default FeedHomeScreen;