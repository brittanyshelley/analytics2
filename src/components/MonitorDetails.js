
// export default MonitorDetails;
// import React, { useState, useEffect } from "react";

// const MonitorDetails = ({ monitorGroupGuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonitorData = async () => {
//       try {
//         const response = await fetch(`/api/uptrends/MonitorChecks?monitorGroupGuid=${monitorGroupGuid}`);
//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.statusText}`);
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (monitorGroupGuid) {
//       fetchMonitorData();
//     }
//   }, [monitorGroupGuid]);

//   if (loading) {
//     return <p style={styles.loading}>Loading...</p>;
//   }

//   if (error) {
//     return <p style={styles.error}>Error: {error}</p>;
//   }

//   return (
//     <div style={styles.container}>
//       {data.map((monitor, index) => (
//         <div
//           key={index}
//           style={styles.monitorCard}
//           onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
//           onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
//         >
//           <h3 style={styles.monitorName}>{monitor.Name}</h3>
//           <p>
//             <strong>IsActive:</strong>{" "}
//             <span style={monitor.IsActive ? styles.active : styles.inactive}>
//               {monitor.IsActive ? "Yes" : "No"}
//             </span>
//           </p>
//           <p>
//             <strong>MonitorType:</strong> {monitor.MonitorType}
//           </p>
//           {monitor.MonitorChecks && monitor.MonitorChecks.length > 0 ? (
//             monitor.MonitorChecks.map((check, checkIndex) => (
//               <div key={checkIndex} style={styles.checkCard}>
//                 {Object.entries(check.Attributes).map(([key, value]) => (
//                   <p key={key}>
//                     <strong>{key}:</strong> {value}
//                   </p>
//                 ))}
//               </div>
//             ))
//           ) : (
//             <p style={styles.noChecks}>No Monitor Checks available.</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: "20px",
//     padding: "20px",
//     background: "linear-gradient(to bottom, #f0f4f8, #d9e2ec)",
//   },
//   monitorCard: {
//     borderRadius: "10px",
//     padding: "20px",
//     backgroundColor: "#fff",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     border: "1px solid rgba(0, 0, 0, 0.1)",
//     fontFamily: "'Roboto', sans-serif",
//     fontSize: "1rem",
//     lineHeight: "1.5",
//     color: "#333",
//   },
//   monitorName: {
//     fontSize: "1.25rem",
//     fontWeight: "bold",
//     color: "#004d80",
//     marginBottom: "10px",
//   },
//   active: {
//     color: "#00796b",
//     fontWeight: "bold",
//   },
//   inactive: {
//     color: "#d32f2f",
//     fontWeight: "bold",
//   },
//   checkCard: {
//     marginTop: "15px",
//     padding: "15px",
//     borderRadius: "10px",
//     backgroundColor: "#f9f9f9",
//     border: "1px solid #e0e0e0",
//     fontSize: "0.9rem",
//     color: "#555",
//   },
//   noChecks: {
//     fontStyle: "italic",
//     color: "#888",
//   },
//   loading: {
//     fontSize: "1.25rem",
//     fontStyle: "italic",
//     color: "#333",
//     textAlign: "center",
//     margin: "50px",
//   },
//   error: {
//     color: "#b00020",
//     fontWeight: "bold",
//     fontSize: "1.25rem",
//     textAlign: "center",
//     margin: "50px",
//   },
// };

// export default MonitorDetails;

import React, { useState, useEffect } from "react";

const MonitorDetails = ({ monitorGroupGuid }) => {
  const [data, setData] = useState([]); // Processed data with most recent checks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get the most recent check for each monitor
  const getMostRecentChecks = (monitors) => {
    return monitors.map((monitor) => {
      const { MonitorGuid, Name, MonitorChecks } = monitor;

      // Handle cases where MonitorChecks is empty
      if (!MonitorChecks || MonitorChecks.length === 0) {
        return { MonitorGuid, Name, MostRecentCheck: null };
      }

      // Find the most recent check by comparing timestamps
      const mostRecentCheck = MonitorChecks.reduce((latest, current) => {
        return new Date(current.Attributes.Timestamp) > new Date(latest.Attributes.Timestamp)
          ? current
          : latest;
      });

      return {
        MonitorGuid,
        Name,
        MostRecentCheck: mostRecentCheck,
      };
    });
  };

  // Fetch monitor data and process it
  useEffect(() => {
    const fetchMonitorData = async () => {
      try {
        setLoading(true);

        // Fetch the data from your API
        const response = await fetch(`/api/uptrends/MonitorChecks?monitorGroupGuid=${monitorGroupGuid}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const result = await response.json();

        // Process data to get the most recent checks
        const processedData = getMostRecentChecks(result);
        setData(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (monitorGroupGuid) {
      fetchMonitorData();
    }
  }, [monitorGroupGuid]);

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.error}>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      {data.map(({ MonitorGuid, Name, MostRecentCheck }, index) => (
        <div
          key={index}
          style={styles.monitorCard}
          onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
        >
          <h3 style={styles.monitorName}>{Name}</h3>
          <p>
            <strong>Monitor GUID:</strong> {MonitorGuid}
          </p>
          {MostRecentCheck ? (
            <div style={styles.checkCard}>
              <p>
                <strong>Check Time:</strong>{" "}
                {new Date(MostRecentCheck.Attributes.Timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {MostRecentCheck.Attributes.ErrorDescription}
              </p>
              <p>
                <strong>Total Time (ms):</strong> {MostRecentCheck.Attributes.TotalTime}
              </p>
              <p>
                <strong>Resolved IP:</strong> {MostRecentCheck.Attributes.ResolvedIpAddress}
              </p>
            </div>
          ) : (
            <p style={styles.noChecks}>No recent checks available.</p>
          )}
        </div>
      ))}
    </div>
  );
};


const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
    background: "linear-gradient(to bottom, #f0f4f8, #d9e2ec)",
  },
  monitorCard: {
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#333",
  },
  monitorName: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#004d80",
    marginBottom: "10px",
  },
  active: {
    color: "#00796b",
    fontWeight: "bold",
  },
  inactive: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  checkCard: {
    marginTop: "15px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #e0e0e0",
    fontSize: "0.9rem",
    color: "#555",
  },
  noChecks: {
    fontStyle: "italic",
    color: "#888",
  },
  loading: {
    fontSize: "1.25rem",
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
    margin: "50px",
  },
  error: {
    color: "#b00020",
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "center",
    margin: "50px",
  },
};
// Styles for the component
// const styles = {
//   container: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "20px",
//     padding: "20px",
//   },
//   monitorCard: {
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     padding: "16px",
//     width: "300px",
//     backgroundColor: "#f9f9f9",
//     transition: "transform 0.3s",
//   },
//   monitorName: {
//     fontSize: "18px",
//     fontWeight: "bold",
//   },
//   checkCard: {
//     backgroundColor: "#e9e9e9",
//     borderRadius: "4px",
//     padding: "8px",
//     marginTop: "8px",
//   },
//   noChecks: {
//     color: "#888",
//     fontStyle: "italic",
//   },
//   loading: {
//     fontSize: "18px",
//     textAlign: "center",
//   },
//   error: {
//     color: "red",
//     fontSize: "18px",
//     textAlign: "center",
//   },
// };

export default MonitorDetails;

