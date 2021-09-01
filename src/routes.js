const routes = require("express").Router();

const postController = require("./controllers/posts");
const sessionController = require("./controllers/sessions");
const userController = require("./controllers/users");
const authMiddlewares = require("./middlewares/auth");

// rotas públicas
routes.post('/users', userController.store);
routes.post('/sessions', sessionController.store);

//protegendo as rotas
routes.use(authMiddlewares);

//rotas privadas
routes.get("/posts", postController.index);

module.exports = routes;

