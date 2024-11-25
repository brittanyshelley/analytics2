// import { useEffect, useState } from 'react';

// const OperatorDetails = ({ operatorGuid }) => {
//   const [operatorDetails, setOperatorDetails] = useState(null);

//   useEffect(() => {
//     const fetchOperatorDetails = async () => {
//       try {
//         const res = await fetch(`/api/uptrends/operators/${operatorGuid}`);
//         const data = await res.json();
//         setOperatorDetails(data);
//       } catch (error) {
//         console.error('Error fetching operator details:', error);
//       }
//     };

//     fetchOperatorDetails();
//   }, [operatorGuid]);

//   if (!operatorDetails) return <p>Loading...</p>;

//   return (
//     <div>
//       <h3>Operator Details</h3>
//       <p>Name: {operatorDetails.Name}</p>
//       <p>Email: {operatorDetails.Email}</p>
//       {/* Add other details as needed */}
//     </div>
//   );
// };

// export default OperatorDetails;

// import { useEffect, useState } from 'react';

// const OperatorDetails = ({ operatorGuid }) => {
//   const [operator, setOperator] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOperatorDetails = async () => {
//       try {
//         const res = await fetch(`/api/uptrends/operators/${operatorGuid}`);
//         if (!res.ok) throw new Error('Failed to fetch operator details');
//         const data = await res.json();
//         setOperator(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchOperatorDetails();
//   }, [operatorGuid]);

//   if (error) return <div>Error: {error}</div>;
//   if (!operator) return <div>Loading...</div>;

//   return (
//     <div>
//       <h3>Operator Details</h3>
//       <p>Name: {operator.Name}</p>
//       <p>Email: {operator.Email}</p>
//       <button onClick={() => window.history.back()}>Back to List</button>
//     </div>
//   );
// };

// export default OperatorDetails;
import { useEffect, useState } from 'react';

const OperatorDetails = ({ operatorGuid }) => {
  const [operatorDetails, setOperatorDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOperatorDetails = async () => {
      try {
        const res = await fetch(`/api/uptrends/operators/${operatorGuid}`);
        if (!res.ok) throw new Error('Failed to fetch operator details');
        const data = await res.json();
        setOperatorDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (operatorGuid) {
      fetchOperatorDetails();
    } else {
      setError('Missing operator GUID');
    }
  }, [operatorGuid]);

  if (error) return <div>Error: {error}</div>;
  if (!operatorDetails) return <div>Loading...</div>;

  return (
    <div>
      <h3>Operator Details</h3>
      <p>Name: {operatorDetails.Name}</p>
      <p>Email: {operatorDetails.Email}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default OperatorDetails;