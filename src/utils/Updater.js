import { setupHealthConnect, readHeartRate, readBloodPressure, readOxygenSaturation } from '../services/healthService';

/**
 * Автоматически обновляет данные Health Connect каждые N миллисекунд.
 * @param {function} onUpdate — колбэк, куда передаются новые данные
 * @param {number} interval — интервал в миллисекундах (по умолчанию 1 час)
 */
export const startAutoUpdater = (onUpdate, interval = 60 * 60 * 1000) => {
  let intervalId = null;

  const autoFetchData = async () => {
    try {
      const end = new Date().toISOString();
      const start = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const [hr, bp, spo2] = await Promise.all([
        readHeartRate(start, end),
        readBloodPressure(start, end),
        readOxygenSaturation(start, end),
      ]);

      console.log('♻️ Данные обновлены:', {
        heartRate: hr?.[0],
        bloodPressure: bp?.[0],
        oxygen: spo2?.[0],
      });

      onUpdate({ heartRate: hr, bloodPressure: bp, oxygen: spo2 });
    } catch (err) {
      console.error('❌ Ошибка автообновления:', err);
    }
  };

  // первое чтение при запуске
  autoFetchData();

  // 🔧 вот тут исправляем
  intervalId = setInterval(autoFetchData, interval);

  console.log(`🔁 Автообновление запущено каждые ${interval / 1000 / 60} минут`);

  return () => {
    clearInterval(intervalId);
    console.log('⏹ Автообновление остановлено');
  };
};
