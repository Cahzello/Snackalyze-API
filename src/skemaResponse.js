const response = (res, statusData, data) => {
    console.log(statusData)
    return res.status(statusData.status).json({
        status: statusData.status,
        message: statusData.message,
        response: {
            data: data
        }
    });
}

module.exports = response;
