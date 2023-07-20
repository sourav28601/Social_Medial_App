const { Sequelize,DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('project1', 'root', '', {
    host: 'localhost',
    logging:false,
    dialect:'mysql'
});

try{
    sequelize.authenticate();
    console.log('connection has been established successfully.');
}catch(error){
    console.error('unable to connect to the database:',error);
}

const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require('../models/Post')(sequelize,DataTypes,Model);
db.user = require('../models/User')(sequelize,DataTypes,Model);
db.comment = require('../models/Comment')(sequelize,DataTypes,Model);


// db.user.hasMany(db.post,{foreignKey:'user_id'});
// db.post.belongsTo(db.user,{foreignKey:'user_id'});

// one to one relationship
// db.user.hasOne(db.post,{foreignKey:'user_id',as:'postDetails'});
// db.post.belongsTo(db.user,{foreignKey:'user_id',as:'userDetails'});

// One-To-Many relationships
db.user.hasMany(db.post,{foreignKey:'user_id'});
db.post.belongsTo(db.user,{foreignKey:'user_id'});

// One-To-Many relationships
db.post.hasMany(db.comment,{foreignKey:'post_id'});
db.comment.belongsTo(db.post,{foreignKey:'post_id'});


// One-To-Many relationships
db.comment.belongsTo(db.user,{foreignKey:'user_id'});
// db.user.belongsTo(db.comment,{foreignKey:'user_id'});

db.sequelize.sync({force:false});
// sequelize.sync({force:false});
module.exports = db;


