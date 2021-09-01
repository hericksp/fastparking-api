const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const bcrypt = require("bcryptjs");

module.exports = {
    async store(req, res){
        const {email, senha} = req.body;

        //Verificar se o usuário existe
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        //Se a senha esta correta
        if (!user || !bcrypt.compareSync(senha, user.senha)){ 
        return res.status(403).send({error: "Usuário e/ou senha inválidos"});
        }
        //Gerar um token
         const token = jwt.sign({ userId: user.id}, auth.secret, {
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