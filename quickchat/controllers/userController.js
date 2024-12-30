const User = require('../models/userSchema');

exports.getUsers = async (req, res) => {
    try {
        const allUsersAuth = req.payload;
        console.log("allusersauth", allUsersAuth)
        const allUsers = await User.find({ _id: { $ne: allUsersAuth } }).select("-password")
        return res.status(200).json(allUsers)
    } catch (err) {
        console.log('Error in getusers', err);
        res.status(401).json('Request failed due to:', err)
    }
}