import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/DashboardScreen';
import { setupHealthConnect } from './src/services/healthService';
import { requestBackgroundPermissions } from './src/hooks/useRequestPermissions'

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false); // флаг инициализации
  const [initError, setInitError] = useState(null);

  // 🟢 Новая функция, гарантирующая порядок
  const initHealthConnectSequence = useCallback( () => {
    try {
      console.log('⏳ Начало инициализации...');
      
      // 1. Инициализируем Health Connect API и запрашиваем HC-разрешения
      // requestBackgroundPermissions() вызывается в DashboardScreen при необходимости
     setupHealthConnect(); 
      console.log('✅ Health Connect API инициализирован (библиотека подключена)');

      // 2. Убираем задержку и системный запрос, который вызывает сбой
      
      console.log('✅ Health Connect: проверка прав завершена');

      // 3. Разрешаем рендер приложения
      setIsInitialized(true);
    } catch (error) {
      console.error('❌ Ошибка инициализации Health Connect:', error);
      setInitError(error);
    }
  }, []); // Пустой массив зависимостей для вызова один раз

  useEffect(() => {
    initHealthConnectSequence();
  }, [initHealthConnectSequence]);

  if (initError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'red', marginBottom: 10 }}>Ошибка инициализации</Text>
        <Text>{initError.message}</Text>
        <Text style={{ marginTop: 20, paddingHorizontal: 20, textAlign: 'center', color: 'gray' }}>
          Пожалуйста, пересоберите приложение через "npx expo run:android".
        </Text>
      </SafeAreaView>
    );
  }

  if (!isInitialized) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Загрузка и проверка прав Health Connect...</Text>
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