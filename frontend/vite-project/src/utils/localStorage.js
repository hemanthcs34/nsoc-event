// Utility functions for managing localStorage

// Clear all round data (useful when starting fresh or logging out)
export const clearAllRoundData = () => {
  // Round 1 data
  localStorage.removeItem('round1Phase');
  localStorage.removeItem('round1QuizResults');
  localStorage.removeItem('round1PurchaseResults');
  localStorage.removeItem('round1Bonus');
  
  // Round 2 data
  localStorage.removeItem('round2PurchasedComponents');
  localStorage.removeItem('round2SchematicSlots');
  localStorage.removeItem('round2TimeRemaining');
  localStorage.removeItem('round2IsSubmitted');
  localStorage.removeItem('round2Score');
  localStorage.removeItem('round2ShowHint');
  
  // Round 3 data
  localStorage.removeItem('round3TimeRemaining');
  localStorage.removeItem('round3HasStarted');
  localStorage.removeItem('round3IsSubmitted');
  localStorage.removeItem('round3TestCasesPassed');
  localStorage.removeItem('round3ManualTime');
  localStorage.removeItem('round3UnstopLink');
};

// Clear only team/registration data
export const clearTeamData = () => {
  localStorage.removeItem('teamId');
  localStorage.removeItem('teamName');
  localStorage.removeItem('sector');
};

// Clear everything (team + all rounds)
export const clearAllData = () => {
  clearTeamData();
  clearAllRoundData();
};

// Clear specific round data
export const clearRound1Data = () => {
  localStorage.removeItem('round1Phase');
  localStorage.removeItem('round1QuizResults');
  localStorage.removeItem('round1PurchaseResults');
  localStorage.removeItem('round1Bonus');
};

export const clearRound2Data = () => {
  localStorage.removeItem('round2PurchasedComponents');
  localStorage.removeItem('round2SchematicSlots');
  localStorage.removeItem('round2TimeRemaining');
  localStorage.removeItem('round2IsSubmitted');
  localStorage.removeItem('round2Score');
  localStorage.removeItem('round2ShowHint');
};

export const clearRound3Data = () => {
  localStorage.removeItem('round3TimeRemaining');
  localStorage.removeItem('round3HasStarted');
  localStorage.removeItem('round3IsSubmitted');
  localStorage.removeItem('round3TestCasesPassed');
  localStorage.removeItem('round3ManualTime');
  localStorage.removeItem('round3UnstopLink');
};

// Get team info
export const getTeamInfo = () => {
  return {
    teamId: localStorage.getItem('teamId'),
    teamName: localStorage.getItem('teamName'),
    sector: localStorage.getItem('sector')
  };
};

// Check if team is registered
export const isTeamRegistered = () => {
  return !!localStorage.getItem('teamId');
};

// Save team info
export const saveTeamInfo = (teamId, teamName, sector) => {
  if (teamId) localStorage.setItem('teamId', teamId);
  if (teamName) localStorage.setItem('teamName', teamName);
  if (sector) localStorage.setItem('sector', sector);
};
