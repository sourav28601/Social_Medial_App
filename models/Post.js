// Second Way of Creating
// Extending Model and calling init(attributes, options)
const User = require('./User')
// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./index');
module.exports = (sequelize, DataTypes, Model) => {
    class Post extends Model {} 
    
    Post.init(
      {
        // Model attributes are defined here
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          required :true
      },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          required :true
          // allowNull defaults to true
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
          required :true
          // allowNull defaults to true
        },
        status:{
            type:DataTypes.STRING,
            // allowNull:false,
        },
        user_id:DataTypes.INTEGER
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Post", // We need to choose the model name
      }
    );
    // Post.belongsTo(User, { foreignKey: 'user_id' });
  
    // the defined model is the class itself
    console.log(Post === sequelize.models.Post); // true
    return Post;
    
  };