// Second Way of Creating
// Extending Model and calling init(attributes, options)

// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./index');
module.exports = (sequelize, DataTypes, Model) => {
    class Comment extends Model {} 
    
    Comment.init(
      {   // Model attributes are defined here
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
          required :true
      },
      post_id:DataTypes.INTEGER,
      user_id:DataTypes.INTEGER,
    },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Comment", // We need to choose the model name
      }
    );
  
    // the defined model is the class itself
    console.log(Comment === sequelize.models.Comment); // true
    return Comment;
  };