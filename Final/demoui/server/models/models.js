var connection = require('../configs/sequelize.js');

var PaymentMeta = require('./payment');
var Payment = connection.define('payment', PaymentMeta.attributes, PaymentMeta.options);
module.exports.Payment = Payment;
