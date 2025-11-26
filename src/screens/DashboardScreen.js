import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, ScrollView } from 'react-native';
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

const last10HeartRate = data.heartRate
  ?.slice()
  .sort((a, b) => new Date(b.time) - new Date(a.time))
  .slice(0, 10) ?? [];

const last10BloodPressure = data.bloodPressure
  ?.slice()
  .sort((a, b) => new Date(b.time) - new Date(a.time))
  .slice(0, 10) ?? [];

const last10Oxygen = data.oxygen
  ?.slice()
  .sort((a, b) => new Date(b.time) - new Date(a.time))
  .slice(0, 10) ?? [];

const last10Hrv = data.hrv
  ?.slice()
  .sort((a, b) => new Date(b.time) - new Date(a.time))
  .slice(0, 10) ?? [];

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}contentContainerStyle={{ paddingBottom: 40 }}>
    <View style={{ marginTop: 20, width: '90%' }}>
    <Text style={styles.title}>📊 Последние 10 записей</Text>

  {/* Пульс */}
  <Text style={styles.subtitle}>💓 Пульс (bpm)</Text>
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Время</Text>
      <Text style={styles.tableHeader}>BPM</Text>
    </View>
    {last10HeartRate.map((r, i) => (
      <View key={i} style={styles.tableRow}>
        <Text style={styles.tableCell}>{new Date(r.time).toLocaleTimeString()}</Text>
        <Text style={styles.tableCell}>{r.bpm ?? '—'}</Text>
      </View>
    ))}
  </View>

  {/* Давление */}
  <Text style={styles.subtitle}>💉 Давление (мм рт.ст.)</Text>
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Время</Text>
      <Text style={styles.tableHeader}>Сист/Диаст</Text>
    </View>
    {last10BloodPressure.map((r, i) => (
      <View key={i} style={styles.tableRow}>
        <Text style={styles.tableCell}>{new Date(r.time).toLocaleTimeString()}</Text>
        <Text style={styles.tableCell}>
          {r.systolic ?? '—'}/{r.diastolic ?? '—'}
        </Text>
      </View>
    ))}
  </View>

  {/* Кислород */}
  <Text style={styles.subtitle}>🫁 Кислород (%)</Text>
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Время</Text>
      <Text style={styles.tableHeader}>%</Text>
    </View>
    {last10Oxygen.map((r, i) => (
      <View key={i} style={styles.tableRow}>
        <Text style={styles.tableCell}>{new Date(r.time).toLocaleTimeString()}</Text>
        <Text style={styles.tableCell}>{r.percentage ?? '—'}</Text>
      </View>
    ))}
  </View>

  {/* ВСР (rMSSD) */}
  <Text style={styles.subtitle}>🩺Вариабельность сердечного ритма (мс)</Text>
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Время</Text>
      <Text style={styles.tableHeader}>rMSSD</Text>
    </View>
    {last10Hrv.map((r, i) => (
      <View key={i} style={styles.tableRow}>
        <Text style={styles.tableCell}>{new Date(r.time).toLocaleTimeString()}</Text>
        <Text style={styles.tableCell}>{r.rmssd ?? '—'}</Text>
      </View>
    ))}
  </View>
  {lastUpdated && (
  <Text style={styles.subtext}>
    ⏱ Обновлено: {lastUpdated.toLocaleTimeString()}
  </Text>
)}

<Button title="🔄 Обновить вручную" onPress={handleManualUpdate}style={{ marginTop: 30 }} />
</View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 18, marginVertical: 5 },
  subtext: { fontSize: 14, color: 'gray', marginTop: 8 },
  center: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  table: { borderWidth: 1, borderColor: '#ccc', marginTop: 5, marginBottom: 10 , paddingBottom: 5 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 4 },
  tableHeader: { fontWeight: 'bold', width: '50%', textAlign: 'center' },
  tableCell: { width: '50%', textAlign: 'center' },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 }
});
