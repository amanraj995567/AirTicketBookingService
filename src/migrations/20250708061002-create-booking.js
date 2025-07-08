'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM,
        allowNull:false,
        defaultValue:"inProcess",
        values: ['inProcess','Booked' , 'Cancelled']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
       noOfSeats:{
           type:Sequelize.INTEGER,
           allowNull:false,
           defaultValue:1
    },
    totalCosts:{
           type:Sequelize.INTEGER,
           allowNull:false,
           defaultValue:0
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};