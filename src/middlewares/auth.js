const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = (req, res, next ) => {

    //pegar o token no cabeçalho
    const authorization = req.headers.authorization

    //verificar se o token veio
    if(!authorization){
        return res.status(401).send({error: "Token não informado"})
    }

    //separar o prefixo do 
    const [prefixo, token] = authorization.split(" ");

    //verificar se o token é válido ou não
    try {
     //se for valido, recebemos o payload
        const payload = jwt.verify(token, auth.secret);
        
        //colocamos o Id do usuário na requisição para que o controller possa recuperar
        req.userId = payload.userId;

        return next();

    }catch (error){
        //retornamos token invalido
        return res.status(401).send({error: "Token inválido"})
    }
    
   

}