const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = {
    async store(req, res){
        const {email, password} = req.body;

        //Verificar se o usuário existe
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        //Se a senha esta correta
        if (!user || user.password !== password){ 
        return res.status(403).send({error: "Usuário e/ou senha inválidos"});
        }
        //Gerar um token
         jwt.sign({ userId: user.id}, auth.secret, {
             expiresIn: "1h"
         });

        //Enviar a resposta
        res.send({
            user: {
                email : user.email,
                name : user.name
            },
            token
        })
    }
}