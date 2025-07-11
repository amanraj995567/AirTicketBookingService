const { BookingService } = require('../services/index');
const bookingService = new BookingService();

const { StatusCodes } = require('http-status-codes');

const create = async (req, res) => {
  try {
     const response = await bookingService.createBooking(req.body);  
     return res.status(StatusCodes.OK).json({
      message: 'Successfully completed booking',
      success: true,
      error: {},
      data: response
    });
  } catch (error) {
     console.log("FROM BOOKING CONTROLLER:", error);
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Something went wrong',
      success: false,
      err: error.explanation || 'Internal server error',
      data: {}
    });
  }
};

module.exports = {
  create
};
