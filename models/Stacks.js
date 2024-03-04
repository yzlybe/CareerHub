const stackModel = (sequelize, DataTypes) => {
    const Stack = sequelize.define(
        "Stack",
        {
            stack_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            java: {
                type: DataTypes.BOOLEAN,
            },
            node: {
                type: DataTypes.BOOLEAN,
            },
            spring: {
                type: DataTypes.BOOLEAN,
            },
            react: {
                type: DataTypes.BOOLEAN,
            },
            js: {
                type: DataTypes.BOOLEAN,
            },
            vue: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            tableName: "stack",
            timestamps: false,
            freezeTableName: true,
        }
    );

    return Stack;
};

module.exports = stackModel;
