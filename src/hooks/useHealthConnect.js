import { useEffect, useState } from 'react';
import { 
  setupHealthConnect, 
  readHeartRate, 
  readBloodPressure, 
  readOxygenSaturation 
} from '../services/healthService';

export const useHealthConnect = () => {
  const [heartRate, setHeartRate] = useState([]);
  const [bloodPressure, setBloodPressure] = useState([]);
  const [oxygen, setOxygen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await setupHealthConnect();

        const end = new Date().toISOString();
        const start = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const [hr, bp, ox] = await Promise.all([
          readHeartRate(start, end),
          readBloodPressure(start, end),
          readOxygenSaturation(start, end),
        ]);

        setHeartRate(hr);
        setBloodPressure(bp);
        setOxygen(ox);
      } catch (err) {
        console.error('Health Connect error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { heartRate, bloodPressure, oxygen, loading, error };
};
