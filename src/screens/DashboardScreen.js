import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { startAutoUpdater } from '../utils/Updater';
import { useHealthConnect } from '../hooks/hcDataManager';

export default function DashboardScreen() {
  const { heartRate, bloodPressure, oxygen, hrv, loading: hookLoading, error: hookError } = useHealthConnect();
  const [data, setData] = useState({
    heartRate: [],
    bloodPressure: [],
    oxygen: [],
    hrv: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let stopUpdater;

    const init = async () => {
      try {
        stopUpdater = startAutoUpdater((newData) => {
          setData(newData);
          setLastUpdated(new Date());
          setLoading(false);
        }, 60 * 60 * 1000);

        console.log('✅ Автообновление данных запущено');
      } catch (err) {
        console.error('❌ Ошибка при инициализации Health Connect:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    init();

    return () => {
      if (stopUpdater) stopUpdater();
    };
  }, []);

  // 🔘 Ручное обновление (через useHealthConnect)
  const handleManualUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      setData({
        heartRate,
        bloodPressure,
        oxygen,
        hrv,
      });
      setLastUpdated(new Date());
      console.log('🔄 Ручное обновление данных');
    } catch (err) {
      console.error('❌ Ошибка ручного обновления:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error || hookError)
    return <Text style={styles.error}>Ошибка: {error || hookError}</Text>;

  const latestHeartRate = (data.heartRate?.[0]?.samples?.[0]?.beatsPerMinute) ?? 'Нет данных';
  const latestBP = data.bloodPressure?.[0]?.samples?.[0];
  const systolic = latestBP?.systolic?.value ?? '—';
  const diastolic = latestBP?.diastolic?.value ?? '—';
  const latestOxygen = data.oxygen?.[0]?.samples?.[0]?.percentage ?? 'Нет данных';
  const latestHrv = data.hrv?.[0]?.samples?.[0]?.rmssd ?? 'Нет данных'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Health Connect Dashboard</Text>
      <Text style={styles.text}>💓 Пульс: {latestHeartRate} bpm</Text>
      <Text style={styles.text}>💉 Давление: {systolic}/{diastolic} мм рт.ст.</Text>
      <Text style={styles.text}>🫁 Кислород: {latestOxygen}%</Text>
      <Text style ={styles.text}>ВСР (rMSSD): {latestHrv} записей</Text>

      {lastUpdated && (
        <Text style={styles.subtext}>
          ⏱ Обновлено: {lastUpdated.toLocaleTimeString()}
        </Text>
      )}

      <Button title="🔄 Обновить вручную" onPress={handleManualUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 18, marginVertical: 5 },
  subtext: { fontSize: 14, color: 'gray', marginTop: 8 },
  center: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
