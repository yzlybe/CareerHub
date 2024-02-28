const jobsModel = (sequelize, DataTypes) => {
    const Jobs = sequelize.define(
        "Jobs",
        {
            jobs_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
            },
            img_path: {
                type: DataTypes.STRING(255),
                defaultValue: "/uploads/default.png",
            },
            company_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true, // 유니크 속성 추가
            },
            levels: {
                type: DataTypes.ENUM("1", "2", "3"),
                allowNull: false,
            },
            introduce: {
                type: DataTypes.TEXT("medium"),
            },
            task: {
                type: DataTypes.TEXT("medium"),
            },
            conditions: {
                type: DataTypes.STRING(255),
            },
            prefer: {
                type: DataTypes.STRING(255),
            },
            stack: {
                type: DataTypes.ENUM(
                    "JAVA",
                    "NODE",
                    "VUE",
                    "REACT",
                    "JS",
                    "SPRING"
                ),
            },
            welfaer: {
                type: DataTypes.STRING(255),
            },
            deadline: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            address_detail: {
                type: DataTypes.STRING(255),
            },
            source: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            others: {
                type: DataTypes.STRING(255),
            },
            cnt_likes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "jobs",
            timestamps: false,
            freezeTableName: true,
        }
    );

    return Jobs;
};

module.exports = jobsModel;
