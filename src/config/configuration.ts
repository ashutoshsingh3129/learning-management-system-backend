export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri:
      process.env.DB_URI ||
        'mongodb://127.0.0.1:27017/lms'
    },
  auth: {
    tokenExpiry: process.env.TOKEN_EXPIRY || '18h',
  },

});
