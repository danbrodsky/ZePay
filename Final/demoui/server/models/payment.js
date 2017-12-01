var Sequelize = require('sequelize');

var attributes = {
    name: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: Sequelize.STRING,
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    recipient: {
        type: Sequelize.STRING,
    },
    message: {
        type: Sequelize.STRING,
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
