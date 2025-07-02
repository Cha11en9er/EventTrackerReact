import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './SchedulePage.css';

function SchedulePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios.get('http://localhost:8000/api/schedule_data')
        .then(res => setData(res.data))
        .catch(() => setData([]))
        .finally(() => setLoading(false));
    }, []);
  
    if (loading) return <div>Загрузка...</div>;
  
    return (
      <div>
        <h1>Расписание</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
  
  export default SchedulePage;