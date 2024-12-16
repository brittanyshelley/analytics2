// File: utils/checkGroupStatuses.js

export function evaluateGroupStatuses(groupStatuses) {
  // Result object to store the status for each group
  const groupResults = {};

  // Loop through each group
  Object.keys(groupStatuses).forEach(groupId => {
    const groupData = groupStatuses[groupId].Data;

    // Check if all monitors in the group have ErrorLevel: 'NoError'
    const allNoError = groupData.every(
      monitor => monitor.Attributes.ErrorLevel === 'NoError'
    );

    // Assign a green checkmark or red X based on the result
    groupResults[groupId] = allNoError ? '✅' : '❌';
  });

  return groupResults;
}
