import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { initialize } from 'react-native-health-connect';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  useEffect(() => {
    const initHealthConnect = async () => {
      try {
        await setupHealthConnect();
        console.log('✅ Health Connect успешно инициализирован');
      } catch (error) {
        console.error('❌ Ошибка инициализации Health Connect:', error);
      }
    };

    initHealthConnect();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DashboardScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
