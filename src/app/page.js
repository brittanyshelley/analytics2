// app/page.js
import Link from 'next/link';



export default function HomePage() {
  // Read monitor group IDs from environment variables


  return (
    <div className="home">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Custom Dashboard</h1>
      <p className="text-lg mb-4">
        This dashboard integrates VMware, SolarWinds, and Uptrends data for centralized monitoring.
      </p>

      <Link href="/dashboard" className="text-blue-600 underline">
        Go to Dashboard
      </Link>
    </div>
  );
}
