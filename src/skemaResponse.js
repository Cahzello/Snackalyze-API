const response = (res, statusData, data) => {
  return res.status(statusData.status).json({
    status: statusData.status,
    message: statusData.message,
    response: {
      data: data,
    },
  });
};

module.exports = response;
