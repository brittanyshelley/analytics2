// app/dashboard/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <p>Failed to load data: {error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
