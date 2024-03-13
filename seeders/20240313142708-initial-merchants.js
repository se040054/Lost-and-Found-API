'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("ALTER TABLE MERCHANTS AUTO_INCREMENT = 1;");
    let merchantData = []
    for (let i = 1; i <= 150; i++) {
      merchantData.push({
        id: i,
        name: faker.company.name(),
        logo: 'https://loremflickr.com/200/200/avatar',
        address: faker.location.streetAddress(),
        phone: faker.string.numeric(9),
        user_id: Math.ceil(i / 5),
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    await queryInterface.bulkInsert('Merchants', merchantData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Merchants', null,{})
  }
};
