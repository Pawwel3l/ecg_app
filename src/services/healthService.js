import { initialize, requestPermission, readRecords } from 'react-native-health-connect';

export const setupHealthConnect = async () => {
  await initialize();
  const permissions = [
    { accessType: 'read', recordType: 'Steps' },
    { accessType: 'read', recordType: 'HeartRate' },
    // { accessType: 'read', recordType: 'Electrocardiogram' },
  ];
  await requestPermission(permissions);
};

export const readHeartRate = async (start, end) => {
  const { records } = await readRecords('HeartRate', {
    timeRangeFilter: { operator: 'between', startTime: start, endTime: end },
  });
  return records;
};

// export const readEcg = async (start, end) => {
//   const { records } = await readRecords('Electrocardiogram', {
//     timeRangeFilter: { operator: 'between', startTime: start, endTime: end },
//   });
//   return records;
// };
