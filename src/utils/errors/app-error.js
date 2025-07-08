class AppError extends Error {
    constructor(message, 
        statusCode, 
        explanation) {
        super();
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.explanation = explanation;
    }
}

module.exports = AppError;