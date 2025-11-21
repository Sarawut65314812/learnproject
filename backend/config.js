module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpire: '7d',
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/projectonline',
  port: process.env.PORT || 5000,
};
