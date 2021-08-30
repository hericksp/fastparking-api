const User = require("../models/user");
const bcrypt = require("bcryptjs")

module.exports = {
    store(req, res){
        const { name, email, password } = req.body;

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
        const passworHashed = bcrypt.hashSync(password);

        //inserir o usuário no banco
        user = await User.create({
            name: name,
            email: email,
            password: passworHashed
        })

        //Gerar token

        //Retornar o usuário
        res.send({
            user:{
                id: user.id,
                name: user.name,
                email: user.email
                
            }
        });

    }
}