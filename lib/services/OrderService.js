const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    const order = await Order.insert({ quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );
    return order;
  }
  static async getAll(){
    const orders = await Order.getAll();
    return orders;
  }

  static async getByID(id) {
    const order = await Order.getByID(id);
    return order;
  }

  static async updateById(id, { quantity }) {
    const order = await Order.update({ id, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} updated to ${quantity}`
    );

    return order;
  }
  
  static async deleteById(id) {
    const order = await Order.delete(id);

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} deleted`
    );

    return order;
  }
};
