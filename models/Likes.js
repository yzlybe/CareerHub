const { INTEGER } = require("sequelize")

const likeModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "Likes",
        {
            likes_id: {
                type:DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,                
            },
            users_id: {
                type:DataTypes.INTEGER,
                //
                allowNull: false,
                autoIncrement:true,             
            },
            jobs_id: {
                type:DataTypes.INTEGER,
                //
                allowNull: false,
                autoIncrement:true,             
            },
            conut: {
                type:DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "likes",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
}

module.exports = likeModel;