const { db, DataTypes } = require('../db/connection')

const Profile = db.define('Profile',{
    bio: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    birthday: DataTypes.STRING
}) 


module.exports = Profile;