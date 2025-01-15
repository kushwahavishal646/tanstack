import React from "react";

import { useQuery } from '@tanstack/react-query';

const Fetch = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'],
    queryFn: () => fetch('https://postman-echo.com/get?test=123').then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
     {JSON.stringify(data)}
    </div>
  );
};

export default Fetch;
