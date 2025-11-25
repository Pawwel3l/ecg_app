import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/DashboardScreen';
import { setupHealthConnect } from './src/services/healthService';
import { requestBackgroundPermissions } from './src/hooks/useRequestPermissions'

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false); // флаг инициализации
  const [initError, setInitError] = useState(null);

  useEffect(() => {
   const initHealthConnect = async () => {
      try {
        // 2️⃣ После этого инициализируем Health Connect
        await setupHealthConnect();
        console.log('✅ Health Connect успешно инициализирован');

        // // 1️⃣ Сначала запрашиваем системные разрешения
        // const granted = await requestBackgroundPermissions();
        // if (!granted) {
        //   console.warn('⚠️ Не все разрешения были выданы пользователем');
        // }

        setIsInitialized(true);
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
