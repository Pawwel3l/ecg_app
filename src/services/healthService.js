import { readRecords } from 'react-native-health-connect';

export const readHeartRate = async (start, end) => {
  const result = await readRecords('HeartRate', { timeRangeFilter: { operator: 'between', startTime: start, endTime: end } });
  return result.records.map(r => ({
  bpm: r.samples?.[0]?.beatsPerMinute ?? null,
  time: r.startTime ?? null,
}));
};

export const readBloodPressure = async (start, end) => {
  const result = await readRecords('BloodPressure', { timeRangeFilter: { operator: 'between', startTime: start, endTime: end } });
  return result.records.map(r => ({ systolic: r.systolic ?? null, diastolic: r.diastolic ?? null, time: r.startTime ?? null }));
};

export const readOxygenSaturation = async (start, end) => {
  const result = await readRecords('OxygenSaturation', { timeRangeFilter: { operator: 'between', startTime: start, endTime: end } });
  return result.records.map(r => ({ percentage: r.percentage ?? null, time: r.startTime ?? null }));
};

export const readHeartRateVariability = async (start, end) => {
  const { records } = await readRecords('HeartRateVariabilityRmssd', {
    timeRangeFilter: { operator: 'between', startTime: start, endTime: end },
  });
  return records.map(r => ({
    rmssd: r.heartRateVariabilityMillis ?? null,
    time: r.time ?? null,
  }));
};



