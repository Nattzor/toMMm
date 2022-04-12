'use strict';
const {
  Model
} = require('sequelize');
const todo = require('./todo');
module.exports = (sequelize, DataTypes) => {
  class todos_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      todos_list.hasMany(todo, {foreignKey: todos_list_id})
    }
  }
  todos_list.init({
    title: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'todos_list',
  });
  return todos_list;
};