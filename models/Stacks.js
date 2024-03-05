const stackModel = (sequelize, DataTypes) => {
    const Stack = sequelize.define(
        "stacks",
        {
            stack_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            react: {
                type: DataTypes.BOOLEAN,
            },
            vue: {
                type: DataTypes.BOOLEAN,
            },
            css: {
                type: DataTypes.BOOLEAN,
            },
            angular: {
                type: DataTypes.BOOLEAN,
            },
            javascript: {
                type: DataTypes.BOOLEAN,
            },
            html: {
                type: DataTypes.BOOLEAN,
            },
            typescript: {
                type: DataTypes.BOOLEAN,
            },
            sass: {
                type: DataTypes.BOOLEAN,
            },
            jsx: {
                type: DataTypes.BOOLEAN,
            },
            webpack: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            tableName: "stacks",
            timestamps: false,
            freezeTableName: true,
        }
    );

    return Stack;
};

module.exports = stackModel;
