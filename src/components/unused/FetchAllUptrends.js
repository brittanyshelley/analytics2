import React from 'react';
import useFetchUptrends from '../hooks/useFetchUptrends';

const FetchAllUptrends = () => {
  const { data, loading, error } = useFetchUptrends();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Monitor Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default FetchAllUptrends;