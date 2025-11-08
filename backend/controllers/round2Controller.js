import Team from '../models/Team.js';

// Correct schematic flow
const CORRECT_FLOW = ['sensor', 'signal', 'controller', 'communication', 'cloud', 'actuator'];

// @desc    Submit Round 2 schematic
// @route   POST /api/round2/submit
// @access  Public
export const submitSchematic = async (req, res) => {
  try {
    const { teamId, schematic, timeTaken } = req.body;

    if (!teamId || !schematic || timeTaken === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Team ID, schematic, and time taken are required'
      });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Check if team completed Round 1
    if (!team.round1.submitted) {
      return res.status(400).json({
        success: false,
        message: 'Team must complete Round 1 first'
      });
    }

    // Validate schematic has 6 components
    if (schematic.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Schematic must have exactly 6 components'
      });
    }

    // Calculate correct placements
    let correctPlacements = 0;
    let filledSlots = 0;
    
    schematic.forEach((slot, index) => {
      // Count filled slots (non-null components)
      if (slot && slot.componentType) {
        filledSlots++;
        // Check if component is in correct position
        if (slot.componentType === CORRECT_FLOW[index]) {
          correctPlacements++;
        }
      }
    });

    // Calculate score based on placements and time
    // Award points for each correct placement (even if not all slots filled)
    const pointsPerCorrectPlacement = 15; // 15 points per correct component
    const placementScore = correctPlacements * pointsPerCorrectPlacement; // Max 90 points (6 * 15)
    
    // Time bonus: Max 10 points (faster = more points)
    // ONLY awarded if at least one component is correctly placed
    let timeBonus = 0;
    if (correctPlacements > 0) {
      if (timeTaken < 5) {
        timeBonus = 10;
      } else if (timeTaken < 10) {
        timeBonus = 8;
      } else if (timeTaken < 15) {
        timeBonus = 5;
      } else if (timeTaken < 20) {
        timeBonus = 3;
      }
    }

    // Final score calculation
    const finalScore = placementScore + timeBonus; // Max 100 points (90 + 10)
    const isAllCorrect = correctPlacements === 6;

    // Update team Round 2 data
    team.round2.schematic = schematic;
    team.round2.correctPlacements = correctPlacements;
    team.round2.timeTaken = timeTaken;
    team.round2.finalScore = finalScore;
    team.round2.submitted = true;
    team.round2.submittedAt = new Date();

    await team.save();

    res.status(200).json({
      success: true,
      message: isAllCorrect 
        ? 'Perfect! All components are correctly placed!' 
        : `Schematic submitted! ${correctPlacements} out of ${filledSlots} placed components are correct.`,
      data: {
        correctPlacements,
        filledSlots,
        totalSlots: 6,
        timeTaken,
        timeBonus,
        placementScore,
        finalScore,
        isAllCorrect,
        canProceed: true // Always allow proceeding to Round 3
      }
    });
  } catch (error) {
    console.error('Submit schematic error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting schematic'
    });
  }
};

// @desc    Get team's Round 2 data
// @route   GET /api/round2/team/:teamId
// @access  Public
export const getRound2Data = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    res.status(200).json({
      success: true,
      data: team.round2
    });
  } catch (error) {
    console.error('Get Round 2 data error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching Round 2 data'
    });
  }
};

// @desc    Get correct schematic flow (for admin/verification)
// @route   GET /api/round2/correct-flow
// @access  Public
export const getCorrectFlow = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: CORRECT_FLOW
    });
  } catch (error) {
    console.error('Get correct flow error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching correct flow'
    });
  }
};
