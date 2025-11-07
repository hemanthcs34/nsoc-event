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
    schematic.forEach((slot, index) => {
      if (slot && slot.componentType === CORRECT_FLOW[index]) {
        correctPlacements++;
      }
    });

    // Calculate score based on time and correctness
    // Formula: Base score (if all correct) + Time bonus - penalties
    const isAllCorrect = correctPlacements === 6;
    const baseScore = isAllCorrect ? 100 : 0; // Only get base score if all correct
    
    // Time bonus: Max 20 points (faster = more points)
    // If completed in < 5 min: +20 points
    // If completed in < 10 min: +15 points
    // If completed in < 15 min: +10 points
    // If completed in < 20 min: +5 points
    let timeBonus = 0;
    if (timeTaken < 5) {
      timeBonus = 20;
    } else if (timeTaken < 10) {
      timeBonus = 15;
    } else if (timeTaken < 15) {
      timeBonus = 10;
    } else if (timeTaken < 20) {
      timeBonus = 5;
    }

    // Only award time bonus if schematic is correct
    const finalScore = isAllCorrect ? baseScore + timeBonus : 0;

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
        ? 'Perfect! Schematic is correct. Proceed to Round 3!'
        : 'Schematic submitted but not all components are in correct order. Please try again!',
      data: {
        correctPlacements,
        totalComponents: 6,
        timeTaken,
        timeBonus,
        finalScore,
        isAllCorrect,
        canProceed: isAllCorrect
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
