import { useEffect, useState } from 'react';
import { setupHealthConnect, readHeartRate, readEcg } from '../services/healthService';

export const useHealthConnect = () => {
  const [heartRate, setHeartRate] = useState([]);
  const [ecg, setEcg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await setupHealthConnect();
        const end = new Date().toISOString();
        const start = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const [hr, ecgData] = await Promise.all([
          readHeartRate(start, end),
          readEcg(start, end),
        ]);

        setHeartRate(hr);
        setEcg(ecgData);
      } catch (err) {
        console.error('Health Connect error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { heartRate, ecg, loading, error };
};
