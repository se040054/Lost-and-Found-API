'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("ALTER TABLE CATEGORIES AUTO_INCREMENT = 1;");
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: '金錢財物',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 2,
        name: '3C用品',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 3,
        name: '衣物',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 4,
        name: '飾品配件',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 5,
        name: '生活/衛生用品',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: '紀念/收藏品',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: '其他',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
