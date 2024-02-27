

const Reviews = function(Sequelize, DataTypes) {
    return Sequelize.define("Reviews", {
        reviews_id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
          },
          jobs_id: {
            type:DataTypes.INTEGER,
            allowNull:false,
          },
          users_id: {
            type:DataTypes.INTEGER,
            allowNull:false,
          },
          reviews_comment: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          created_at: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    },{
            tableName:"Reviews",
            freezTableName:true,
            timestamps:false,
    }
    );
};

module.exports = Reviews;