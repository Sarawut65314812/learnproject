const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  referrer: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

// Index for faster queries
visitorSchema.index({ timestamp: -1 });
visitorSchema.index({ ip: 1 });

module.exports = mongoose.model('Visitor', visitorSchema);
