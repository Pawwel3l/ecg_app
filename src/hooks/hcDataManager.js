import { useEffect, useState } from 'react';
import { 
  readHeartRate, 
  readBloodPressure, 
  readOxygenSaturation, 
  readHeartRateVariability, 
} from '../services/healthService'; 

export const useHealthConnect = () => {
  const [heartRate, setHeartRate] = useState([]);
  const [bloodPressure, setBloodPressure] = useState([]);
  const [oxygen, setOxygen] = useState([]);
  const [hrv, setHrv] = useState([]); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const end = new Date().toISOString();
        const start = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const [hr, bp, ox, vhr] = await Promise.all([
          readHeartRate(start, end),
          readBloodPressure(start, end),
          readOxygenSaturation(start, end),
          readHeartRateVariability(start, end), 
        ]);

        setHeartRate(hr);
        setBloodPressure(bp);
        setOxygen(ox);
        setHrv(vhr);
        
      } catch (err) {
        console.error('Health Connect error:', err);
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Произошла неизвестная ошибка при доступе к Health Connect.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { heartRate, bloodPressure, oxygen, hrv, loading, error };
};