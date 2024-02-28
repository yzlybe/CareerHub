const user_likesModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "User_likes",
        {
            user_likes_id: {
                type:DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,                
            },
            users_id: {
                type:DataTypes.INTEGER,
                //
                allowNull: false,
                //autoIncrement:true,             
            },
            jobs_id: {
                type:DataTypes.INTEGER,
                //
                allowNull: false,
                //autoIncrement:true,             
            },
        },
        {
            tableName: "user_likes",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
}

module.exports = user_likesModel;