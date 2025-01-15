import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';

//service
const fetchSearchResults = async (query) => {
  const response = await fetch(`https://postman-echo.com/get?test=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  return response.json();
};

const DebouncedQueryExample = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleSearchChange = debounce((value) => {
    setDebouncedSearch(value);
  }, 1000);

  const onInputChange = (event) => {
    setSearch(event.target.value);
    handleSearchChange(event.target.value);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchResults', debouncedSearch],
    queryFn: () => fetchSearchResults(debouncedSearch),
    enabled: !!debouncedSearch, 
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onInputChange}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>Search Results:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre> 
        </div>
      )}
    </div>
  );
};

export default DebouncedQueryExample;
