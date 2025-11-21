const express = require('express');
const router = express.Router();
const {
  trackVisitor,
  getVisitors,
  getVisitorStats,
} = require('../controllers/visitorController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/track', trackVisitor);
router.get('/visitors', protect, adminOnly, getVisitors);
router.get('/visitors/stats', protect, adminOnly, getVisitorStats);

module.exports = router;
