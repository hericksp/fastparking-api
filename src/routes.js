const routes = require("express").Router();

const postController = require("./controllers/posts");
const sessionController = require("./controllers/sessions");
const userController = require("./controllers/users");


routes.post('/users', userController.store);

routes.post('/sessions', sessionController.store);

routes.get("/posts", postController.index);

module.exports = routes;

