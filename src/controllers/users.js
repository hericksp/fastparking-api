const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = {
    async store(req, res){
        const { name, email, senha } = req.body;

        //Verifica se o usuário já existe
        let user = await User.findOne({
            where: {
                email: email
            }
        })

        if (user) {
            return res.status(400).send({error: "Este e-mail já está sendo utilizado"});
        }

        //Gerar hash da senha
        const senhaHashed = bcrypt.hashSync(senha);

        //inserir o usuário no banco
        user = await User.create({
            name: name,
            email: email,
            senha: senhaHashed
        })

        //Gerar token
        const token = jwt.sign({ UserId: user.id}, auth.secret, {
            expiresIn: "1h"
        });



        //Retornar o usuário
        res.send({
            user:{
                id: user.id,
                name: user.name,
                email: user.email
                },
            token
        });

    }
}