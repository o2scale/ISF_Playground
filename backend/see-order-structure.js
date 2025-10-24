const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/isfplayground', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const OrderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', OrderSchema, 'orders');

async function seeOrderStructure() {
  try {
    const order = await Order.findOne().lean();
    console.log('Sample Order Structure:');
    console.log(JSON.stringify(order, null, 2));
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seeOrderStructure();
