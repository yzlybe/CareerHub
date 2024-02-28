const usersModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "Users",
        {
            users_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            users_email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            users_password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE, // 시퀄라이즈에서는 TIMESTMAP 타입 지원 X
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            tableName: "users",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = usersModel;
