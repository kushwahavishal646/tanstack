import React from 'react';
import { useQuery } from '@tanstack/react-query';

const SerialQueryExample = () => {
  // Fetch data from the first API
  const { data: astroData, isLoading: isLoadingAstros } = useQuery({
    queryKey: ['astroData'],
    queryFn: () =>
      fetch('http://api.open-notify.org/astros').then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch astro data');
        }
        return res.json();
      }),
  });

  // Fetch data from the second API with a hardcoded value
  const { data: echoData, isLoading: isLoadingEcho } = useQuery({
    queryKey: ['echoData'],
    queryFn: () =>
      fetch(`https://postman-echo.com/get?test=123`).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch echo data');
        }
        return res.json();
      }),
  });

  if (isLoadingAstros || isLoadingEcho) {
    return <div>Loading...</div>;
  }

  if (!astroData || !echoData) {
    return <div>Error loading data</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Serial Query Example</h1>
      <h3>Astronaut Data:</h3>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
        {JSON.stringify(astroData, null, 2)}
      </pre>
      <h3>Echo Data:</h3>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
        {JSON.stringify(echoData, null, 2)}
      </pre>
    </div>
  );
};

export default SerialQueryExample;
