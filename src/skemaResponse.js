const response = (res, status, data) => {
    return res.status(status).json({
        status: status,
        message: (status >= 400) ? "Error" : "Success",
        response: {
            data: data
        }
    });
}

module.exports = response;
