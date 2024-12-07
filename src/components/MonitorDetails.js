// import { useEffect, useState } from 'react';

// const MonitorDetails = ({ monitorId }) => {
//   const [monitor, setMonitor] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonitorDetails = async () => {
//       try {
//         const res = await fetch(`/api/uptrends/monitors/${monitorId}`);
//         if (!res.ok) throw new Error('Failed to fetch monitor details');
//         const data = await res.json();
//         setMonitor(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchMonitorDetails();
//   }, [monitorId]);

//   if (error) return <div>Error: {error}</div>;
//   if (!monitor) return <div>Loading...</div>;

//   return (
//     <div>
//       <h3>Monitor Details</h3>
//       <p>Name: {monitor.Name}</p>
//       <p>Status: {monitor.Status}</p>
//       <p>Last Check: {monitor.LastCheck}</p>
//       <button onClick={() => window.history.back()}>Back to List</button>
//     </div>
//   );
// };

// export default MonitorDetails;
// import { useEffect, useState } from 'react';

// const MonitorDetails = ({ monitorId }) => {
//   const [monitor, setMonitor] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonitorDetails = async () => {
//       console.log(`Fetching details for monitor ID: ${monitorId}`);
//       try {
//         const res = await fetch(`/api/uptrends/monitors/${monitorId}`);
//         console.log(`API response status: ${res.status}`);
//         if (!res.ok) throw new Error('Failed to fetch monitor details');

//         const data = await res.json();
//         console.log('Fetched monitor data:', data);
//         setMonitor(data);
//       } catch (err) {
//         console.error('Error fetching monitor details:', err.message);
//         setError(err.message);
//       }
//     };

//     fetchMonitorDetails();
//   }, [monitorId]);

//   if (error) {
//     console.error('Rendering error:', error);
//     return <div>Error: {error}</div>;
//   }

//   if (!monitor) {
//     console.log('Monitor details are not yet loaded, rendering loading state...');
//     return <div>Loading...</div>;
//   }

//   console.log('Rendering monitor details:', monitor);
//   return (
//     <div>
//       <h3>Monitor Details</h3>
//       <p>Name: {monitor.Name}</p>
//       <p>Status: {monitor.IsActive}</p>
//       <p>Last Check: {monitor.LastCheck}</p>
//       <button onClick={() => {
//         console.log('Navigating back to the list');
//         window.history.back();
//       }}>
//         Back to List
//       </button>
//     </div>
//   );
// };

// export default MonitorDetails;
// 'use client';

// import { useEffect, useState } from 'react';

// const MonitorDetails = ({ monitorGroupGuid }) => {
//   const [monitors, setMonitors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonitorDetails = async () => {
//       if (!monitorGroupGuid) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(`/api/uptrends/monitor-groups/${monitorGroupGuid}`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch monitor details for group: ${monitorGroupGuid}`);
//         }
//         const data = await response.json();
//         setMonitors(data.Data); // Adjust based on your API's structure
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMonitorDetails();
//   }, [monitorGroupGuid]);

//   if (!monitorGroupGuid) {
//     return <div>Please provide a Monitor Group GUID.</div>;
//   }

//   if (loading) {
//     return <div>Loading monitor details...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (monitors.length === 0) {
//     return <div>No monitor details available.</div>;
//   }

//   return (
//     <div>
//       <h3>Monitor Details for Group: {monitorGroupGuid.Name}</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Monitor Name</th>
//             <th>Error Level</th>
//             <th>Error Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {monitors.map((monitor, index) => (
//             <tr key={index}>
//               <td>{monitor.Attributes.Name}</td>
//               <td>{monitor.Attributes.ErrorLevel}</td>
//               <td>{monitor.Attributes.ErrorDetails || 'N/A'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

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
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (monitorGroupGuid) {
//       fetchMonitorData();
//     }
//   }, [monitorGroupGuid]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

//   return (
//     <div>
//       {data.map((monitor, index) => (
//         <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//           <h3>{monitor.Name}</h3>
//           <p><strong>IsActive:</strong> {monitor.IsActive ? "Yes" : "No"}</p>
//           <p><strong>MonitorType:</strong> {monitor.MonitorType}</p>
//           {monitor.MonitorChecks && monitor.MonitorChecks.length > 0 ? (
//             monitor.MonitorChecks.map((check, checkIndex) => (
//               <div key={checkIndex} style={{ marginTop: "10px", padding: "10px", border: "1px dashed #aaa" }}>
//                 <p><strong>Timestamp:</strong> {check.Attributes.Timestamp}</p>
//                 <p><strong>ErrorCode:</strong> {check.Attributes.ErrorCode}</p>
//                 <p><strong>TotalTime:</strong> {check.Attributes.TotalTime}</p>
//                 <p><strong>ResolveTime:</strong> {check.Attributes.ResolveTime}</p>
//                 <p><strong>ConnectionTime:</strong> {check.Attributes.ConnectionTime}</p>
//                 <p><strong>DownloadTime:</strong> {check.Attributes.DownloadTime}</p>
//                 <p><strong>ResolvedIpAddress:</strong> {check.Attributes.ResolvedIpAddress}</p>
//                 <p><strong>ErrorLevel:</strong> {check.Attributes.ErrorLevel}</p>
//                 <p><strong>ErrorDescription:</strong> {check.Attributes.ErrorDescription}</p>
//                 <p><strong>ErrorMessage:</strong> {check.Attributes.ErrorMessage}</p>
//               </div>
//             ))
//           ) : (
//             <p>No Monitor Checks available.</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MonitorDetails;


// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// const MonitorDetails = () => {
//   const [searchParams] = useSearchParams();
//   const monitorGroupGuid = searchParams.get("monitorGroupGuid");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonitorData = async () => {
//       try {
//         if (!monitorGroupGuid) {
//           throw new Error("monitorGroupGuid is missing in the URL.");
//         }

//         const response = await fetch(`/api/uptrends/MonitorChecks?monitorGroupGuid=${monitorGroupGuid}`);
//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.statusText}`);
//         }
//         const result = await response.json();
//         setData(result);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchMonitorData();
//   }, [monitorGroupGuid]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

//   return (
//     <div>
//       {data.map((monitor, index) => (
//         <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//           <h3>{monitor.Name}</h3>
//           <p><strong>IsActive:</strong> {monitor.IsActive ? "Yes" : "No"}</p>
//           <p><strong>MonitorType:</strong> {monitor.MonitorType}</p>
//           {monitor.MonitorChecks && monitor.MonitorChecks.length > 0 ? (
//             monitor.MonitorChecks.map((check, checkIndex) => (
//               <div key={checkIndex} style={{ marginTop: "10px", padding: "10px", border: "1px dashed #aaa" }}>
//                 <p><strong>Timestamp:</strong> {check.Attributes.Timestamp}</p>
//                 <p><strong>ErrorCode:</strong> {check.Attributes.ErrorCode}</p>
//                 <p><strong>TotalTime:</strong> {check.Attributes.TotalTime}</p>
//                 <p><strong>ResolveTime:</strong> {check.Attributes.ResolveTime}</p>
//                 <p><strong>ConnectionTime:</strong> {check.Attributes.ConnectionTime}</p>
//                 <p><strong>DownloadTime:</strong> {check.Attributes.DownloadTime}</p>
//                 <p><strong>ResolvedIpAddress:</strong> {check.Attributes.ResolvedIpAddress}</p>
//                 <p><strong>ErrorLevel:</strong> {check.Attributes.ErrorLevel}</p>
//                 <p><strong>ErrorDescription:</strong> {check.Attributes.ErrorDescription}</p>
//                 <p><strong>ErrorMessage:</strong> {check.Attributes.ErrorMessage}</p>
//               </div>
//             ))
//           ) : (
//             <p>No Monitor Checks available.</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MonitorDetails;

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// const MonitorDetails = () => {
//   const router = useRouter();
//   const { monitorGroupGuid } = router.query; // Access the query parameter
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonitorData = async () => {
//       try {
//         if (!monitorGroupGuid) {
//           throw new Error("monitorGroupGuid is missing in the URL.");
//         }

//         const response = await fetch(`/api/uptrends/MonitorChecks?monitorGroupGuid=${monitorGroupGuid}`);
//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.statusText}`);
//         }
//         const result = await response.json();
//         setData(result);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (monitorGroupGuid) {
//       fetchMonitorData();
//     }
//   }, [monitorGroupGuid]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

//   return (
//     <div>
//       {data.map((monitor, index) => (
//         <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//           <h3>{monitor.Name}</h3>
//           <p><strong>IsActive:</strong> {monitor.IsActive ? "Yes" : "No"}</p>
//           <p><strong>MonitorType:</strong> {monitor.MonitorType}</p>
//           {monitor.MonitorChecks && monitor.MonitorChecks.length > 0 ? (
//             monitor.MonitorChecks.map((check, checkIndex) => (
//               <div key={checkIndex} style={{ marginTop: "10px", padding: "10px", border: "1px dashed #aaa" }}>
//                 <p><strong>Timestamp:</strong> {check.Attributes.Timestamp}</p>
//                 <p><strong>ErrorCode:</strong> {check.Attributes.ErrorCode}</p>
//                 <p><strong>TotalTime:</strong> {check.Attributes.TotalTime}</p>
//                 <p><strong>ResolveTime:</strong> {check.Attributes.ResolveTime}</p>
//                 <p><strong>ConnectionTime:</strong> {check.Attributes.ConnectionTime}</p>
//                 <p><strong>DownloadTime:</strong> {check.Attributes.DownloadTime}</p>
//                 <p><strong>ResolvedIpAddress:</strong> {check.Attributes.ResolvedIpAddress}</p>
//                 <p><strong>ErrorLevel:</strong> {check.Attributes.ErrorLevel}</p>
//                 <p><strong>ErrorDescription:</strong> {check.Attributes.ErrorDescription}</p>
//                 <p><strong>ErrorMessage:</strong> {check.Attributes.ErrorMessage}</p>
//               </div>
//             ))
//           ) : (
//             <p>No Monitor Checks available.</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

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
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (monitorGroupGuid) {
//       fetchMonitorData();
//     }
//   }, [monitorGroupGuid]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

// //   return (
// //     <div>
// //       {data.map((monitor, index) => (
// //         <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
// //           <h3>{monitor.Name}</h3>
// //           <p><strong>IsActive:</strong> {monitor.IsActive ? "Yes" : "No"}</p>
// //           <p><strong>MonitorType:</strong> {monitor.MonitorType}</p>
// //           {monitor.MonitorChecks && monitor.MonitorChecks.length > 0 ? (
// //             monitor.MonitorChecks.map((check, checkIndex) => (
// //               <div key={checkIndex} style={{ marginTop: "10px", padding: "10px", border: "1px dashed #aaa" }}>
// //                 <p><strong>Timestamp:</strong> {check.Attributes.Timestamp}</p>
// //                 <p><strong>ErrorCode:</strong> {check.Attributes.ErrorCode}</p>
// //                 <p><strong>TotalTime:</strong> {check.Attributes.TotalTime}</p>
// //                 <p><strong>ResolveTime:</strong> {check.Attributes.ResolveTime}</p>
// //                 <p><strong>ConnectionTime:</strong> {check.Attributes.ConnectionTime}</p>
// //                 <p><strong>DownloadTime:</strong> {check.Attributes.DownloadTime}</p>
// //                 <p><strong>ResolvedIpAddress:</strong> {check.Attributes.ResolvedIpAddress}</p>
// //                 <p><strong>ErrorLevel:</strong> {check.Attributes.ErrorLevel}</p>
// //                 <p><strong>ErrorDescription:</strong> {check.Attributes.ErrorDescription}</p>
// //                 <p><strong>ErrorMessage:</strong> {check.Attributes.ErrorMessage}</p>
// //               </div>
// //             ))
// //           ) : (
// //             <p>No Monitor Checks available.</p>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MonitorDetails;

// // return (
// //   <div style={styles.container}>
// //     {data.map((monitor, index) => (
// //       <div key={index} style={styles.monitorCard}>
// //         <h3 style={styles.monitorName}>{monitor.Name}</h3>
// //         <p><strong>IsActive:</strong> <span style={monitor.IsActive ? styles.active : styles.inactive}>{monitor.IsActive ? "Yes" : "No"}</span></p>
// //         <p><strong>MonitorType:</strong> {monitor.MonitorType}</p>
// //         {monitor.MonitorChecks && monitor.MonitorChecks.length > 0 ? (
// //           monitor.MonitorChecks.map((check, checkIndex) => (
// //             <div key={checkIndex} style={styles.checkCard}>
// //               <p><strong>Timestamp:</strong> {check.Attributes.Timestamp}</p>
// //               <p><strong>ErrorCode:</strong> {check.Attributes.ErrorCode}</p>
// //               <p><strong>TotalTime:</strong> {check.Attributes.TotalTime}</p>
// //               <p><strong>ResolveTime:</strong> {check.Attributes.ResolveTime}</p>
// //               <p><strong>ConnectionTime:</strong> {check.Attributes.ConnectionTime}</p>
// //               <p><strong>DownloadTime:</strong> {check.Attributes.DownloadTime}</p>
// //               <p><strong>ResolvedIpAddress:</strong> {check.Attributes.ResolvedIpAddress}</p>
// //               <p><strong>ErrorLevel:</strong> {check.Attributes.ErrorLevel}</p>
// //               <p><strong>ErrorDescription:</strong> {check.Attributes.ErrorDescription}</p>
// //               <p><strong>ErrorMessage:</strong> {check.Attributes.ErrorMessage}</p>
// //             </div>
// //           ))
// //         ) : (
// //           <p style={styles.noChecks}>No Monitor Checks available.</p>
// //         )}
// //       </div>
// //     ))}
// //   </div>
// // );
// // };

// // const styles = {
// // container: {
// //   display: "flex",
// //   flexWrap: "wrap",
// //   gap: "20px",
// //   padding: "20px",
// //   backgroundColor: "#ffffff",
// // },
// // monitorCard: {
// //   flex: "1 1 calc(33% - 20px)",
// //   border: "1px solid #ccc",
// //   borderRadius: "8px",
// //   padding: "15px",
// //   backgroundColor: "#fff",
// //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// // },
// // monitorName: {
// //   fontSize: "1.25rem",
// //   fontWeight: "bold",
// //   color: "#333",
// // },
// // active: {
// //   color: "green",
// //   fontWeight: "bold",
// // },
// // inactive: {
// //   color: "red",
// //   fontWeight: "bold",
// // },
// // checkCard: {
// //   marginTop: "10px",
// //   padding: "10px",
// //   border: "1px dashed #aaa",
// //   backgroundColor: "#f4f4f4",
// //   borderRadius: "5px",
// // },
// // noChecks: {
// //   fontStyle: "italic",
// //   color: "#666",
// // },
// // };

// // export default MonitorDetails;

// return (
//   <div style={styles.container}>
//     {data.map((monitor, index) => (
//       <div key={index} style={styles.monitorCard}>
//         <h3 style={styles.monitorName}>{monitor.Name}</h3>
//         <p><strong>IsActive:</strong> <span style={monitor.IsActive ? styles.active : styles.inactive}>{monitor.IsActive ? "Yes" : "No"}</span></p>
//         <p><strong>MonitorType:</strong> {monitor.MonitorType}</p>
//         {monitor.MonitorChecks && monitor.MonitorChecks.length > 0 ? (
//           monitor.MonitorChecks.map((check, checkIndex) => (
//             <div key={checkIndex} style={styles.checkCard}>
//               <p><strong>Timestamp:</strong> {check.Attributes.Timestamp}</p>
//               <p><strong>ErrorCode:</strong> {check.Attributes.ErrorCode}</p>
//               <p><strong>TotalTime:</strong> {check.Attributes.TotalTime}</p>
//               <p><strong>ResolveTime:</strong> {check.Attributes.ResolveTime}</p>
//               <p><strong>ConnectionTime:</strong> {check.Attributes.ConnectionTime}</p>
//               <p><strong>DownloadTime:</strong> {check.Attributes.DownloadTime}</p>
//               <p><strong>ResolvedIpAddress:</strong> {check.Attributes.ResolvedIpAddress}</p>
//               <p><strong>ErrorLevel:</strong> {check.Attributes.ErrorLevel}</p>
//               <p><strong>ErrorDescription:</strong> {check.Attributes.ErrorDescription}</p>
//               <p><strong>ErrorMessage:</strong> {check.Attributes.ErrorMessage}</p>
//             </div>
//           ))
//         ) : (
//           <p style={styles.noChecks}>No Monitor Checks available.</p>
//         )}
//       </div>
//     ))}
//   </div>
// );
// };

// const styles = {
// container: {
//   display: "flex",
//   flexWrap: "wrap",
//   gap: "20px",
//   padding: "20px",
//   background: "linear-gradient(145deg, #e0f7ff, #c2e7f5)",
// },
// monitorCard: {
//   flex: "1 1 calc(33% - 20px)",
//   borderRadius: "15px",
//   padding: "20px",
//   background: "rgba(255, 255, 255, 0.8)",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   backdropFilter: "blur(10px)",
//   border: "1px solid rgba(255, 255, 255, 0.3)",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   cursor: "pointer",
// },
// monitorCardHover: {
//   transform: "scale(1.02)",
//   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
// },
// monitorName: {
//   fontSize: "1.5rem",
//   fontWeight: "bold",
//   color: "#004d80",
//   marginBottom: "10px",
// },
// active: {
//   color: "green",
//   fontWeight: "bold",
// },
// inactive: {
//   color: "red",
//   fontWeight: "bold",
// },
// checkCard: {
//   marginTop: "15px",
//   padding: "15px",
//   borderRadius: "10px",
//   background: "rgba(240, 248, 255, 0.8)",
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   border: "1px solid rgba(240, 248, 255, 0.5)",
// },
// noChecks: {
//   fontStyle: "italic",
//   color: "#666",
//   textAlign: "center",
// },
// };

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
//           onMouseEnter={(e) => e.currentTarget.style.transform = styles.monitorCardHover.transform}
//           onMouseLeave={(e) => e.currentTarget.style.transform = ""}
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
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "20px",
//     padding: "20px",
//     background: "linear-gradient(145deg, #e0f7ff, #c2e7f5)",
//   },
//   monitorCard: {
//     flex: "1 1 calc(33% - 20px)",
//     borderRadius: "15px",
//     padding: "20px",
//     background: "rgba(255, 255, 255, 0.8)",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(255, 255, 255, 0.3)",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     cursor: "pointer",
//   },
//   monitorCardHover: {
//     transform: "scale(1.02)",
//   },
//   monitorName: {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     color: "#004d80",
//     marginBottom: "10px",
//   },
//   active: {
//     color: "green",
//     fontWeight: "bold",
//   },
//   inactive: {
//     color: "red",
//     fontWeight: "bold",
//   },
//   checkCard: {
//     marginTop: "15px",
//     padding: "15px",
//     borderRadius: "10px",
//     background: "rgba(240, 248, 255, 0.8)",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     border: "1px solid rgba(240, 248, 255, 0.5)",
//   },
//   noChecks: {
//     fontStyle: "italic",
//     color: "#666",
//     textAlign: "center",
//   },
//   loading: {
//     fontSize: "1.25rem",
//     fontStyle: "italic",
//     color: "#004d80",
//   },
//   error: {
//     color: "red",
//     fontWeight: "bold",
//     fontSize: "1.25rem",
//     textAlign: "center",
//   },
// };

// export default MonitorDetails;
import React, { useState, useEffect } from "react";

const MonitorDetails = ({ monitorGroupGuid }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitorData = async () => {
      try {
        const response = await fetch(`/api/uptrends/MonitorChecks?monitorGroupGuid=${monitorGroupGuid}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
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
      {data.map((monitor, index) => (
        <div
          key={index}
          style={styles.monitorCard}
          onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <h3 style={styles.monitorName}>{monitor.Name}</h3>
          <p>
            <strong>IsActive:</strong>{" "}
            <span style={monitor.IsActive ? styles.active : styles.inactive}>
              {monitor.IsActive ? "Yes" : "No"}
            </span>
          </p>
          <p>
            <strong>MonitorType:</strong> {monitor.MonitorType}
          </p>
          {monitor.MonitorChecks && monitor.MonitorChecks.length > 0 ? (
            monitor.MonitorChecks.map((check, checkIndex) => (
              <div key={checkIndex} style={styles.checkCard}>
                {Object.entries(check.Attributes).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p style={styles.noChecks}>No Monitor Checks available.</p>
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

export default MonitorDetails;

