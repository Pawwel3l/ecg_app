import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';
import { setupHealthConnect } from './services/healthService';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false); // флаг инициализации
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    const initHealthConnect = async () => {
      try {
        await setupHealthConnect();
        console.log('✅ Health Connect успешно инициализирован');
        setIsInitialized(true); // готово — можно рендерить Dashboard
      } catch (error) {
        console.error('❌ Ошибка инициализации Health Connect:', error);
        setInitError(error);
      }
    };

    initHealthConnect();
  }, []);

  if (initError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Ошибка инициализации Health Connect</Text>
        <Text>{initError.message}</Text>
      </SafeAreaView>
    );
  }

  if (!isInitialized) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Загрузка данных Health Connect...</Text>
      </SafeAreaView>
    );
  }

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
