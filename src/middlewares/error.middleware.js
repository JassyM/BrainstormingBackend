module.exports = (err, req, res, next) => {
  const httpStatus = err.status || 500; // Si el error tiene un status lo poner, si no entonces asigna error 500

  return res.status(httpStatus).send({
    status: httpStatus,
    message: err.message || 'Internal server error'
  });
}