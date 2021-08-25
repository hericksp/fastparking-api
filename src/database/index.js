const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Post = require("../models/Post");
const User = require("../models/User");


const connection = new Sequelize(dbConfig.url, dbConfig.config);

//Inicializando os models
Post.init(connection);
User.init(connection);

//Inicializando os relacionamentos
Post.associate(connection.models);
User.associate(connection.models);




module.exports = connection;