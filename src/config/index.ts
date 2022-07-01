export default () => ({
  port: parseInt(process.env.PORT, 10) || 4860,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
  },
});
