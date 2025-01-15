import React from 'react';
import { useQueries } from '@tanstack/react-query';

const ParallelQueryExample = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['astroData'], // First API: Astronaut data with delay
        queryFn: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              fetch('http://api.open-notify.org/astros')
                .then((res) => {
                  if (!res.ok) {
                    throw new Error('Failed to fetch astro data');
                  }
                  return res.json();
                })
                .then(resolve)
                .catch((err) => {
                  throw new Error(err.message);
                });
            }, 2000); // 1-second delay
          }),
      },
      {
        queryKey: ['echoData'], // Second API: Echo test data
        queryFn: () =>
          fetch('https://postman-echo.com/get?test=123').then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch echo data');
            }
            return res.json();
          }),
      },
    ],
  });

  // Destructure the query results
  const [astroDataResult, echoDataResult] = results;

  // Check loading states
  if (astroDataResult.isLoading || echoDataResult.isLoading) {
    return <div>Loading...</div>;
  }

  // Check error states
  if (astroDataResult.error || echoDataResult.error) {
    return <div>Error: Failed to fetch data</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Parallel Query Example</h1>
      <h3>Astronaut Data (with 2-second delay):</h3>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
        {JSON.stringify(astroDataResult.data, null, 2)}
      </pre>
      <h3>Echo Data:</h3>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
        {JSON.stringify(echoDataResult.data, null, 2)}
      </pre>
    </div>
  );
};

export default ParallelQueryExample;
