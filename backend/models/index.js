'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) { db[modelName].associate(db); }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// -- Modèles -- //

// Utilisateur
db.user = require('./User.js')(sequelize, Sequelize);

// Post
db.post = require('./Post.js')(sequelize, Sequelize);

// Commentaire
db.comment = require('./Comment.js')(sequelize, Sequelize);

// -- Associations -- //

// Utilisateur
db.user.hasMany(db.post, { onDelete: "CASCADE" });
db.user.hasMany(db.comment);

// Post
db.post.hasMany(db.comment, { onDelete: "CASCADE" });
db.post.belongsTo(db.user);

// Commentaire
db.comment.belongsTo(db.post, { onDelete: "CASCADE" });
db.comment.belongsTo(db.user);

module.exports = db;
