const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Client = sequelize.define('client', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  email: {type: DataTypes.STRING, unique: true},
  phone: {type: DataTypes.INTEGER, unique: true},
  description: {type: DataTypes.STRING},
  discount: {type: DataTypes.INTEGER},
});

User.hasMany(Client);
Client.belongsTo(User);

module.exports = {
  User,
  Client
}
