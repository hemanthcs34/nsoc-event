# LocalStorage Implementation Guide

## Overview
All important data is now persisted in localStorage to prevent data loss on page refresh. This ensures a seamless user experience across all rounds.

---

## Storage Keys

### **Team/Registration Data**
| Key | Type | Description | Set By |
|-----|------|-------------|--------|
| `teamId` | String | MongoDB ObjectId of the team | TeamRegistration |
| `teamName` | String | Name of the team | TeamRegistration |
| `sector` | String | Assigned sector (Lumina District, HydroCore, AeroHab) | TeamRegistration |

---

### **Round 1 Data**
| Key | Type | Description | Set By |
|-----|------|-------------|--------|
| `round1Phase` | String | Current phase ('intro', 'quiz', 'store', 'complete') | Round1 |
| `round1QuizResults` | JSON | Quiz results (correctCount, totalQuestions, earnedAmount, etc.) | Round1 |
| `round1PurchaseResults` | JSON | Purchase results (components, totalSpent, remainingBalance) | Round1 |
| `round1Bonus` | Number | Bonus amount given at start (default: 1200) | Round1 |

**Example `round1QuizResults`:**
```json
{
  "correctCount": 10,
  "totalQuestions": 12,
  "earnedAmount": 1000,
  "bonusAmount": 1200,
  "totalBalance": 2200
}
```

**Example `round1PurchaseResults`:**
```json
{
  "components": [...], // Array of purchased components
  "totalSpent": 1500,
  "remainingBalance": 700
}
```

---

### **Round 2 Data**
| Key | Type | Description | Set By |
|-----|------|-------------|--------|
| `round2PurchasedComponents` | JSON | Components purchased in Round 1 | Round2 |
| `round2SchematicSlots` | JSON | Current state of schematic slots (6 slots) | Round2 |
| `round2TimeRemaining` | Number | Time remaining in seconds (max: 1200 = 20 min) | Round2 |
| `round2IsSubmitted` | Boolean | Whether schematic has been submitted | Round2 |
| `round2Score` | Number | Final score for Round 2 | Round2 |
| `round2ShowHint` | Boolean | Whether hint is visible (after 10 min) | Round2 |

**Example `round2SchematicSlots`:**
```json
[
  {
    "id": 1,
    "label": "Input Layer",
    "component": { "name": "DHT22 Sensor", "type": "sensor", ... },
    "correctType": "sensor"
  },
  ...
]
```

---

### **Round 3 Data**
| Key | Type | Description | Set By |
|-----|------|-------------|--------|
| `round3TimeRemaining` | Number | Time remaining in seconds (max: 1500 = 25 min) | Round3 |
| `round3HasStarted` | Boolean | Whether challenge has started | Round3 |
| `round3IsSubmitted` | Boolean | Whether submission has been made | Round3 |
| `round3TestCasesPassed` | Number | Number of test cases passed (0-10) | Round3 |
| `round3ManualTime` | String | Manually entered time taken | Round3 |
| `round3UnstopLink` | String | Unstop challenge link for the sector | Round3 |

---

## Utility Functions

Located in `src/utils/localStorage.js`:

### Clear Functions
```javascript
import { clearAllData, clearRound1Data, clearRound2Data, clearRound3Data } from '../utils/localStorage';

// Clear all data (team + rounds)
clearAllData();

// Clear only Round 1 data
clearRound1Data();

// Clear only Round 2 data
clearRound2Data();

// Clear only Round 3 data
clearRound3Data();
```

### Get Team Info
```javascript
import { getTeamInfo, isTeamRegistered } from '../utils/localStorage';

const teamInfo = getTeamInfo();
// Returns: { teamId, teamName, sector }

if (isTeamRegistered()) {
  // Team is registered
}
```

---

## Implementation Pattern

### Reading from localStorage (on component mount)
```javascript
const [state, setState] = useState(() => {
  const saved = localStorage.getItem('key');
  return saved ? JSON.parse(saved) : defaultValue;
});
```

### Writing to localStorage (when state changes)
```javascript
useEffect(() => {
  if (state) {
    localStorage.setItem('key', JSON.stringify(state));
  }
}, [state]);
```

---

## Data Flow

1. **Registration** → Save `teamId`, `teamName`, `sector`
2. **Round 1 Quiz** → Save `round1QuizResults`
3. **Round 1 Purchase** → Save `round1PurchaseResults` → Auto-redirect to Round 2
4. **Round 2** → Load purchased components → Save schematic progress
5. **Round 2 Complete** → Navigate to Round 3
6. **Round 3** → Load challenge → Save submission

---

## Benefits

✅ **No data loss on refresh** - Users can refresh any page without losing progress
✅ **Seamless navigation** - Users can navigate between rounds freely
✅ **Session persistence** - Data persists across browser sessions
✅ **Better UX** - "Welcome back" messages for returning users
✅ **Easy debugging** - All data visible in browser DevTools → Application → Local Storage

---

## Testing

Open browser DevTools → Application tab → Local Storage → `http://localhost:5173`

You should see all keys listed above with their current values.

---

## Notes

- All data is **client-side only** in localStorage
- Backend still maintains the source of truth
- localStorage is cleared only when user explicitly logs out or clears browser data
- Maximum localStorage size: ~5-10MB (plenty for our use case)
