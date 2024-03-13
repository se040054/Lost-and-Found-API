'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("ALTER TABLE ITEMS AUTO_INCREMENT = 1;");
    let itemData = []
    for (let i = 1; i <= 300; i++) {
      itemData.push({
        id: i,
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        place: faker.location.street(),
        find_date: faker.date.past({ years: 1 }),
        photo: 'https://loremflickr.com/800/600/belongings',
        is_claimed: false,
        category_id: Math.ceil(Math.random() * 7),
        user_id: Math.ceil(i / 10),
        merchant_id: Math.ceil(i / 2),
        created_at: faker.date.past({ years: 1 }),
        updated_at: faker.date.past({ years: 1 })
      })
    }
    await queryInterface.bulkInsert('Items', itemData,{})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
