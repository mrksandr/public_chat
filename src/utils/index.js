import { env } from '../config';

export const resSuccess = (res, data, code) => {
  let resData = { success: true };

  if (typeof data == 'object') resData = Object.assign(data, resData);
  res.statusCode = code || 200;

  return res.json(resData);
};

export const resError = (res, err, code) => {
  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({
    success: false,
    message: formatMessage(err),
    error: env === 'development' ? err : {},
  });
};

const formatMessage = err => {
  if (err.name === 'SequelizeValidationError') {
    const validationErrors = err.errors.reduce((constructing, error) => {
      if (error.path) constructing[error.path] = error.message;

      return constructing;
    }, {});
    return validationErrors;
  }

  if (err.name === 'SequelizeDatabaseError') {
    return err.message;
  }

  if (typeof err == 'object' && typeof err.message != 'undefined')
    return err.message;

  if (typeof err === 'string') {
    return err;
  }
};
