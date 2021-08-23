const { Model, DataTypes } = require("sequelize");


class Post extends Model(){

    static init(sequelize){
        super.init(
            {
                title: DataTypes.STRING,
                descripton: DataTypes.STRING,
                Image: DataTypes.STRING,
                gist: DataTypes.STRING,
            },
            {
                connection
            }
        )
    }

    static associate(models){

    }
}
module.exports = Post;