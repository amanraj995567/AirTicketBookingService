const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const {createChannel , publishMessage} = require('../utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('../config/serverConfig');



const bookingService = new BookingService();


class BookingController {
     constructor(){
        
     }

     async sendMessageToQueue(req,res){
        const channel = new createChannel();
        const data = {message:'Success'};
        publishMessage(channel , REMINDER_BINDING_KEY , JSON.stringify(data));
        return res.status(200).json({
           message:'Successfully published the event',
        });
     }


      
     async create (req,res) {
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
      }
     
}


module.exports = BookingController;
