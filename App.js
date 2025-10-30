import React, { useState } from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';

export default function App() {
  // Состояние для хранения прочитанных данных
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState('Нажмите кнопку для чтения данных');

  const readSampleData = async () => {
    try {
      setStatus('Инициализация...');
      const isInitialized = await initialize();
      console.log('Health Connect initialized:', isInitialized);

      setStatus('Запрашиваем разрешения...');
      const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
      ]);

      console.log('Granted permissions:', grantedPermissions);

      if (!grantedPermissions.find(p => p.granted)) {
        setStatus('❌ Разрешения не выданы');
        return;
      }

      setStatus('Читаем данные...');
      const result = await readRecords('ActiveCaloriesBurned', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2023-01-09T12:00:00.405Z',
          endTime: '2023-01-09T23:53:15.405Z',
        },
      });

      console.log('Records:', result.records);
      setRecords(result.records || []);
      setStatus(`✅ Найдено записей: ${result.records?.length || 0}`);
    } catch (error) {
      console.error('Error reading Health Connect data:', error);
      setStatus('⚠️ Ошибка при чтении данных');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
        Health Connect Demo
      </Text>
      <Button title="Прочитать данные о калориях" onPress={readSampleData} />
      <Text style={{ marginVertical: 10, textAlign: 'center' }}>{status}</Text>

      {/* Отображение данных */}
      <ScrollView style={{ marginTop: 10 }}>
        {records.length > 0 ? (
          records.map((item, index) => (
            <View
              key={index}
              style={{
                marginBottom: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
              }}
            >
              <Text>Начало: {item.startTime}</Text>
              <Text>Конец: {item.endTime}</Text>
              <Text>Калории: {item.energy?.inKilocalories ?? 'нет данных'}</Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: '#999' }}>
            Нет данных для отображения
          </Text>
        )}
      </ScrollView>
    </View>
  );
}