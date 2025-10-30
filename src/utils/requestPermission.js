import { Alert } from 'react-native';
import { initialize, requestPermission, getGrantedPermissions } from 'react-native-health-connect';

/**
 * Инициализирует Health Connect и проверяет / запрашивает разрешения.
 * Возвращает true, если разрешения выданы, иначе false.
 */
export async function requestHealthPermissions(recordTypes = ['ActiveCaloriesBurned']) {
  try {
    // 1️⃣ Инициализация клиента
    const isInitialized = await initialize();
    console.log('Health Connect initialized:', isInitialized);

    if (!isInitialized) {
      Alert.alert('Ошибка', 'Не удалось инициализировать Health Connect.');
      return false;
    }

    // 2️⃣ Проверка уже выданных разрешений
    const existing = await getGrantedPermissions();
    const granted = recordTypes.every(type =>
      existing.some(p => p.recordType === type && p.accessType === 'read' && p.granted)
    );

    if (granted) {
      console.log('Все разрешения уже выданы:', existing);
      return true;
    }

    // 3️⃣ Запрос недостающих разрешений
    const permissionsToRequest = recordTypes.map(type => ({
      accessType: 'read',
      recordType: type,
    }));

    const grantedPermissions = await requestPermission(permissionsToRequest);
    console.log('Granted permissions:', grantedPermissions);

    // 4️⃣ Проверка результата
    const allGranted = grantedPermissions.every(p => p.granted);

    if (!allGranted) {
      Alert.alert(
        'Требуются разрешения',
        'Для корректной работы приложения необходимо разрешить доступ к данным Health Connect.'
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error('Ошибка при запросе разрешений:', error);
    Alert.alert('Ошибка', 'Не удалось получить разрешения Health Connect.');
    return false;
  }
}