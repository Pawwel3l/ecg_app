import { initialize, requestPermission } from 'react-native-health-connect';

export const setupHealthConnect = async () => {
  await initialize();
  const permissions = [
    { accessType: 'read', recordType: 'HeartRate' },
    { accessType: 'read', recordType: 'HeartRateVariabilityRmssd' },
    { accessType: 'read', recordType: 'OxygenSaturation' },
    { accessType: 'read', recordType: 'BloodPressure' },
    // { accessType: 'read', recordType: 'Electrocardiogram' },
  ];
  await requestPermission(permissions);
};
//План: Добавить управление разрешениями, например на случай отклонения и проверка постояного присутсвия разрешений