const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const User = require('../models/userSchema');


exports.signUp = async (req, res) => {
    // res.status(200).json('Signup user')
    // console.log('signup account');
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json("Password mismatch")
        }
        const user = await User.findOne({ username: username })
        if (user) {
            return res.status(400).json("Username already exists")
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
            const newUser = new User({
                fullname: fullname,
                username: username,
                password: hashPassword,
                gender: gender,
                profilePicture: gender === "male" ? maleProfilePic : femaleProfilePic
            });
            if (newUser) {           
                await newUser.save();
                res.status(200).json({
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    username: newUser.username,
                    profilePicture: newUser.profilePicture
                })
            } else {
                res.status(401).json("Invalid User Data")
            }
        }
    } catch (err) {
        res.status(401).json('Signup failed due to:', err)
    }
}

exports.loginUser = async (req, res) => {
    // res.status(200).json('Login connect')
    // console.log('login user connect');
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        const ispwdOk = await bcrypt.compare(password, user?.password || "")
        if (!user || !ispwdOk) {
            return res.status(401).json("Invalid username or password")
        } else {
            //token
            const token = jwt.sign({ userId: user._id }, 'secretkeydevchat095')
            console.log(token);
            res.status(200).json({
                user:user,
                token:token
            });
        }
    } catch (err) {
        res.status(401).json('Login request fails due to:', err);
       
    }
}
 