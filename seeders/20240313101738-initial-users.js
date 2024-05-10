'use strict';

const { faker } = require('@faker-js/faker');
const bcryptjs = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("ALTER TABLE USERS AUTO_INCREMENT = 1;")
    const SALT_LENGTH = 8
    let usersData = []
    for (let i = 1; i < 5; i++) {
      usersData.push({
        id: i,
        account: `user${i}`,
        password: bcryptjs.hashSync('asd123', SALT_LENGTH),
        name: `user ${i}`,
        avatar: null,
        email: `user${i}@example.com`,
        phone: '0912345678',
        county: '台北市',
        is_admin: i < 3 ? true : false,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    for (let i = 5; i <= 30; i++) {
      usersData.push({
        id: i,
        account: `user${i}`,
        password: bcryptjs.hashSync('asd123', SALT_LENGTH),
        name: faker.internet.userName(),
        avatar: `https://loremflickr.com/200/200/avatar?random=${i}`,
        email: faker.internet.email(),
        phone: faker.string.numeric(10),
        county: faker.location.country(),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      })
    }

    await queryInterface.bulkInsert('Users', usersData, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});

  }
};
