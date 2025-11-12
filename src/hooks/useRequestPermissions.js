import { PermissionsAndroid, Platform } from 'react-native';

export async function requestBackgroundPermissions() {
  // iOS пока не поддерживает Health Connect
  if (Platform.OS !== 'android') return;

  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
    ];

    // На Android 14+ добавляем отдельное разрешение на сбор данных в фоне
    if (Platform.Version >= 34) {
      permissions.push(PermissionsAndroid.PERMISSIONS.BODY_SENSORS_BACKGROUND);
    }

    const granted = await PermissionsAndroid.requestMultiple(permissions);

    const allGranted = Object.values(granted).every(
      (status) => status === PermissionsAndroid.RESULTS.GRANTED
    );

    if (allGranted) {
      console.log('✅ Все необходимые разрешения выданы');
      return true;
    } else {
      console.warn('⚠️ Не все разрешения были выданы пользователем');
      return false;
    }
  } catch (err) {
    console.error('Ошибка при запросе разрешений:', err);
    return false;
  }
}
