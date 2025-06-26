import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InfoPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The backend server runs on port 8000
    axios.get('http://127.0.0.1:8000/api/data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setError(error);
        setLoading(false);
      });
  }, []); // The empty array ensures this effect runs only once

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data! Make sure the backend server is running.</p>;

  return (
    <div>
      {data && (
        <>
          <h2>{data.title}</h2>
          <ul>
            {data.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default InfoPage;