'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    } });
     */
    await queryInterface.addColumn("Coupons",'coupon_code', {type:Sequelize.STRING,
      allowNull:false
    })
    await queryInterface.addColumn("Coupons",'minimum_cart_total', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.addColumn("Coupons",'discount_type', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn("Coupons",'discount_percent', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.addColumn("Coupons",'discount_amount', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }) 
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
