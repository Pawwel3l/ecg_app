import React from 'react';
import { Button, View, Text } from 'react-native';
import {
  initialize,
  requestPermission,
  getGrantedPermissions,
  readRecords,
} from 'react-native-health-connect';

export default function App() {
  const readStepsData = async () => {
    try {
      // 1️⃣ Инициализация Health Connect
      const initialized = await initialize();
      console.log('✅ Health Connect initialized:', initialized);

      // 2️⃣ Запрос разрешений на шаги
      const permissionsToRequest = [
        { accessType: 'read', recordType: 'Steps' },
      ];

      await requestPermission(permissionsToRequest);
      console.log('📌 Requested permissions for Steps');

      // 3️⃣ Получаем реально выданные разрешения
      const granted = await getGrantedPermissions();
      console.log('✅ Granted permissions:', granted);

      // 4️⃣ Проверяем разрешение на Steps
      const hasStepsPermission = granted.some(
        p => p.accessType === 'read' && p.recordType === 'Steps'
      );

      if (!hasStepsPermission) {
        console.warn('⚠️ Permission not granted for Steps');
        return;
      }

      // 5️⃣ Чтение данных шагов за последний месяц
      const records = await readRecords('Steps', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2025-10-01T00:00:00.000Z',
          endTime: '2025-10-31T23:59:59.999Z',
        },
      });

      console.log('🔥 Steps Records:', records.records);

      if (records.records.length === 0) {
        console.warn('⚠️ Нет данных о шагах за выбранный период');
      }

    } catch (error) {
      console.error('❌ Error reading Steps data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Health Connect Steps Demo</Text>
      <Button title="Read Steps Data" onPress={readStepsData} />
    </View>
  );
}
