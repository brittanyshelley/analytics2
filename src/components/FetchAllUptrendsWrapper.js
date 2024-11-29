// components/FetchAllUptrendsWrapper.js
'use client'; // This directive ensures the component is treated as a client component

import dynamic from 'next/dynamic';

const FetchAllUptrends = dynamic(() => import('./FetchAllUptrends'), { ssr: false });

const FetchAllUptrendsWrapper = () => {
  return <FetchAllUptrends />;
};

export default FetchAllUptrendsWrapper;