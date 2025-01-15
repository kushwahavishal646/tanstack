import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const RetryQueryExample = () => {
  const [timestamp, setTimestamp] = useState([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      setTimestamp([...timestamp," ", new Date().toLocaleString()]);
      const response = await fetch('https://postman-echo.com/gt?test=123'); //wrong api
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    retry: 5, // Retry up to 3 times
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Data Fetching with React Query</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {timestamp && (
        <p >
          <strong>API called at:</strong> {timestamp}
        </p>
      )}
      {data && (
        <div>
          <h3>Fetched Data:</h3>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default RetryQueryExample;
