import 'react-native-reanimated'; // 👈 이거 제일 위에!
import React from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import queryClient from '@/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';



function App(){
  return (
    <QueryClientProvider client = {queryClient} >
     <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}


export default App;
