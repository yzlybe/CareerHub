const reviewsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "Reviews",
        {
            reviews_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            reviews_comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            nickname: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "reviews",
            timestamps: false,
            freezTableName: true,
        }
    );
    return model;
};

module.exports = reviewsModel;
