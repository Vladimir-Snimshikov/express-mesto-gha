const ERROR_SERVER = 500;
const ERROR_NOT_FOUND = 404;
const ERROR_CODE = 400;
const SUCCESS = 200;

const defaultError = (res) => {
  res.status(ERROR_SERVER).send({
    message: 'Ошибка сервера',
  });
};

module.exports = {
  ERROR_CODE, ERROR_NOT_FOUND, ERROR_SERVER, SUCCESS, defaultError,
};
