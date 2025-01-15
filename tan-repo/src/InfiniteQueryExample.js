import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchCatFacts = async ({ pageParam = 1 }) => {
  const response = await fetch(`https://catfact.ninja/facts?page=${pageParam}&limit=10`);
  if (!response.ok) {
    throw new Error('Failed to fetch cat facts');
  }
  return response.json();
};

const InfiniteQueryExample = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['catFacts'],
    queryFn: fetchCatFacts,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.current_page + 1;
      return nextPage <= lastPage.last_page ? nextPage : undefined;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Failed to fetch cat facts</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Infinite Query Example: Cat Facts</h1>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          <h3>Page {page.current_page}</h3>
          <ul>
            {page.data.map((fact) => (
              <li key={fact.fact}>{fact.fact}</li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: '#FFF',
          cursor: 'pointer',
        }}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'No More Data'}
      </button>
    </div>
  );
};

export default InfiniteQueryExample;
