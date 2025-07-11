const axios = require('axios');
const {BookingRepository} = require('../repository/index');
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');

class BookingService {
    
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
       try {
        const flightId = data.flightId;
        // call the FlightAndSearch Sevive to fetch details of flightId 
        const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
        const response = await axios.get(getFlightRequestURL);
        const flightData = response.data.data;
        const priceOfFlight = flightData.price;

        if(data.noOfSeats > flightData.totalSeats){
            throw new ServiceError('Something went wrong in the booking process'
                , 'Insufficient seats')
             
        }

        const totalCosts = priceOfFlight * data.noOfSeats;
        const bookingPayLoad = {...data , totalCosts};
        const booking = await this.bookingRepository.create(bookingPayLoad);

        const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
        await axios.patch(updateFlightRequestURL , {totalSeats: flightData.totalSeats - booking.noOfSeats});
        const finalBooking =  await this.bookingRepository.update(booking.id , {status:"Booked"});
        return finalBooking;

       } catch (error) {
           throw new ServiceError();
        
       }
    }
}

module.exports = BookingService;
