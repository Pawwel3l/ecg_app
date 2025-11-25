import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';

export const setupHealthConnect = async () => {
  await initialize();
  const permissions = [
    { accessType: 'read', recordType: 'HeartRateRecord' },
    { accessType: 'read', recordType: 'OxygenSaturationRecord' },
    { accessType: 'read', recordType: 'BloodPressureRecord' },
  ];
  await requestPermission(permissions);
};

export const readHeartRate = async (start, end) => {
  const { records } = await readRecords('HeartRateRecord', {
    timeRangeFilter: { operator: 'between', startTime: start, endTime: end },
  });
  return records;
};

// Давление
export const readBloodPressure = async (start, end) => {
  const result = await readRecords('BloodPressureRecord', {
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
  const result = await readRecords('OxygenSaturationRecord', {
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


// export const readEcg = async (start, end) => {
//   const { records } = await readRecords('Electrocardiogram', {
//     timeRangeFilter: { operator: 'between', startTime: start, endTime: end },
//   });
//   return records;
// };
