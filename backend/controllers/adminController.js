import Admin from '../models/Admin.js';
import Team from '../models/Team.js';
import { generateToken } from '../middleware/auth.js';

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find admin
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          name: admin.name,
          email: admin.email,
          role: admin.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error during login'
    });
  }
};

// @desc    Get all teams (admin view)
// @route   GET /api/admin/teams
// @access  Private/Admin
export const getAllTeamsAdmin = async (req, res) => {
  try {
    const teams = await Team.find({})
      .sort({ totalScore: -1 })
      .select('-__v');

    const stats = {
      totalTeams: teams.length,
      round1Completed: teams.filter(t => t.round1.submitted).length,
      round2Completed: teams.filter(t => t.round2.submitted).length,
      round3Completed: teams.filter(t => t.round3.submitted).length,
      round3Verified: teams.filter(t => t.round3.adminVerified).length
    };

    res.status(200).json({
      success: true,
      stats,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    console.error('Get all teams admin error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching teams'
    });
  }
};

// @desc    Get leaderboard
// @route   GET /api/admin/leaderboard
// @access  Private/Admin
export const getLeaderboard = async (req, res) => {
  try {
    const teams = await Team.find({ 
      'round1.submitted': true 
    })
      .sort({ totalScore: -1 })
      .select('teamName sector totalScore round1.finalScore round2.finalScore round3.finalScore round3.adminVerified');

    const leaderboard = teams.map((team, index) => ({
      rank: index + 1,
      teamName: team.teamName,
      sector: team.sector,
      scores: {
        round1: team.round1.finalScore,
        round2: team.round2.finalScore,
        round3: team.round3.finalScore,
        total: team.totalScore
      },
      verified: team.round3.adminVerified
    }));

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching leaderboard'
    });
  }
};

// @desc    Update team's Round 3 time (manual entry)
// @route   PUT /api/admin/round3/time/:teamId
// @access  Private/Admin
export const updateRound3Time = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { timeTaken, testCasesPassed } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Update Round 3 data
    if (timeTaken !== undefined) {
      if (timeTaken < 0 || timeTaken > 25) {
        return res.status(400).json({
          success: false,
          message: 'Time taken must be between 0 and 25 minutes'
        });
      }
      team.round3.timeTaken = timeTaken;
    }

    if (testCasesPassed !== undefined) {
      if (testCasesPassed < 0 || testCasesPassed > 10) {
        return res.status(400).json({
          success: false,
          message: 'Test cases passed must be between 0 and 10'
        });
      }
      team.round3.testCasesPassed = testCasesPassed;
    }

    // Recalculate score
    const timeBonus = Math.max(0, 25 - team.round3.timeTaken);
    team.round3.finalScore = team.round3.testCasesPassed + timeBonus;
    team.round3.adminVerified = true;

    await team.save();

    res.status(200).json({
      success: true,
      message: 'Round 3 time updated successfully',
      data: {
        teamName: team.teamName,
        round3: team.round3,
        totalScore: team.totalScore
      }
    });
  } catch (error) {
    console.error('Update Round 3 time error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating Round 3 time'
    });
  }
};

// @desc    Get event statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getEventStats = async (req, res) => {
  try {
    const totalTeams = await Team.countDocuments();
    const round1Completed = await Team.countDocuments({ 'round1.submitted': true });
    const round2Completed = await Team.countDocuments({ 'round2.submitted': true });
    const round3Completed = await Team.countDocuments({ 'round3.submitted': true });
    const round3Verified = await Team.countDocuments({ 'round3.adminVerified': true });

    // Sector distribution
    const sectorStats = await Team.aggregate([
      {
        $group: {
          _id: '$sector',
          count: { $sum: 1 },
          avgScore: { $avg: '$totalScore' }
        }
      }
    ]);

    // Score distribution
    const scoreStats = await Team.aggregate([
      {
        $match: { 'round1.submitted': true }
      },
      {
        $group: {
          _id: null,
          avgRound1: { $avg: '$round1.finalScore' },
          avgRound2: { $avg: '$round2.finalScore' },
          avgRound3: { $avg: '$round3.finalScore' },
          avgTotal: { $avg: '$totalScore' },
          maxTotal: { $max: '$totalScore' },
          minTotal: { $min: '$totalScore' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        teams: {
          total: totalTeams,
          round1Completed,
          round2Completed,
          round3Completed,
          round3Verified
        },
        sectors: sectorStats,
        scores: scoreStats[0] || {}
      }
    });
  } catch (error) {
    console.error('Get event stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching event statistics'
    });
  }
};

// @desc    Delete team (admin only)
// @route   DELETE /api/admin/teams/:teamId
// @access  Private/SuperAdmin
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    await team.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Team deleted successfully'
    });
  } catch (error) {
    console.error('Delete team error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting team'
    });
  }
};
