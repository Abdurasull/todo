class responseObject {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

class ClientError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status
    }
};

/**@param {responseObject} responseObject */
const responseHandler = (responseObject, res) => {
    res.status(responseObject.status).json(responseObject);
}

const errorHandler = (err, res) => {
    const error = {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
        data: null
    };
    responseHandler(error, res);
};

export { ClientError, errorHandler, responseObject, responseHandler };