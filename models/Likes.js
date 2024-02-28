const likesModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "user_likes",
        {
            user_likes_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
        },
        {
            tableName: "user_likes",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = likesModel;
