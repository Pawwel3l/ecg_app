import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useHealthConnect } from '../hooks/useHealthConnect';

export default function DashboardScreen() {
  const { heartRate, bloodPressure, oxygen, loading, error } = useHealthConnect();

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <Text style={styles.error}>Ошибка: {error}</Text>;

  const latestHeartRate = heartRate?.[0]?.samples?.[0]?.beatsPerMinute ?? 'Нет данных';
  const latestBP = bloodPressure?.[0]
    ? `${bloodPressure[0].systolic}/${bloodPressure[0].diastolic}`
    : 'Нет данных';
  const latestOxygen = oxygen?.[0]?.percentage ?? 'Нет данных';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Health Connect Dashboard</Text>
      <Text style={styles.text}>💓 Пульс: {latestHeartRate} bpm</Text>
      <Text style={styles.text}>🩸 Давление: {latestBP} мм рт.ст.</Text>
      <Text style={styles.text}>🫁 Кислород: {latestOxygen}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 18, marginVertical: 5 },
  center: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
