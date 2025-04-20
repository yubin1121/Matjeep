import React from 'react';
import {StyleSheet, View, Text,SafeAreaView} from 'react-native';

interface CalendarHomeScreenProps {

}

function CalendarHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <View><Text>캘린더</Text></View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});

export default CalendarHomeScreen;