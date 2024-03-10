'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: '金錢財物',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: '3C用品',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: '衣物',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: '飾品配件',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: '生活/衛生用品',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '紀念/收藏品',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
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
