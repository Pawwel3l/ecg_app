import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';

export const setupHealthConnect = async () => {
  await initialize();

  // 🔴
 БЫЛО: recordType: 'HeartRateRecord'
  // 🟢
 СТАЛО: recordType: 'HeartRate'
  const permissions = [
    { accessType: 'read', recordType: 'HeartRate' },
    { accessType: 'read', recordType: 'OxygenSaturation' },
    { accessType: 'read', recordType: 'BloodPressure' },
  ];

   await requestPermission(permissions);
};

export const readHeartRate = async (start, end) => {
  // 🔴
 БЫЛО: 'HeartRateRecord'
  // 🟢
 СТАЛО: 'HeartRate'
  const { records } = await readRecords('HeartRate', {
    timeRangeFilter: { operator: 'between', startTime: start, endTime: end },
  });
  return records;
};

// Давление
export const readBloodPressure = async (start, end) => {
  // 🔴
 БЫЛО: 'BloodPressureRecord'
  // 🟢
 СТАЛО: 'BloodPressure'
  const result = await readRecords('BloodPressure', {
    timeRangeFilter: {
      operator: 'between',
      startTime: start,
      endTime: end,
    },
  });

  return result.records.map(r => ({
    systolic: r.systolic,
    diastolic: r.diastolic,
    time: r.startTime,
  }));
};

// Уровень кислорода
export const readOxygenSaturation = async (start, end) => {
  // 🔴
 БЫЛО: 'OxygenSaturationRecord'
  // 🟢
 СТАЛО: 'OxygenSaturation'
  const result = await readRecords('OxygenSaturation', {
    timeRangeFilter: {
      operator: 'between',
      startTime: start,
      endTime: end,
    },
  });

  return result.records.map(r => ({
    percentage: r.percentage,
    time: r.startTime,
  }));
};