import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';

export default function App() {
  const readSampleData = async () => {
    try {
      // 1️⃣ Инициализация Health Connect клиента
      const isInitialized = await initialize();
      console.log('Health Connect initialized:', isInitialized);

      // 2️⃣ Запрос разрешений
      const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
      ]);

      console.log('Granted permissions:', grantedPermissions);

      // 3️⃣ Проверка разрешений
      if (!grantedPermissions.find(p => p.granted)) {
        console.warn('Permission not granted for ActiveCaloriesBurned');
        return;
      }

      // 4️⃣ Чтение данных
      const result = await readRecords('ActiveCaloriesBurned', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2023-01-09T12:00:00.405Z',
          endTime: '2023-01-09T23:53:15.405Z',
        },
      });

      console.log('Records:', result.records);
    } catch (error) {
      console.error('Error reading Health Connect data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Health Connect Demo</Text>
      <Button title="Read Calories Data" onPress={readSampleData} />
    </View>
  );
}
