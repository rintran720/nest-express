export default () => ({
  server: {
    env: process.env.NODE_ENV || '',
    port: parseInt(process.env.PORT, 10) || 4860,
    docUrl: process.env.DOC_URL || '',
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
    dbname: process.env.DB_NAME || 'nest_express',
  },
  mysql_database: {
    host: process.env.MYSQL_DB_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_DB_PORT, 10) || 3306,
    username: process.env.MYSQL_DB_USERNAME || '',
    password: process.env.MYSQL_DB_PASSWORD || '',
    dbname: process.env.MYSQL_DB_NAME || 'nest_express',
  },
  facebook: {
    id: process.env.FB_ID,
    secret: process.env.FB_SECRET,
    callback: process.env.FB_CALLBACK,
  },
  google: {
    id: process.env.GG_ID,
    secret: process.env.GG_SECRET,
    callback: process.env.GG_CALLBACK,
  },
});
