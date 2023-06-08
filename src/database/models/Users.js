module.exports = (sequelize, DataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
        },


        password: {
            type: DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING,
            unique: true
        },


//        image: {
//            type: DataTypes.STRING,
//        },
        
        user_category_id: {
            type: DataTypes.INTEGER,
        },
    };

    let config = {
        timestamp: false,
        underscored: true,
        tablename: "users" 
    };

    const User = sequelize.define (alias, cols, config);
    return User;
}
   