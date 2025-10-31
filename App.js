import React from 'react';
import { Button, View, Text } from 'react-native';
import {
  initialize,
  requestPermission,
  getGrantedPermissions,
  readRecords,
} from 'react-native-health-connect';

export default function App() {
  const readSampleData = async () => {
    try {
      // 1️⃣ Инициализация Health Connect
      const initialized = await initialize();
      console.log('✅ Health Connect initialized:', initialized);

      // 2️⃣ Запрос разрешений
      const permissionsToRequest = [
        { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
        { accessType: 'read', recordType: 'HeartRate' },
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'ExerciseSession' },
        { accessType: 'read', recordType: 'SleepSession' },
      ];

      await requestPermission(permissionsToRequest);
      console.log('📌 Requested permissions');

      // 3️⃣ Получение реально выданных разрешений
      const granted = await getGrantedPermissions();
      console.log('✅ Granted permissions:', granted);

      // 4️⃣ Проверяем конкретное разрешение ActiveCaloriesBurned
      const hasCaloriesPermission = granted.some(
        p => p.accessType === 'read' && p.recordType === 'ActiveCaloriesBurned'
      );

      if (!hasCaloriesPermission) {
        console.warn('⚠️ Permission not granted for ActiveCaloriesBurned');
        return;
      }

      // 5️⃣ Чтение данных
      const records = await readRecords('ActiveCaloriesBurned', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2025-10-25T00:00:00.000Z',
          endTime: '2025-10-31T23:59:59.999Z',
        },
      });

      console.log('🔥 ActiveCaloriesBurned Records:', records.records);

    } catch (error) {
      console.error('❌ Error reading Health Connect data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Health Connect Demo</Text>
      <Button title="Request & Read" onPress={readSampleData} />
    </View>
  );
}
