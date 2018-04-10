require('dotenv').config();

export const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 8000,
    bodyLimit: '100kb',

    db_dialect: process.env.DB_DIALECT || 'sqlite',
    db_host: process.env.DB_HOST || '',
    db_port: process.env.DB_PORT || '',
    db_name: process.env.DB_NAME || 'chat.sqlite',
    db_user: process.env.DB_USER || '',
    db_password: process.env.DB_PASSWORD || '',
    db_storage: process.env.DB_STORAGE || 'chat.sqlite',
  },
  production: {
    port: process.env.PORT || 8000,
    bodyLimit: '100kb',

    db_dialect: process.env.DB_DIALECT || 'sqlite',
    db_host: process.env.DB_HOST || '',
    db_port: process.env.DB_PORT || '',
    db_name: process.env.DB_NAME || 'chat.sqlite.prod',
    db_user: process.env.DB_USER || '',
    db_password: process.env.DB_PASSWORD || '',
    db_storage: process.env.DB_STORAGE || '',
  },
  test: {
    port: process.env.PORT || 8000,
    bodyLimit: '100kb',

    db_dialect: process.env.DB_DIALECT || 'sqlite',
    db_host: process.env.DB_HOST || '',
    db_port: process.env.DB_PORT || '',
    db_name: process.env.DB_NAME || 'chat.sqlite.test',
    db_user: process.env.DB_USER || '',
    db_password: process.env.DB_PASSWORD || '',
    db_storage: process.env.DB_STORAGE || '',
  },
};

export default config[env];
