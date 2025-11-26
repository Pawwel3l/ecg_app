import { readRecords } from 'react-native-health-connect';

export const readHeartRate = async (start, end) => {
  const result = await readRecords('HeartRate', { timeRangeFilter: { operator: 'between', startTime: start, endTime: end } });
  return result.records.map(r => ({
  bpm: r.samples?.[0]?.beatsPerMinute ?? null,
  time: r.startTime ?? null,
}));
};

export const readBloodPressure = async (start, end) => {
  const { records } = await readRecords('BloodPressure', { timeRangeFilter: { operator: 'between', startTime: start, endTime: end } });

  const getBPValue = (bp) => {
    if (!bp) return null;
    if (typeof bp === 'number') return bp;
    if (bp.inMillimetersOfMercury != null) return bp.inMillimetersOfMercury;
    if (bp.value != null) return bp.value;
    return null;
  };

  return records.map(r => ({
    systolic: getBPValue(r.systolic),
    diastolic: getBPValue(r.diastolic),
    time: r.startTime ?? null,
  }));
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



