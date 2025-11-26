import { readRecords } from 'react-native-health-connect';

export const readHeartRate = async (start, end) => {
  const { records } = await readRecords('HeartRate', {
    timeRangeFilter: { operator: 'between', startTime: start, endTime: end },
  });
  return records;
};

// Давление
export const readBloodPressure = async (start, end) => {
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

export const readHeartRateVariability = async (start, end) => {
  const result = await readRecords('HeartRateVariabilityRmssd', {
    timeRangeFilter: { operator: 'between', startTime: start, endTime: end },
  });

  return result.records.map(r => ({
    // Безопасный доступ: если rmssd — объект с value, берём value, иначе само значение
    rmssd: r.rmssd?.value ?? r.rmssd ?? null,
    time: r.startTime ?? null,
  }));
};

