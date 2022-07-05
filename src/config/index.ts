export default () => ({
  server: {
    env: process.env.NODE_ENV || '',
    port: parseInt(process.env.PORT, 10) || 4860,
    saltRound: parseInt(process.env.SALT_ROUND, 10) || 10,
    tokenSecret: process.env.TOKEN_SECRET || '',
    tokenExpire: process.env.TOKEN_EXPIRE || '',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
    refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE || '',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    dbname: process.env.DB_NAME || 'nest_expess',
  },
});
