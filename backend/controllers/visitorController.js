const Visitor = require('../models/Visitor');

// @desc    Track visitor
// @route   POST /api/track
// @access  Public
const trackVisitor = async (req, res) => {
  try {
    const { page, referrer } = req.body;
    
    // Get IP address
    const ip = req.headers['x-forwarded-for'] || 
               req.connection.remoteAddress || 
               req.socket.remoteAddress ||
               req.ip;

    // Get user agent
    const userAgent = req.headers['user-agent'];

    const visitor = await Visitor.create({
      ip: ip.replace('::ffff:', ''), // Clean IPv6 prefix
      page: page || '/',
      userAgent,
      referrer,
    });

    res.status(201).json({ message: 'Visitor tracked successfully', visitor });
  } catch (error) {
    console.error('Track visitor error:', error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all visitors
// @route   GET /api/visitors
// @access  Private (Admin)
const getVisitors = async (req, res) => {
  try {
    const { limit = 100, page = 1 } = req.query;
    
    const visitors = await Visitor.find()
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Visitor.countDocuments();

    res.json({
      visitors,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error('Get visitors error:', error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get visitor statistics
// @route   GET /api/visitors/stats
// @access  Private (Admin)
const getVisitorStats = async (req, res) => {
  try {
    const total = await Visitor.countDocuments();
    
    // Get today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Visitor.countDocuments({ timestamp: { $gte: today } });

    // Get unique visitors (by IP)
    const uniqueVisitors = await Visitor.distinct('ip');

    // Get top pages
    const topPages = await Visitor.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({
      total,
      today: todayCount,
      unique: uniqueVisitors.length,
      topPages,
    });
  } catch (error) {
    console.error('Get visitor stats error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  trackVisitor,
  getVisitors,
  getVisitorStats,
};
