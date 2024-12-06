const monitorChecks = [
  {
   "Type": "MonitorCheck",
   "Id": 168882982993,
   "Attributes": {
     "MonitorGuid": "b2a36070-b365-4076-8e78-e90f752fc148",
     "Timestamp": "2024-12-05T13:35:06",
     "ErrorCode": 0,
     "TotalTime": 1040,
     "ResolveTime": 1,
     "ConnectionTime": 5,
     "DownloadTime": 1034,
     "TotalBytes": 19478,
     "ResolvedIpAddress": "104.18.9.116",
     "ErrorLevel": "NoError",
     "ErrorDescription": "OK",
     "ErrorMessage": "",
     "StagingMode": false,
     "ServerId": 10862,
     "HttpStatusCode": 200,
     "IsPartialCheck": false,
     "IsConcurrentCheck": false
   },
   "Relationships": [
     {
       "Id": 10862,
       "Type": "CheckpointServer",
       "Links": {
         "Self": "/Checkpoint/Server/10862"
       }
     }
   ]
 },
 {
   "Type": "MonitorCheck",
   "Id": 168877001169,
   "Attributes": {
     "MonitorGuid": "28d7a7a8-3734-46dc-857d-12b6b2b17365",
     "Timestamp": "2024-12-05T11:52:22",
     "ErrorCode": 0,
     "TotalTime": 883,
     "ResolveTime": 12,
     "ConnectionTime": 7,
     "DownloadTime": 864,
     "TotalBytes": 19439,
     "ResolvedIpAddress": "104.18.8.116",
     "ErrorLevel": "NoError",
     "ErrorDescription": "OK",
     "ErrorMessage": "",
     "StagingMode": false,
     "ServerId": 1860,
     "HttpStatusCode": 200,
     "IsPartialCheck": false,
     "IsConcurrentCheck": false
   },
   "Relationships": [
     {
       "Id": 1860,
       "Type": "CheckpointServer",
       "Links": {
         "Self": "/Checkpoint/Server/1860"
       }
     }
   ]
 },
 {
   "Type": "MonitorCheck",
   "Id": 168876952381,
   "Attributes": {
     "MonitorGuid": "47b476aa-8006-4453-8fb2-690aec9b2a86",
     "Timestamp": "2024-12-05T11:51:33",
     "ErrorCode": 0,
     "TotalTime": 1,
     "ResolveTime": 1,
     "ConnectionTime": 0,
     "DownloadTime": 0,
     "ResolvedIpAddress": "162.106.2.9",
     "ErrorLevel": "NoError",
     "ErrorDescription": "OK",
     "ErrorMessage": "",
     "StagingMode": false,
     "ServerId": 10863,
     "HttpStatusCode": 0,
     "IsPartialCheck": false,
     "IsConcurrentCheck": false
   },
   "Relationships": [
     {
       "Id": 10863,
       "Type": "CheckpointServer",
       "Links": {
         "Self": "/Checkpoint/Server/10863"
       }
     }
   ]
 },
 {
   "Type": "MonitorCheck",
   "Id": 168876834417,
   "Attributes": {
     "MonitorGuid": "b2a36070-b365-4076-8e78-e90f752fc148",
     "Timestamp": "2024-12-05T11:49:30",
     "ErrorCode": 0,
     "TotalTime": 1351,
     "ResolveTime": 12,
     "ConnectionTime": 8,
     "DownloadTime": 1331,
     "TotalBytes": 18706,
     "ResolvedIpAddress": "104.18.8.116",
     "ErrorLevel": "NoError",
     "ErrorDescription": "OK",
     "ErrorMessage": "",
     "StagingMode": false,
     "ServerId": 1860,
     "HttpStatusCode": 200,
     "IsPartialCheck": false,
     "IsConcurrentCheck": false
   },
   "Relationships": [
     {
       "Id": 1860,
       "Type": "CheckpointServer",
       "Links": {
         "Self": "/Checkpoint/Server/1860"
       }
     }
   ]
 },
 {
   "Type": "MonitorCheck",
   "Id": 168875657742,
   "Attributes": {
     "MonitorGuid": "b2a36070-b365-4076-8e78-e90f752fc148",
     "Timestamp": "2024-12-05T11:29:21",
     "ErrorCode": 0,
     "TotalTime": 1197,
     "ResolveTime": 8,
     "ConnectionTime": 5,
     "DownloadTime": 1184,
     "TotalBytes": 20314,
     "ResolvedIpAddress": "104.18.8.116",
     "ErrorLevel": "NoError",
     "ErrorDescription": "OK",
     "ErrorMessage": "",
     "StagingMode": false,
     "ServerId": 10862,
     "HttpStatusCode": 200,
     "IsPartialCheck": false,
     "IsConcurrentCheck": false
   },
   "Relationships": [
     {
       "Id": 10862,
       "Type": "CheckpointServer",
       "Links": {
         "Self": "/Checkpoint/Server/10862"
       }
     }
   ]
 },
 {
   "Type": "MonitorCheck",
   "Id": 168875538547,
   "Attributes": {
     "MonitorGuid": "28d7a7a8-3734-46dc-857d-12b6b2b17365",
     "Timestamp": "2024-12-05T11:27:19",
     "ErrorCode": 0,
     "TotalTime": 836,
     "ResolveTime": 42,
     "ConnectionTime": 10,
     "DownloadTime": 784,
     "TotalBytes": 19433,
     "ResolvedIpAddress": "104.18.8.116",
     "ErrorLevel": "NoError",
     "ErrorDescription": "OK",
     "ErrorMessage": "",
     "StagingMode": false,
     "ServerId": 151,
     "HttpStatusCode": 200,
     "IsPartialCheck": false,
     "IsConcurrentCheck": false
   },
   "Relationships": [
     {
       "Id": 151,
       "Type": "CheckpointServer",
       "Links": {
         "Self": "/Checkpoint/Server/151"
       }
     }
   ]
 }
];

const monitorDetails = [
{
 "MonitorGuid": "b2a36070-b365-4076-8e78-e90f752fc148",
 "Hash": "0H5mRtdBvzFG0EXftJs2ZA==",
 "Name": "311 - 311.edmonton.ca",
 "IsActive": true,
 "GenerateAlert": true,
 "IsLocked": false,
 "CheckInterval": 5,
 "MonitorMode": "Production",
 "CustomFields": [],
 "SelectedCheckpoints": {
   "Regions": [36, 1243]
 },
 "UsePrimaryCheckpointsOnly": true,
 "MonitorType": "Https",
 "Notes": "",
 "AlertOnLoadTimeLimit1": false,
 "LoadTimeLimit1": 2500,
 "AlertOnLoadTimeLimit2": false,
 "LoadTimeLimit2": 5000,
 "RequestHeaders": [],
 "UserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
 "Username": "",
 "AuthenticationType": "None",
 "CheckCertificateErrors": true,
 "IpVersion": "IpV4",
 "AlertOnMinimumBytes": false,
 "MinimumBytes": 0,
 "HttpMethod": "Get",
 "ExpectedHttpStatusCodeSpecified": true,
 "TlsVersion": "Tls12_Tls11_Tls10",
 "RequestBody": "",
 "Url": "https://311.edmonton.ca/",
 "ErrorConditions": [
   {
     "ErrorConditionType": "LoadTimeLimit1",
     "Value": "2500",
     "Effect": "Indicate"
   },
   {
     "ErrorConditionType": "LoadTimeLimit2",
     "Value": "5000",
     "Effect": "Indicate"
   }
 ],
 "CreatedDate": "2024-07-25T08:19:23"
},
{
 "MonitorGuid": "28d7a7a8-3734-46dc-857d-12b6b2b17365",
 "Hash": "nYesEQ0T8U61XStn4BExWQ==",
 "Name": "cityposse.edmonton.ca",
 "IsActive": true,
 "GenerateAlert": false,
 "IsLocked": false,
 "CheckInterval": 5,
 "MonitorMode": "Production",
 "CustomFields": [],
 "SelectedCheckpoints": {
   "Regions": [36]
 },
 "UsePrimaryCheckpointsOnly": true,
 "MonitorType": "Https",
 "Notes": "",
 "AlertOnLoadTimeLimit1": false,
 "LoadTimeLimit1": 2500,
 "AlertOnLoadTimeLimit2": false,
 "LoadTimeLimit2": 5000,
 "RequestHeaders": [],
 "UserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
 "Username": "",
 "AuthenticationType": "None",
 "CheckCertificateErrors": true,
 "IpVersion": "IpV4",
 "AlertOnMinimumBytes": false,
 "MinimumBytes": 0,
 "HttpMethod": "Get",
 "ExpectedHttpStatusCodeSpecified": true,
 "TlsVersion": "Tls12_Tls11_Tls10",
 "RequestBody": "",
 "Url": "https://cityposse.edmonton.ca",
 "ErrorConditions": [
   {
     "ErrorConditionType": "LoadTimeLimit1",
     "Value": "2500",
     "Effect": "Indicate"
   },
   {
     "ErrorConditionType": "LoadTimeLimit2",
     "Value": "5000",
     "Effect": "Indicate"
   }
 ],
 "CreatedDate": "2024-09-11T09:54:59"
},
{
 "MonitorGuid": "47b476aa-8006-4453-8fb2-690aec9b2a86",
 "Hash": "X0TVqyMukBLJTIRIQ9hFng==",
 "Name": "Remedy - remedydwp.edmonton.ca",
 "IsActive": true,
 "GenerateAlert": true,
 "IsLocked": false,
 "CheckInterval": 5,
 "MonitorMode": "Production",
 "CustomFields": [],
 "SelectedCheckpoints": {
   "Regions": [1243]
 },
 "UsePrimaryCheckpointsOnly": true,
 "MonitorType": "Connect",
 "Notes": "Feng Luo ",
 "AlertOnLoadTimeLimit1": false,
 "LoadTimeLimit1": 2500,
 "AlertOnLoadTimeLimit2": false,
 "LoadTimeLimit2": 5000,
 "Port": 443,
 "IpVersion": "IpV4",
 "NetworkAddress": "remedydwp.edmonton.ca",
 "ErrorConditions": [
   {
     "ErrorConditionType": "LoadTimeLimit1",
     "Value": "2500",
     "Effect": "Indicate"
   },
   {
     "ErrorConditionType": "LoadTimeLimit2",
     "Value": "5000",
     "Effect": "Indicate"
   }
 ],
 "CreatedDate": "2024-11-07T11:11:00"
}
];

// const linkDataByMonitorGuid = (details, checks) => {
//   return details.map(detail => {
//     const relatedChecks = checks.filter(check => check.Attributes.MonitorGuid === detail.MonitorGuid);
//     return {
//       ...detail,
//       MonitorChecks: relatedChecks
//     };
//   });
// };

// const linkedData = linkDataByMonitorGuid(monitorDetails, monitorChecks);
// console.log(linkedData);

// export default async function handler(req, res) {
//   // Example data sets (replace with actual data fetching logic)
//   const monitorChecks = [
//     // Your first data set here (MonitorCheck data)
//   ];

//   const monitorDetails = [
//     // Your second data set here (Monitor details)
//   ];

//   // Function to link data by MonitorGuid
//   const linkDataByMonitorGuid = (details, checks) => {
//     return details.map(detail => {
//       const relatedChecks = checks.filter(check => check.Attributes.MonitorGuid === detail.MonitorGuid);
//       return {
//         ...detail,
//         MonitorChecks: relatedChecks
//       };
//     });
//   };

//   // Combine the data
//   const linkedData = linkDataByMonitorGuid(monitorDetails, monitorChecks);

//   // Send the combined data as the response
//   res.status(200).json(linkedData);
// }

// import { fetchAndLinkMonitorData } from '../../services/uptrendsService';

// export default async function handler(req, res) {
//   const { monitorGroupGuid } = req.query;

//   if (!monitorGroupGuid) {
//     return res.status(400).json({ error: 'Monitor Group GUID is required' });
//   }

//   try {
//     const linkedData = await fetchAndLinkMonitorData(monitorGroupGuid);
//     res.status(200).json(linkedData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// app/api/monitor-checks/route.js

import { NextResponse } from 'next/server';
import { fetchAndLinkMonitorData } from '../../../../services/uptrendsService';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const monitorGroupGuid = searchParams.get('monitorGroupGuid');

  if (!monitorGroupGuid) {
    return NextResponse.json({ error: 'Monitor Group GUID is required' }, { status: 400 });
  }

  try {
    const linkedData = await fetchAndLinkMonitorData(monitorGroupGuid);
    return NextResponse.json(linkedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}