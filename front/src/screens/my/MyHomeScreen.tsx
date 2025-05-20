import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import CustomHomeContent from "./CustomHomeContent";

function MyHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>mypage</Text>
      </View>
      <CustomHomeContent />

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyHomeScreen;
