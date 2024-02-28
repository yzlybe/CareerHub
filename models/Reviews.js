const reviewsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
      "Reviews", 
      {
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
            tableName:"reviews",
            timestamps:false,
            freezTableName:true,
    }
    );
    return model;
};

module.exports = reviewsModel;