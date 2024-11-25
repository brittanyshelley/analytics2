import axios from 'axios';

// Create a specialized Axios instance for Uptrends
const createUptrendsApiClient = () => {
  const username = process.env.UPTRENDS_API_USERNAME;
  const password = process.env.UPTRENDS_API_PASSWORD;

  if (!username || !password) {
    throw new Error('Uptrends API credentials are missing');
  }

  const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

  return axios.create({
    baseURL: 'https://api.uptrends.com/v4',
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    },
  });
};

export default createUptrendsApiClient;
