// Second Way of Creating
// Extending Model and calling init(attributes, options)

// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./index');
module.exports = (sequelize, DataTypes, Model) => {
    class User extends Model {} 
    
    User.init(
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          required :true
      },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          required :true
          // allowNull defaults to true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          required :true
          // allowNull defaults to true
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "User", // We need to choose the model name
      }
    );
  
    // the defined model is the class itself
    console.log(User === sequelize.models.User); // true
    return User;
  };