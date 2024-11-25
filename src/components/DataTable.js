// const DataTable = ({ data }) => {
//   if (!data.length) {
//     return <p>No data available.</p>;
//   }

//   const headers = Object.keys(data[0]);

//   return (
//     <table>
//       <thead>
//         <tr>
//           {headers.map((header) => (
//             <th key={header}>{header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {headers.map((header) => (
//               <td key={header}>{row[header]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default DataTable;
const DataTable = ({ data }) => {
  if (!data || !data.length) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>
                {/* Handle nested objects */}
                {typeof row[header] === 'object' ? JSON.stringify(row[header]) : row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
