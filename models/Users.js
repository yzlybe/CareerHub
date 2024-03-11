const usersModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "users",
        {
            users_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            users_email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            users_password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "users",
            timestamps: true,
            freezeTableName: true,
            underscored: true,
        }
    );
    return model;
};

module.exports = usersModel;
