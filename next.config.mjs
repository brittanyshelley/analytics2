// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Environment variables to expose to the server-side runtime
//   env: {
//     UPTRENDS_API_USERNAME: process.env.UPTRENDS_API_USERNAME,
//     UPTRENDS_API_PASSWORD: process.env.UPTRENDS_API_PASSWORD,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables to expose to the server-side runtime
  env: {
    UPTRENDS_API_USERNAME: process.env.UPTRENDS_API_USERNAME,
    UPTRENDS_API_PASSWORD: process.env.UPTRENDS_API_PASSWORD,
  },

  // Modify Webpack configuration
  webpack: (config, { dev, isServer }) => {
    if (dev && isServer) {
      console.log('Server-side Webpack config adjusted for source maps.');
    }

    return config; // Don't set `devtool` explicitly to avoid warnings
  },
};

export default nextConfig;

