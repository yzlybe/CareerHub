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
            nickname: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "reviews",
            timestamps: true,
            freezTableName: true,
            underscored: true,
        }
    );
    return model;
};

module.exports = reviewsModel;
